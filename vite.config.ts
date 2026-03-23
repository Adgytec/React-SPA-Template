import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";
import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const useTLS = env.VITE_DEV_TLS === "true";

    const https =
        useTLS &&
        env.VITE_TLS_KEY &&
        fs.existsSync(env.VITE_TLS_KEY) &&
        env.VITE_TLS_CERT &&
        fs.existsSync(env.VITE_TLS_CERT)
            ? {
                  key: fs.readFileSync(env.VITE_TLS_KEY),
                  cert: fs.readFileSync(env.VITE_TLS_CERT),
              }
            : undefined;

    return {
        plugins: [
            tanstackRouter({
                target: "react",
                autoCodeSplitting: true,
            }),
            react(),
            babel({ presets: [reactCompilerPreset()] }),
            Sonda(),
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
            host: env.VITE_HOST,
            port: Number(env.VITE_PORT),
            https,
            hmr: {
                protocol: useTLS ? "wss" : "ws",
                host: env.VITE_HOST,
                port: Number(env.VITE_PORT),
            },
        },
    };
});
