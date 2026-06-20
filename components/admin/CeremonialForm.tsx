'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextEditor from '@/components/admin/TextEditor';
import ImagePickerDialog from '@/components/admin/ImagePickerDialog';

interface CeremonialInitialData {
    titleEn?: string;
    titleFa?: string;
    titleAr?: string;
    descriptionEn?: string;
    descriptionFa?: string;
    descriptionAr?: string;
    imageMediaId?: string | null;
    published?: boolean;
}

interface CeremonialFormProps {
    id?: string;
    initialData?: CeremonialInitialData;
}

export default function CeremonialForm({ id, initialData }: CeremonialFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showImagePicker, setShowImagePicker] = useState(false);

    const [formData, setFormData] = useState({
        titleEn: '',
        titleFa: '',
        titleAr: '',
        descriptionEn: '',
        descriptionFa: '',
        descriptionAr: '',
        imageMediaId: '',
        published: true,
    });

    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (id && initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                titleEn: initialData.titleEn || '',
                titleFa: initialData.titleFa || '',
                titleAr: initialData.titleAr || '',
                descriptionEn: initialData.descriptionEn || '',
                descriptionFa: initialData.descriptionFa || '',
                descriptionAr: initialData.descriptionAr || '',
                imageMediaId: initialData.imageMediaId || '',
                published: initialData.published !== undefined ? initialData.published : true,
            });
        }
    }, [id, initialData]);

    useEffect(() => {
        if (formData.imageMediaId) {
            fetch(`/api/media/${formData.imageMediaId}`)
                .then((res) => res.json())
                .then((data) => setSelectedImageUrl(data.path))
                .catch(() => setSelectedImageUrl(null));
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedImageUrl(null);
        }
    }, [formData.imageMediaId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDescriptionChange =
        (field: 'descriptionEn' | 'descriptionFa' | 'descriptionAr') => (html: string) => {
            setFormData((prev) => ({ ...prev, [field]: html }));
        };

    const handleImageSelect = (mediaId: string) => {
        setFormData((prev) => ({ ...prev, imageMediaId: mediaId }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = id ? `/api/admin/ceremonial/${id}` : '/api/admin/ceremonial';
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

            router.push('/admin/ceremonial');
            router.refresh();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'خطا در ذخیره‌سازی';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title (English) *
                        </label>
                        <input
                            type="text"
                            name="titleEn"
                            value={formData.titleEn}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title (Farsi)
                        </label>
                        <input
                            type="text"
                            name="titleFa"
                            value={formData.titleFa}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title (Arabic)
                        </label>
                        <input
                            type="text"
                            name="titleAr"
                            value={formData.titleAr}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (English) *
                        </label>
                        <TextEditor
                            value={formData.descriptionEn}
                            onChange={handleDescriptionChange('descriptionEn')}
                            placeholder="Describe service in English..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (Farsi)
                        </label>
                        <TextEditor
                            value={formData.descriptionFa}
                            onChange={handleDescriptionChange('descriptionFa')}
                            placeholder="توضیحات به فارسی..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (Arabic)
                        </label>
                        <TextEditor
                            value={formData.descriptionAr}
                            onChange={handleDescriptionChange('descriptionAr')}
                            placeholder="الوصف بالعربية..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">تصویر</label>
                    <div className="flex items-start gap-4">
                        <button
                            type="button"
                            onClick={() => setShowImagePicker(true)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition text-sm"
                        >
                            انتخاب تصویر
                        </button>
                        {formData.imageMediaId && (
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, imageMediaId: '' }))
                                }
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                حذف
                            </button>
                        )}
                    </div>
                    {selectedImageUrl && (
                        <div className="mt-2 relative w-32 h-32 border border-gray-200 rounded-lg overflow-hidden">
                            <Image
                                src={selectedImageUrl}
                                alt="Selected thumbnail"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
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

            <ImagePickerDialog
                open={showImagePicker}
                onClose={() => setShowImagePicker(false)}
                onSelect={handleImageSelect}
                selectedId={formData.imageMediaId}
            />
        </>
    );
}
