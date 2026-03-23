import type { Language, LanguageKey } from "./types";

export const languages: Language[] = [
    {
        key: "en",
        label: "english",
        defaultRegion: "GB",
    },
    {
        key: "fr",
        label: "french",
        defaultRegion: "FR",
    },
];

export const languagesKeys = languages.map((lng) => lng.key);
export const defaultLanguage: LanguageKey = "en";
