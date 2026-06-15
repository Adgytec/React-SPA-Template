import "i18next";

import type { I18nResources } from "./i18next-resources";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: I18nResources;
    }
}
