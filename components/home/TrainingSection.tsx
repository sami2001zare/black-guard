import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function TrainingSection() {
    const locale = useLocale();
    const isRtl = locale === 'fa';

    return (
        <section className="py-24 bg-gray-950 border-y border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-blue-400 text-sm uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                            {isRtl ? 'آکادمی بلک گارد' : 'Black Guard Academy'}
                        </span>
                        <h2 className="text-4xl font-black text-white mt-3 mb-4">
                            {isRtl
                                ? 'آموزش دیده در میدان نبرد. اصلاح شده برای حفاظت.'
                                : 'Forged in Combat. Refined for Protection.'}
                        </h2>
                        <p className="text-gray-300 mb-6">
                            {isRtl
                                ? 'مربیان ما اپراتورهای فعال و بازنشسته نیروهای ویژه هستند.'
                                : 'Our instructors are active‑duty and former Tier‑1 operators.'}
                        </p>
                        <ul className="space-y-2 mb-8">
                            {[
                                isRtl ? 'متخصص حفاظت نزدیک' : 'Close Protection Specialist',
                                isRtl ? 'رانندگی تدافعی پیشرفته' : 'Advanced Evasive Driving',
                                isRtl ? 'نظارت و ضد نظارت' : 'Surveillance & Counter‑Surveillance',
                                isRtl ? 'مدیریت تروما اضطراری' : 'Emergency Trauma Management',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-200">
                                    <span className="text-blue-500 font-bold">›</span> {item}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/training"
                            className="inline-flex items-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black px-6 py-3 font-bold uppercase tracking-wide transition"
                        >
                            {isRtl ? 'مشاهده زمان‌بندی →' : 'View Schedule →'}
                        </Link>
                    </div>
                    <div className="relative h-96 w-full rounded-md overflow-hidden">
                        <Image
                            src="/image/tactical-training.jpg"
                            alt="Tactical training"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
