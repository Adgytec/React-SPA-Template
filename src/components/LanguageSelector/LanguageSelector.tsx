import { Select } from "@adgytec/adgytec-web-ui-components";
import type { Key } from "react-aria-components";
import { useTSettings } from "@/hooks/translations/useT";
import { languages, languagesKeys } from "@/i18n/languages";
import type { LanguageKey } from "@/i18n/types";
import type { LanguageSelectorProps } from "./type";

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    theme,
}) => {
    const { t, i18n } = useTSettings();

    const isLanguageKey = (key: Key | null): key is LanguageKey => {
        return (languagesKeys as readonly unknown[]).includes(key);
    };

    const changeLanguage = (key: Key | null) => {
        if (isLanguageKey(key)) i18n.changeLanguage(key as LanguageKey);
    };

    const options = languages.map((lang) => ({
        key: lang.key,
        displayValue: t(`language.selection.${lang.label}`),
    }));

    return (
        <Select
            options={options}
            selectedKey={i18n.resolvedLanguage}
            onSelectionChange={changeLanguage}
            triggerVariant="outlined"
            cardBackground="solid"
            triggerTheme={theme}
            ariaLabel={t("language.heading")}
        />
    );
};
