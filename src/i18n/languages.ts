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

export const supportedLanguageKeys = supportedLanguages.map(
    (language) => language.key
) as readonly SupportedLanguage[];

export const defaultLanguage: SupportedLanguage = "fr";

export function isValidLanguageKey(
    language: unknown
): language is SupportedLanguage {
    return (
        typeof language === "string" &&
        supportedLanguageKeys.includes(language as SupportedLanguage)
    );
}
