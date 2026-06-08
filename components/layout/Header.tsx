"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const locales = ["en", "fa", "ar"];

export default function Header() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function switchLang(nextLocale: string) {
        const segments = pathname.split("/");
        segments[1] = nextLocale;
        router.push(segments.join("/"));
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-yellow-500/10">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link
                    href={`/${locale}`}
                    className="text-white tracking-widest font-bold"
                >
                    BLACKGUARD
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex gap-6 text-sm text-gray-300">
                    <Link href={`/${locale}`}>Home</Link>
                    <Link href={`/${locale}#services`}>Services</Link>
                    <Link href={`/${locale}#contact`}>Contact</Link>
                </nav>

                {/* Language Switcher */}
                <div className="flex gap-2 text-xs">
                    {locales.map((l) => (
                        <button
                            key={l}
                            onClick={() => switchLang(l)}
                            className={`px-2 py-1 rounded border ${
                                locale === l
                                    ? "border-yellow-500 text-yellow-400"
                                    : "border-gray-700 text-gray-400"
                            }`}
                        >
                            {l.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}
