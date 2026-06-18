"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const locales = [
    { code: "en", label: "EN" },
    { code: "fa", label: "FA" },
    { code: "ar", label: "AR" },
];

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter(); // from next-intl/client
    const pathname = usePathname(); // from next-intl/client
    const currentLocale = useLocale();

    const switchLanguage = (localeCode: string) => {
        const segments = pathname.split('/');
        segments[1] = localeCode;
        router.push(segments.join('/'));
        setIsOpen(false);
    };

    const currentLabel =
        locales.find((l) => l.code === currentLocale)?.label || "EN";

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-gray-300 hover:text-blue-400 font-medium tracking-wide px-3 py-1 border border-gray-700 rounded-sm text-sm transition"
            >
                {currentLabel}
                <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-gray-900 border border-gray-700 rounded-sm shadow-lg z-50">
                    {locales.map((locale) => (
                        <button
                            key={locale.code}
                            onClick={() => switchLanguage(locale.code)}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition ${
                                locale.code === currentLocale
                                    ? "text-blue-400 font-bold"
                                    : "text-gray-300"
                            }`}
                        >
                            {locale.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
