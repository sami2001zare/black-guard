export const locales = ["en", "fa", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "fa";