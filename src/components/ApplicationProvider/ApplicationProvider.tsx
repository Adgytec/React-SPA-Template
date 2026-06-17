import { ThemeProvider } from "@adgytec/adgytec-web-ui-components";
import type { ReactNode } from "react";
import { I18nProvider } from "react-aria-components";
import { useTranslation } from "react-i18next";

export const ApplicationProvider: React.FC<{ children?: ReactNode }> = ({
    children,
}) => {
    const { i18n } = useTranslation();

    return (
        <ThemeProvider>
            <I18nProvider locale={i18n.resolvedLanguage}>
                {children}
            </I18nProvider>
        </ThemeProvider>
    );
};
