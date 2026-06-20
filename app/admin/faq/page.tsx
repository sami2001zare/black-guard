'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Faq {
    id: string;
    questionEn: string;
    questionFa: string;
    questionAr: string;
    category: string | null;
    order: number;
    published: boolean;
    createdAt: string;
}

export default function FaqPage() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/faq');
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

    useEffect(() => {
        // This effect runs only once on mount. The state updates are safe
        // and necessary for fetching initial data.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFaqs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('آیا از حذف این سوال مطمئن هستید؟')) return;
        try {
            const res = await fetch(`/api/faq/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setFaqs(faqs.filter((f) => f.id !== id));
            } else {
                alert('خطا در حذف');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('خطا در حذف');
        }
    };

    const getCategoryLabel = (category: string | null) => {
        const map: Record<string, string> = {
            general: 'عمومی',
            security: 'امنیتی',
            ceremonial: 'تشریفاتی',
            training: 'آموزشی',
        };
        return category ? map[category] || category : 'بدون دسته';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">مدیریت سوالات متداول (FAQ)</h1>
                <Link
                    href="/admin/faq/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    + افزودن سوال جدید
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : faqs.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">هیچ سوالی تعریف نشده است.</p>
                    <Link
                        href="/admin/faq/new"
                        className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
                    >
                        اولین سوال را اضافه کنید
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-right p-3 font-medium text-gray-600">
                                    سوال (EN)
                                </th>
                                <th className="text-right p-3 font-medium text-gray-600">
                                    سوال (FA)
                                </th>
                                <th className="text-right p-3 font-medium text-gray-600">
                                    دسته‌بندی
                                </th>
                                <th className="text-right p-3 font-medium text-gray-600">وضعیت</th>
                                <th className="text-right p-3 font-medium text-gray-600">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqs.map((faq) => (
                                <tr
                                    key={faq.id}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="p-3 font-medium">{faq.questionEn}</td>
                                    <td className="p-3">{faq.questionFa}</td>
                                    <td className="p-3">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                            {getCategoryLabel(faq.category)}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                faq.published
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}
                                        >
                                            {faq.published ? 'فعال' : 'غیرفعال'}
                                        </span>
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <Link
                                            href={`/admin/faq/${faq.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            ویرایش
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(faq.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
