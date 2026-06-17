export const supportedLanguages = [
    {
        key: "en",
        defaultRegion: "GB",
    },
    {
        key: "fr",
        defaultRegion: "FR",
    },
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number]["key"];

export const defaultLanguage: SupportedLanguage = "fr";
