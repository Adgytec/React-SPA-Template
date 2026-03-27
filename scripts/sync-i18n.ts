import fs from "node:fs/promises";
import path from "node:path";
import "dotenv/config";

// 1. Configuration
const TYPES_DIR = path.resolve("types");
const RESOURCES_FILE_PATH = path.join(TYPES_DIR, "i18next-resources.d.ts");
const I18NEXT_MODULE_PATH = path.join(TYPES_DIR, "i18next.d.ts");

// The static content for your i18next module declaration
const i18nextModuleContent = `import "i18next";

import type { I18nResources } from "./i18next-resources";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: I18nResources;
    }
}
`;

async function syncTranslationTypes() {
    try {
        console.log("Fetching translation types from remote repository...");

        const REMOTE_TYPES_URL = process.env.VITE_TRANSLATION_TYPES;
        if (!REMOTE_TYPES_URL) {
            throw new Error("missing url for types fetching");
        }

        // Fetch the content from GitHub
        const response = await fetch(REMOTE_TYPES_URL);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch types. Status: ${response.status} ${response.statusText}`
            );
        }

        const remoteTypesContent = await response.text();

        // Ensure the output directory exists
        await fs.mkdir(TYPES_DIR, { recursive: true });

        // Step 1: Save the downloaded content as i18next-resources.d.ts
        await fs.writeFile(RESOURCES_FILE_PATH, remoteTypesContent, "utf-8");
        console.log(
            "✓ Successfully saved remote types to:",
            RESOURCES_FILE_PATH
        );

        // Step 2: Create the custom i18next module declaration file
        await fs.writeFile(I18NEXT_MODULE_PATH, i18nextModuleContent, "utf-8");
        console.log(
            "✓ Successfully created custom i18next module at:",
            I18NEXT_MODULE_PATH
        );
    } catch (error) {
        console.error("❌ Error syncing translation types:", error);
        process.exit(1);
    }
}

// Execute the script
syncTranslationTypes();
