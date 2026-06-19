import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ['en', 'ar', 'fa'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale as Locale)) {
        locale = 'en';
    }
  
    try {
        return {
            locale,
            messages: (await import(`../messages/${locale}.json`)).default,
            // You can also add timeZone and other configuration
            timeZone: 'UTC',
            now: new Date(),
        };
    } catch {
        // If the messages file doesn't exist, return 404
        notFound();
    }
});