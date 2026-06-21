'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

interface Faq {
    id: string;
    questionEn: string;
    questionFa: string;
    questionAr: string;
    answerEn: string;
    answerFa: string;
    answerAr: string;
    category: string | null;
    order: number;
    published: boolean;
}

export default function FAQPage() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const locale = useLocale();
    const t = useTranslations('FAQPage');
    const isRtl = locale === 'fa';

    // Get unique categories
    const categories = Array.from(new Set(faqs.map((faq) => faq.category).filter(Boolean)));

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const url = selectedCategory
                    ? `/api/public/faq?category=${selectedCategory}`
                    : '/api/public/faq';
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setFaqs(data);
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFAQs();
    }, [selectedCategory]);

    const getLocalizedQuestion = (faq: Faq) => {
        if (locale === 'fa') return faq.questionFa;
        if (locale === 'ar') return faq.questionAr;
        return faq.questionEn;
    };

    const getLocalizedAnswer = (faq: Faq) => {
        if (locale === 'fa') return faq.answerFa;
        if (locale === 'ar') return faq.answerAr;
        return faq.answerEn;
    };

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen py-16 md:py-24">
                <div className="container mx-auto px-4 flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div
            className="bg-black text-white min-h-screen py-16 md:py-24"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        {t('title')}
                    </h1>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mt-4" />
                    <p className="text-gray-400 mt-4">{t('subtitle')}</p>
                </div>

                {/* Category Filters */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                selectedCategory === null
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            {t('all')}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                    selectedCategory === cat
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {t(`category_${cat}`) || cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* FAQs List */}
                {faqs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">{t('noFaqs')}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/50 transition"
                                >
                                    <span className="text-lg font-medium text-white">
                                        {getLocalizedQuestion(faq)}
                                    </span>
                                    <span className="text-blue-400 text-2xl ml-4 flex-shrink-0">
                                        {activeIndex === index ? '−' : '+'}
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        activeIndex === index
                                            ? 'max-h-[1000px] opacity-100'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div
                                        className="p-5 pt-0 text-gray-300 leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedAnswer(faq),
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
