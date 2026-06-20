import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('ContactPage');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function ContactPage() {
    const locale = await getLocale();
    const t = await getTranslations('ContactPage');
    const isRtl = locale === 'fa' || locale === 'ar';

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

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-white mb-4">
                                {t('contactInfo')}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-400 text-sm">{t('phone')}</p>
                                    <p className="text-white font-medium">+98 21 1234 5678</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">{t('email')}</p>
                                    <a
                                        href="mailto:info@blackguard.com"
                                        className="text-blue-400 hover:text-blue-300 transition"
                                    >
                                        info@blackguard.com
                                    </a>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">{t('address')}</p>
                                    <p className="text-white">Tehran, Iran</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">{t('workingHours')}</p>
                                    <p className="text-white">24/7 – Always Available</p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
                            <div className="text-blue-500 text-3xl font-bold mb-2">24/7</div>
                            <p className="text-gray-400 text-sm">{t('alwaysAvailable')}</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">
                                {t('sendMessage')}
                            </h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>

               
            </div>
        </div>
    );
}
