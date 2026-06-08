"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const locales = [
    { code: "en", label: "EN" },
    { code: "fa", label: "FA" }, // Persian – adjust if you use 'ar' or others
    // Add more as needed: { code: "fr", label: "FR" }
];

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState("en");
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Extract current locale from pathname (assumes /[locale]/...)
    useEffect(() => {
        const segments = pathname.split("/");
        const localeCandidate = segments[1];
        if (locales.some((l) => l.code === localeCandidate)) {
            setCurrentLocale(localeCandidate);
        } else {
            setCurrentLocale("en");
        }
    }, [pathname]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const switchLanguage = (localeCode: string) => {
        if (localeCode === currentLocale) {
            setIsOpen(false);
            return;
        }
        // Replace the locale segment in the current path
        const segments = pathname.split("/");
        segments[1] = localeCode;
        const newPath = segments.join("/") || "/";
        router.push(newPath);
        setIsOpen(false);
    };

    const currentLabel =
        locales.find((l) => l.code === currentLocale)?.label || "EN";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-gray-300 hover:text-blue-400 font-medium tracking-wide px-3 py-1 border border-gray-700 rounded-sm text-sm transition"
                aria-label="Change language"
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
