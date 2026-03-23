import { useEffect } from "react";
import { I18nProvider } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { z } from "zod/v4";
import type { I18nWrapperProps } from "./types";

type ZodLocaleFn = () => ReturnType<typeof z.config>;

async function loadZodLocale(lang: string = "en") {
    try {
        const locales = await import("zod/v4/locales");

        const localeMap: Record<string, ZodLocaleFn> = {
            en: locales.en,
            fr: locales.fr,
        };

        const selected = localeMap[lang] ?? locales.en;

        z.config(selected());
    } catch {
        // fallback safety
        const locales = await import("zod/v4/locales");
        z.config(locales.en());
    }
}

export const I18nWrapper: React.FC<I18nWrapperProps> = ({ children }) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        loadZodLocale(i18n.resolvedLanguage);
    }, [i18n.resolvedLanguage]);

    return (
        <I18nProvider locale={i18n.resolvedLanguage}>{children}</I18nProvider>
    );
};
