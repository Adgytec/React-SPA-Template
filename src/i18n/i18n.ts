import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { getEnvVar } from "@/utils/env/env";
import { currency, datetime, number } from "./formatters";
import { defaultLanguage, languagesKeys } from "./languages";

export const defaultNS = "auth-card";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        load: "languageOnly",
        fallbackLng: defaultLanguage,
        supportedLngs: languagesKeys,
        ns: [defaultNS],
        defaultNS: defaultNS,
        backend: {
            loadPath: getEnvVar("VITE_TRANSLATION_CDN"),
            crossDomain: true,
        },
        debug: import.meta.env.DEV,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

i18n.services.formatter?.add("number", number);
i18n.services.formatter?.add("currency", currency);
i18n.services.formatter?.add("datetime", datetime);

export default i18n;
