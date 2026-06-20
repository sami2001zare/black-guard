'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const services = [
    {
        title: 'Luxury Car Rental',
        titleFa: 'اجاره خودرو لوکس',
        desc: 'Fleet of Mercedes S-Class, BMW 7 Series, Lexus LS, and armored vehicles.',
        descFa: 'ناوگان مرسدس بنز اس کلاس، بی‌ام‌و سری ۷، لکسوس LS و خودروهای زرهی',
        img: '/image/ceremonial/luxury-car.jpg',
    },
    {
        title: 'Personal Chauffeur',
        titleFa: 'راننده شخصی',
        desc: 'Discreet, professional drivers trained in evasive driving and protocol.',
        descFa: 'رانندگان حرفه‌ای آموزش‌دیده در رانندگی تدافعی و تشریفات',
        img: '/image/ceremonial/chauffeur.jpg',
    },
    {
        title: 'VIP Transfer Service',
        titleFa: 'ترانسفر تشریفاتی',
        desc: 'Airport meet & greet, hotel transfers, corporate events with full coordination.',
        descFa: 'استقبال از فرودگاه، ترانسفر هتل، رویدادهای شرکتی با هماهنگی کامل',
        img: '/image/ceremonial/vip-transfer.jpg',
    },
];

export default function CeremonialServices() {
    const locale = useLocale();
    const isRtl = locale === 'fa';

    return (
        <section className="py-24 bg-gray-950 border-y border-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                        {isRtl ? 'خدمات تشریفاتی' : 'Ceremonial Services'}
                    </h2>
                    <div className="w-20 h-0.5 bg-blue-500 mx-auto my-4" />
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {isRtl
                            ? 'تجربه سفر و تشریفات در بالاترین سطح'
                            : 'Experience travel and protocol at the highest level'}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((s, idx) => (
                        <div
                            key={idx}
                            className="group bg-black border border-gray-800 hover:border-blue-500/50 rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={s.img}
                                    alt={s.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                                    {isRtl ? s.titleFa : s.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {isRtl ? s.descFa : s.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link
                        href="/ceremonial"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold uppercase tracking-wide text-sm"
                    >
                        {isRtl ? 'درخواست خدمات تشریفاتی →' : 'Request Ceremonial Services →'}
                    </Link>
                </div>
            </div>
        </section>
    );
}
