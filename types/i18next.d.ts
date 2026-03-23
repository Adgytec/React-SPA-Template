import "i18next";

import { defaultNS } from "../src/i18n/i18n";
import type { I18nResources } from "./i18next-resources";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: I18nResources;
    }
}
