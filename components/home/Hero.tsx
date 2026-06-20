'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Hero() {
    const t = useTranslations('Hero');
    const [typedText, setTypedText] = useState('');
    const fullText = t('typedText');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.substring(0, i + 1));
            i++;
            if (i === fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/image/hero-bg.jpeg"
                    alt="Security professional"
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
            <div className="relative container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                    <div className="mb-4">
                        <span className="text-blue-400 tracking-widest text-sm border-l-4 border-blue-500 pl-3 font-mono">
                            {t('badge')}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-4">
                        {t('titleLine1')}
                        <br />
                        <span className="text-blue-500">{t('titleLine2')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-2 h-12">
                        {typedText}
                        <span className="animate-pulse ml-1 inline-block w-1 h-6 bg-blue-500" />
                    </p>
                    <p className="text-gray-300 mb-8 max-w-md">{t('subtext')}</p>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <Link
                            href="/contact"
                            className="group relative bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-sm text-center uppercase tracking-wide transition shadow-lg shadow-blue-500/30 overflow-hidden"
                        >
                            <span className="relative z-10">{t('ctaPrimary')}</span>
                            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                        </Link>
                        <Link
                            href="#services"
                            className="border-2 border-gray-500 hover:border-blue-500 hover:text-blue-400 text-white font-bold py-3 px-8 rounded-sm text-center uppercase tracking-wide transition"
                        >
                            {t('ctaSecondary')}
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 p-6 rounded-md shadow-2xl">
                        <div className="text-center mb-4">
                            <div className="text-4xl font-black text-blue-500">24/7</div>
                            <div className="text-xs uppercase tracking-wider text-gray-300">
                                {t('stat1')}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-black text-white">98%</div>
                                <div className="text-xs text-gray-400">{t('stat2')}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white">3min</div>
                                <div className="text-xs text-gray-400">{t('stat3')}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white">15+</div>
                                <div className="text-xs text-gray-400">{t('stat4')}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white">100%</div>
                                <div className="text-xs text-gray-400">{t('stat5')}</div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 text-center text-xs text-gray-400">
                            {t('trustBar1')} • {t('trustBar2')}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs uppercase tracking-wider">
                {/* Mouse icon */}
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center items-start pt-2 animate-bounce">
                    <div className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" />
                </div>
                {/* <span className="text-xs tracking-widest">Scroll</span> */}
            </div>
        </section>
    );
}
