'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface CeremonialService {
    id: string;
    titleEn: string;
    titleFa: string;
    titleAr: string;
    descriptionEn: string;
    descriptionFa: string;
    descriptionAr: string;
    imageMedia: { path: string } | null;
    order: number;
    published: boolean;
}

const stripHtml = (html: string) => {
    if (typeof window === 'undefined') {
        // Server-side: use a simple regex fallback
        return html.replace(/<[^>]*>?/gm, '');
    }
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

export default function CeremonialServices() {
    const [services, setServices] = useState<CeremonialService[]>([]);
    const [loading, setLoading] = useState(true);
    const locale = useLocale();
    const t = useTranslations('CeremonialServices');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/public/ceremonial');
                if (res.ok) {
                    const data = await res.json();
                    setServices(data);
                }
            } catch (error) {
                console.error('Error fetching ceremonial services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getLocalizedTitle = (service: CeremonialService) => {
        if (locale === 'fa') return service.titleFa;
        if (locale === 'ar') return service.titleAr;
        return service.titleEn;
    };

    const getLocalizedDescription = (service: CeremonialService) => {
        if (locale === 'fa') return service.descriptionFa;
        if (locale === 'ar') return service.descriptionAr;
        return service.descriptionEn;
    };

    const getPlainDescription = (service: CeremonialService) => {
        const html = getLocalizedDescription(service);
        return stripHtml(html);
    };

    if (loading) {
        return (
            <section className="py-20 bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                </div>
            </section>
        );
    }

    if (services.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-gray-950 border-y border-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-white">{t('title')}</h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto my-4" />
                    <p className="text-gray-400">{t('subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group bg-black border border-gray-800 hover:border-blue-500/50 rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative h-56 w-full overflow-hidden">
                                {service.imageMedia ? (
                                    <Image
                                        src={service.imageMedia.path}
                                        alt={getLocalizedTitle(service)}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                                        {t('noImage')}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-60" />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                                    {getLocalizedTitle(service)}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {getPlainDescription(service)}
                                </p>
                                <Link
                                    href="/ceremonial"
                                    className="inline-flex items-center gap-1 text-blue-400 font-medium hover:text-blue-300 transition text-sm uppercase tracking-wide"
                                >
                                    {t('learnMore')}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
