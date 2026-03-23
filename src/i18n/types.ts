import type { I18nResources } from "../../types/i18next-resources";

export const languagesKeys = ["en", "fr"] as const;
export type LanguageKey = (typeof languagesKeys)[number];

export type LanguageLabels =
    keyof I18nResources["settings"]["language"]["selection"];

export type Language = {
    key: LanguageKey;
    label: LanguageLabels;
    defaultRegion: string;
};

export type QualifiedLngFor = (lng: string) => string;
