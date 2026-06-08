"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const services = [
    {
        title: "Executive Protection",
        titleFa: "حفاظت از مدیران",
        description:
            "Armed and unarmed close protection tailored to threat levels and travel routes.",
        descriptionFa:
            "حفاظت نزدیک مسلح و غیرمسلح متناسب با سطح تهدید و مسیرهای سفر",
        image: "/image/gallery/pexels-gonzalo-mendiola-95842233-17649450.jpg",
        link: "/services/executive-protection",
    },
    {
        title: "Residential Security",
        titleFa: "امنیت منازل",
        description:
            "24/7 manned guarding, CCTV monitoring, access control, and rapid response.",
        descriptionFa:
            "نگهبانی ۲۴ ساعته، نظارت تصویری، کنترل دسترسی و پاسخ سریع",
        image: "/image/gallery/pexels-gonzalo-mendiola-95842233-17649450.jpg",
        link: "/services/residential-security",
    },
    {
        title: "Event Security",
        titleFa: "امنیت رویدادها",
        description:
            "Risk assessment, crowd management, medical standby, and emergency planning.",
        descriptionFa:
            "ارزیابی ریسک، مدیریت جمعیت، آماده باش پزشکی و برنامه‌ریزی اضطراری",
        image: "/image/gallery/pexels-gonzalo-mendiola-95842233-17649450.jpg",
        link: "/services/event-security",
    },
    {
        title: "Security Consulting",
        titleFa: "مشاوره امنیتی",
        description:
            "Vulnerability audits, policy development, and security architecture design.",
        descriptionFa: "حساب آسیب‌پذیری، تدوین سیاست و طراحی معماری امنیتی",
        image: "/image/gallery/pexels-gonzalo-mendiola-95842233-17649450.jpg",
        link: "/services/consulting",
    },
    {
        title: "Close Protection Training",
        titleFa: "آموزش حفاظت نزدیک",
        description:
            "Certified courses for individuals seeking professional bodyguard careers.",
        descriptionFa:
            "دوره‌های معتبر برای افرادی که به دنبال حرفه بادیگاردی هستند",
        image: "/image/gallery/pexels-gonzalo-mendiola-95842233-17649450.jpg",
        link: "/training",
    },
    {
        title: "Counter‑Surveillance",
        titleFa: "ضد نظارت",
        description:
            "Technical surveillance countermeasures and discreet monitoring.",
        descriptionFa: "اقدامات فنی ضد جاسوسی و نظارت محتاطانه",
        image: "/image/gallery/pexels-gonzalo-mendiola-95842233-17649450.jpg",
        link: "/services/surveillance",
    },
];

export default function ServicesGrid() {
    const locale = useLocale();
    const isRtl = locale === "fa";

    return (
        <section id="services" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-white">
                        {isRtl
                            ? "خدمات حرفه‌ای امنیتی"
                            : "Professional Security Services"}
                    </h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto my-4" />
                    <p className="text-gray-400">
                        {isRtl
                            ? "راهکارهای جامع حفاظت برای افراد، خانواده‌ها و سازمان‌ها"
                            : "Comprehensive protection solutions for individuals, families, and organizations"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-gray-900 rounded-md overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative h-52 w-full overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={
                                        isRtl ? service.titleFa : service.title
                                    }
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                                    {isRtl ? service.titleFa : service.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {isRtl
                                        ? service.descriptionFa
                                        : service.description}
                                </p>
                                <Link
                                    href={service.link}
                                    className="inline-flex items-center gap-1 text-blue-400 font-medium hover:text-blue-300 transition text-sm uppercase tracking-wide"
                                >
                                    {isRtl ? "اطلاعات بیشتر ←" : "Learn more →"}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-sm transition uppercase tracking-wide"
                    >
                        {isRtl ? "مشاهده همه خدمات" : "View All Services"}
                    </Link>
                </div>
            </div>
        </section>
    );
}
