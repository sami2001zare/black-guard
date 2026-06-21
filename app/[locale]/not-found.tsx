import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NotFound() {
    const locale = await getLocale();
    const t = await getTranslations('NotFound');
    const isRtl = locale === 'fa' || locale === 'ar';

    return (
        <div
            className="min-h-screen bg-black text-white flex items-center justify-center px-4"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <div className="text-center max-w-2xl">
                <div className="text-8xl md:text-9xl font-black text-blue-500 mb-4">404</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('title')}</h1>
                <p className="text-gray-400 text-lg mb-8">{t('description')}</p>
                <Link
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md transition"
                >
                    {t('backHome')}
                </Link>
            </div>
        </div>
    );
}
