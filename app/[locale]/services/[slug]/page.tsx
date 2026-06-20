import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ConsultationModal from '@/components/services/ConsultationModal';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = await getLocale();
    const { slug } = await params;

    const service = await prisma.service.findUnique({
        where: { slug, published: true },
    });

    if (!service) {
        return { title: 'Not Found' };
    }

    const title =
        locale === 'fa' ? service.titleFa : locale === 'ar' ? service.titleAr : service.titleEn;

    return {
        title: `${title} – Black Guard`,
        description:
            locale === 'fa'
                ? service.descriptionFa
                : locale === 'ar'
                  ? service.descriptionAr
                  : service.descriptionEn,
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const locale = await getLocale();

    const service = await prisma.service.findUnique({
        where: { slug, published: true },
        include: { imageMedia: true },
    });

    if (!service) {
        notFound();
    }

    const title =
        locale === 'fa' ? service.titleFa : locale === 'ar' ? service.titleAr : service.titleEn;

    const description =
        locale === 'fa'
            ? service.descriptionFa
            : locale === 'ar'
              ? service.descriptionAr
              : service.descriptionEn;

    const isRtl = locale === 'fa' || locale === 'ar';

    return (
        <div
            className="bg-black text-white min-h-screen py-16 md:py-24"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        {title}
                    </h1>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mt-4" />
                </div>

                {/* Featured Image */}
                {service.imageMedia && (
                    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-10">
                        <Image
                            src={service.imageMedia.path}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none leading-relaxed text-gray-200">
                    <div dangerouslySetInnerHTML={{ __html: description || '' }} />
                </div>

                {/* Consultation Modal */}
                <ConsultationModal serviceName={title} />
            </div>
        </div>
    );
}
