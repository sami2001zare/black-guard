'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('Header');

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/services', label: t('services') },
        { href: '/training', label: t('training') },
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <span className="text-2xl md:text-3xl font-black tracking-tight text-white">
                            BLACK
                            <span className="text-blue-500 group-hover:text-blue-400 transition">
                                GUARD
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm uppercase tracking-wide font-semibold transition duration-300 ${
                                    isActive(link.href)
                                        ? 'text-blue-500 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <LanguageSwitcher />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block py-3 px-2 text-sm uppercase tracking-wide ${
                                    isActive(link.href)
                                        ? 'text-blue-500'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 px-2">
                            <LanguageSwitcher />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
