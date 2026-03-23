import { defaultLanguage, languages } from "./languages";
import type { QualifiedLngFor } from "./types";

// https://phrase.com/blog/posts/localizing-react-apps-with-i18next/
// reference from this article
// these formatters are only meant to be used by i18next lib

// cache for qualified lng for O(1) lookup
const qualifiedCache = new Map<string, string>();

const preferredQualifiedMap = new Map<string, string>();
if (typeof navigator !== "undefined" && Array.isArray(navigator.languages)) {
    for (const userLng of navigator.languages) {
        const base = userLng.split("-")[0];
        if (!preferredQualifiedMap.has(base)) {
            preferredQualifiedMap.set(base, userLng);
        }
    }
}

const fallbackRegionMap = new Map<string, string>();
for (const { key, defaultRegion } of languages) {
    fallbackRegionMap.set(key, `${key}-${defaultRegion}`);
}

// lang is always BCP 47 tag with only language value or lang-script value
// always give priority to user preference even if lang with region is present in lower priority
const qualifiedLngFor: QualifiedLngFor = (lng: string) => {
    // memoized
    const cached = qualifiedCache.get(lng);
    if (cached) return cached;

    // user preference match
    const preferred = preferredQualifiedMap.get(lng);
    if (preferred) {
        qualifiedCache.set(lng, preferred);
        return preferred;
    }

    // fallback
    const fallback = fallbackRegionMap.get(lng);
    if (fallback) {
        qualifiedCache.set(lng, fallback);
        return fallback;
    }

    // final fallback
    qualifiedCache.set(lng, lng);
    return lng;
};

export const number = (
    value: number,
    lng: string = defaultLanguage,
    options?: Intl.NumberFormatOptions
) => {
    return new Intl.NumberFormat(qualifiedLngFor(lng), options).format(value);
};

export const currency = (
    value: number,
    lng: string = defaultLanguage,
    options?: Intl.NumberFormatOptions
) => {
    return number(value, lng, {
        style: "currency",
        ...options,
    });
};

export const datetime = (
    value: Date | number,
    lng: string = defaultLanguage,
    options?: Intl.DateTimeFormatOptions
) => {
    return new Intl.DateTimeFormat(qualifiedLngFor(lng), options).format(value);
};
