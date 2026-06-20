'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TextEditor from '@/components/admin/TextEditor';

interface FaqData {
    id?: string;
    questionEn?: string;
    questionFa?: string;
    questionAr?: string;
    answerEn?: string;
    answerFa?: string;
    answerAr?: string;
    category?: string | null;
    published?: boolean;
}

interface FaqFormProps {
    id?: string;
    initialData?: FaqData;
}

export default function FaqForm({ id, initialData }: FaqFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        questionEn: '',
        questionFa: '',
        questionAr: '',
        answerEn: '',
        answerFa: '',
        answerAr: '',
        category: '',
        published: true,
    });

    useEffect(() => {
        if (id && initialData) {
            // This is a standard form initialization pattern. The effect runs only
            // when id or initialData change, and the state update is necessary.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                questionEn: initialData.questionEn || '',
                questionFa: initialData.questionFa || '',
                questionAr: initialData.questionAr || '',
                answerEn: initialData.answerEn || '',
                answerFa: initialData.answerFa || '',
                answerAr: initialData.answerAr || '',
                category: initialData.category || '',
                published: initialData.published !== undefined ? initialData.published : true,
            });
        }
    }, [id, initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAnswerChange = (field: 'answerEn' | 'answerFa' | 'answerAr') => (html: string) => {
        setFormData((prev) => ({ ...prev, [field]: html }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = id ? `/api/faq/${id}` : '/api/faq';
            const method = id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save');
            }

            router.push('/admin/faq');
            router.refresh();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'خطا در ذخیره‌سازی';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { value: 'general', label: 'عمومی / General' },
        { value: 'security', label: 'امنیتی / Security' },
        { value: 'ceremonial', label: 'تشریفاتی / Ceremonial' },
        { value: 'training', label: 'آموزشی / Training' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question (English) *
                    </label>
                    <input
                        type="text"
                        name="questionEn"
                        value={formData.questionEn}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question (Farsi)
                    </label>
                    <input
                        type="text"
                        name="questionFa"
                        value={formData.questionFa}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question (Arabic)
                    </label>
                    <input
                        type="text"
                        name="questionAr"
                        value={formData.questionAr}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer (English) *
                    </label>
                    <TextEditor
                        value={formData.answerEn}
                        onChange={handleAnswerChange('answerEn')}
                        placeholder="Write answer in English..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer (Farsi)
                    </label>
                    <TextEditor
                        value={formData.answerFa}
                        onChange={handleAnswerChange('answerFa')}
                        placeholder="پاسخ به فارسی..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer (Arabic)
                    </label>
                    <TextEditor
                        value={formData.answerAr}
                        onChange={handleAnswerChange('answerAr')}
                        placeholder="الإجابة بالعربية..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        دسته‌بندی
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">بدون دسته‌بندی</option>
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                    <input
                        type="checkbox"
                        name="published"
                        id="published"
                        checked={formData.published}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="published" className="text-sm font-medium text-gray-700">
                        منتشر شده
                    </label>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                    انصراف
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'در حال ذخیره...' : id ? 'به‌روزرسانی' : 'افزودن'}
                </button>
            </div>
        </form>
    );
}
