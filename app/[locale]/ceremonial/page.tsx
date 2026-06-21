import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

// Helper to strip HTML tags and get plain text
const stripHtml = (html: string) => {
    if (typeof window === 'undefined') {
        return html.replace(/<[^>]*>?/gm, '');
    }
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations('CeremonialPage');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function CeremonialServicesPage() {
    const locale = await getLocale();
    const t = await getTranslations('CeremonialPage');
    const isRtl = locale === 'fa' || locale === 'ar';

    // Fetch all published ceremonial services
    const services = await prisma.ceremonialService.findMany({
        where: { published: true },
        orderBy: { order: 'asc' },
        include: { imageMedia: true },
    });

    const getLocalizedTitle = (service: { titleEn: string; titleFa: string; titleAr: string }) => {
        if (locale === 'fa') return service.titleFa;
        if (locale === 'ar') return service.titleAr;
        return service.titleEn;
    };

    const getLocalizedDescription = (service: {
        descriptionEn: string;
        descriptionFa: string;
        descriptionAr: string;
    }) => {
        if (locale === 'fa') return service.descriptionFa;
        if (locale === 'ar') return service.descriptionAr;
        return service.descriptionEn;
    };

    const getPlainDescription = (service: any) => {
        const html = getLocalizedDescription(service);
        return stripHtml(html);
    };

    return (
        <div
            className="bg-black text-white min-h-screen py-16 md:py-24"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        {t('title')}
                    </h1>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mt-4" />
                    <p className="text-gray-400 mt-4">{t('subtitle')}</p>
                </div>

                {/* Services Grid */}
                {services.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">{t('noServices')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="group bg-gray-900 rounded-md overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-52 w-full overflow-hidden">
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                                        {getLocalizedTitle(service)}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {getPlainDescription(service)}
                                    </p>
                                    <Link
                                        href={`/ceremonial/${service.slug}`}
                                        className="inline-flex items-center gap-1 text-blue-400 font-medium hover:text-blue-300 transition text-sm uppercase tracking-wide"
                                    >
                                        {t('learnMore')} →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
