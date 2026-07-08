import z from "zod";

const EnvSchema = z.object({
    VITE_ADGYTEC_FLOW_ENDPOINT: z.url(),
    VITE_CLIENT_ID: z.uuid(),
    VITE_TRANSLATION_CDN: z.url(),
    VITE_TRANSLATION_TYPES: z.url(),
});

export const env = EnvSchema.parse(import.meta.env);
