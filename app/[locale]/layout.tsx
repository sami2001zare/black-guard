import '../globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const messages = await getMessages();

    const rtl = locale === 'fa' || locale === 'ar';

    return (
        <html lang={locale} dir={rtl ? 'rtl' : 'ltr'}>
            <body className={`bg-black text-white antialiased ${rtl ? 'rtl yekan' : 'ltr'}`}>
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
