"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TextEditor from '@/components/admin/TextEditor';
import ImagePicker from '@/components/admin/ImagePicker';

interface AboutFormProps {
  id?: string;
  initialData?: any;
}

export default function AboutForm({ id, initialData }: AboutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titleEn: '',
    titleFa: '',
    titleAr: '',
    contentEn: '',
    contentFa: '',
    contentAr: '',
    imageMediaId: '',
    published: true,
  });

  useEffect(() => {
    if (id && initialData) {
      setFormData({
        titleEn: initialData.titleEn || '',
        titleFa: initialData.titleFa || '',
        titleAr: initialData.titleAr || '',
        contentEn: initialData.contentEn || '',
        contentFa: initialData.contentFa || '',
        contentAr: initialData.contentAr || '',
        imageMediaId: initialData.imageMediaId || '',
        published: initialData.published !== undefined ? initialData.published : true,
      });
    }
  }, [id, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContentChange = (field: 'contentEn' | 'contentFa' | 'contentAr') => (html: string) => {
    setFormData(prev => ({ ...prev, [field]: html }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = id ? `/api/about/${id}` : '/api/about';
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

      router.push('/admin/about');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'خطا در ذخیره‌سازی');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Titles */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title (English) *</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Title (Farsi)</label>
          <input
            type="text"
            name="titleFa"
            value={formData.titleFa}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title (Arabic)</label>
          <input
            type="text"
            name="titleAr"
            value={formData.titleAr}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Content (Rich Text) */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (English) *</label>
          <TextEditor
            value={formData.contentEn}
            onChange={handleContentChange('contentEn')}
            placeholder="Write about your company in English..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (Farsi)</label>
          <TextEditor
            value={formData.contentFa}
            onChange={handleContentChange('contentFa')}
            placeholder="درباره شرکت خود به فارسی بنویسید..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (Arabic)</label>
          <TextEditor
            value={formData.contentAr}
            onChange={handleContentChange('contentAr')}
            placeholder="اكتب عن شركتك بالعربية..."
          />
        </div>
      </div>

      {/* Image Picker
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تصویر اصلی</label>
        <ImagePicker
          selectedId={formData.imageMediaId}
          onSelect={handleImageSelect}
        />
      </div> */}

      {/* Published Checkbox */}
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
  );
}