import { useEffect } from "react";
import { I18nProvider } from "react-aria-components";
import { useTranslation } from "react-i18next";
import z from "zod";
import { en, fr } from "zod/v4/locales";
import type { I18nWrapperProps } from "./types";

const localeMap = {
    en: en,
    fr: fr,
};

type Locale = keyof typeof localeMap;

function loadZodLocale(locale: string) {
    const safeLocale: Locale = locale in localeMap ? (locale as Locale) : "en";
    z.config(localeMap[safeLocale]());
}

export const I18nWrapper: React.FC<I18nWrapperProps> = ({ children }) => {
    const { i18n } = useTranslation();
    const locale = i18n.language;

    useEffect(() => {
        loadZodLocale(locale);
    }, [locale]);

    return (
        <I18nProvider locale={i18n.resolvedLanguage}>{children}</I18nProvider>
    );
};
