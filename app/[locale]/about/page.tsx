import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations('AboutPage');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function AboutPage() {
    const locale = await getLocale();
    const t = await getTranslations('AboutPage');

    // Fetch the latest published about content
    const about = await prisma.about.findFirst({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });

    // Then manually fetch the image if needed
    // let imageMedia = null;
    // if (about?.imageMediaId) {
    //   imageMedia = await prisma.media.findUnique({
    //     where: { id: about.imageMediaId },
    //   });
    // }

    if (!about) {
        notFound();
    }

    // Select the right language fields
    const title = locale === 'fa' ? about.titleFa : locale === 'ar' ? about.titleAr : about.titleEn;

    const content =
        locale === 'fa' ? about.contentFa : locale === 'ar' ? about.contentAr : about.contentEn;

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
                        {title || t('defaultTitle')}
                    </h1>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mt-4" />
                </div>

                {/* Featured Image */}
                {/* {about.imageMedia && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-10">
            <Image
              src={about.imageMedia.path}
              alt={title || t('imageAlt')}
              fill
              className="object-cover"
              priority
            />
          </div>
        )} */}

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none leading-relaxed text-gray-200">
                    <div dangerouslySetInnerHTML={{ __html: content || '' }} />
                </div>
            </div>
        </div>
    );
}
