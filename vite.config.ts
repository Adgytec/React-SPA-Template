import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";

import optimizeLocales from "@react-aria/optimize-locales-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig, loadEnv } from "vite";
import { z } from "zod";

const BuildEnvSchema = z
    .object({
        HOST: z.string().min(1),
        PORT: z.coerce.number().int().min(1).max(65535),

        DEV_TLS: z
            .enum(["true", "false"])
            .transform((value) => value === "true"),

        TLS_KEY: z.string().optional(),
        TLS_CERT: z.string().optional(),
    })
    .superRefine((env, ctx) => {
        if (!env.DEV_TLS) {
            return;
        }

        if (!env.TLS_KEY) {
            ctx.addIssue({
                code: "custom",
                path: ["TLS_KEY"],
                message: "TLS_KEY is required when DEV_TLS is enabled.",
            });

            return;
        }

        if (!env.TLS_CERT) {
            ctx.addIssue({
                code: "custom",
                path: ["TLS_CERT"],
                message: "TLS_CERT is required when DEV_TLS is enabled.",
            });

            return;
        }

        if (!fs.existsSync(env.TLS_KEY)) {
            ctx.addIssue({
                code: "custom",
                path: ["TLS_KEY"],
                message: `TLS key file does not exist: ${env.TLS_KEY}`,
            });
        }

        if (!fs.existsSync(env.TLS_CERT)) {
            ctx.addIssue({
                code: "custom",
                path: ["TLS_CERT"],
                message: `TLS certificate file does not exist: ${env.TLS_CERT}`,
            });
        }
    });

type BuildEnv = z.infer<typeof BuildEnvSchema>;

function createHttpsConfig(env: BuildEnv) {
    if (!env.DEV_TLS) {
        return undefined;
    }

    const { TLS_KEY, TLS_CERT } = env;
    if (!TLS_KEY || !TLS_CERT) {
        throw new Error(
            "Unreachable: TLS_KEY and TLS_CERT were validated by BuildEnvSchema."
        );
    }

    return {
        key: fs.readFileSync(TLS_KEY),
        cert: fs.readFileSync(TLS_CERT),
    };
}

export default defineConfig(({ mode }) => {
    const env = BuildEnvSchema.parse(loadEnv(mode, process.cwd(), ""));

    return {
        plugins: [
            tanstackRouter({
                target: "react",
                autoCodeSplitting: true,
            }),

            react(),

            babel({
                presets: [reactCompilerPreset()],
            }),

            Sonda(),

            optimizeLocales.vite({
                locales: ["en", "fr"],
            }),
        ],

        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },

        build: {
            sourcemap: true,
        },

        server: {
            host: env.HOST,
            port: env.PORT,
            https: createHttpsConfig(env),

            hmr: {
                protocol: env.DEV_TLS ? "wss" : "ws",
                host: env.HOST,
                port: env.PORT,
            },
        },
    };
});
