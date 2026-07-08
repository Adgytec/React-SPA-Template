import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { env } from "@/env";
import { currency, datetime, fileSize, number } from "./formatters";
import { defaultLanguage, supportedLanguageKeys } from "./languages";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        load: "languageOnly",
        fallbackLng: defaultLanguage,
        supportedLngs: supportedLanguageKeys,
        ns: "common/utils",
        defaultNS: "common/utils",
        backend: {
            loadPath: env.VITE_TRANSLATION_CDN,
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
i18n.services.formatter?.add("filesize", fileSize);

export default i18n;
