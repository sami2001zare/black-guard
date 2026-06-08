"use client";

import { useLocale } from "next-intl";

const licenses = [
    {
        key: "firearm",
        name: "Firearm Carry License",
        nameFa: "مجوز حمل سلاح گرم",
        number: "IRGC‑FA‑2847",
        desc: "Authorized for concealed carry of handguns (9mm, .45 ACP)",
        descFa: "مجاز به حمل مخفیانه سلاح کمری (۹ میلی‌متر، ۴۵ACP)",
    },
    {
        key: "gas",
        name: "Non‑Lethal Weapon Permit",
        nameFa: "مجوز حمل گاز (اسپری فلفل، گاز اشک‌آور)",
        number: "IRGC‑NL‑5621",
        desc: "Pepper spray, tear gas, stun guns – certified",
        descFa: "اسپری فلفل، گاز اشک‌آور، شوکر – تأیید شده",
    },
    {
        key: "security_guard",
        name: "Certified Security Guard",
        nameFa: "گواهینامه نگهبان حرفه‌ای",
        number: "CSG‑9872",
        desc: "200‑hour physical & legal training",
        descFa: "گذراندن دوره ۲۰۰ ساعته آموزش فیزیکی و حقوقی",
    },
    {
        key: "company",
        name: "Private Security Company License",
        nameFa: "مجوز تأسیس شرکت امنیتی خصوصی",
        number: "PSC‑4531",
        desc: "Licensed by Ministry of Interior",
        descFa: "مجوز از وزارت کشور و نیروهای انتظامی",
    },
    {
        key: "bodyguard",
        name: "Bodyguard Professional Permit",
        nameFa: "پروانه حرفه‌ای بادیگارد",
        number: "BPP‑1265",
        desc: "Close protection & threat assessment",
        descFa: "گواهینامه پیشرفته حفاظت نزدیک و ارزیابی تهدید",
    },
];

export default function LicensesSection() {
    const locale = useLocale();
    const isRtl = locale === "fa";

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
                        {isRtl
                            ? "مجوزها و گواهینامه‌های رسمی"
                            : "Official Licenses & Permits"}
                    </h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto my-3" />
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                        {isRtl
                            ? "دارای کلیه مجوزهای لازم از نهادهای امنیتی و انتظامی"
                            : "Fully licensed by security and law enforcement authorities"}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {licenses.map((lic) => (
                        <div
                            key={lic.key}
                            className="bg-gray-900 border border-gray-800 rounded-md p-5 hover:border-blue-500/50 transition group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="text-blue-500 text-2xl font-mono">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                                        {isRtl ? lic.nameFa : lic.name}
                                    </h3>
                                    <p className="text-xs text-blue-400 font-mono mt-0.5">
                                        {lic.number}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                                        {isRtl ? lic.descFa : lic.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10 text-xs text-gray-500 border-t border-gray-800 pt-6">
                    {isRtl
                        ? "کلیه مجوزها قابل استعلام از مراجع ذی‌صلاح می‌باشد"
                        : "All licenses are verifiable through the issuing authorities"}
                </div>
            </div>
        </section>
    );
}
