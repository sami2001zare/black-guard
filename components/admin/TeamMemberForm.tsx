"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImagePicker from '@/components/admin/ImagePicker';

interface TeamMemberFormData {
  nameEn: string;
  nameFa: string;
  nameAr: string;
  roleEn: string;
  roleFa: string;
  roleAr: string;
  credEn: string;
  credFa: string;
  credAr: string;
  imageMediaId: string;
  published: boolean;
}

interface TeamMemberFormProps {
  id?: string;
  initialData?: Partial<TeamMemberFormData>;
}

export default function TeamMemberForm({ id, initialData }: TeamMemberFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TeamMemberFormData>({
    nameEn: '',
    nameFa: '',
    nameAr: '',
    roleEn: '',
    roleFa: '',
    roleAr: '',
    credEn: '',
    credFa: '',
    credAr: '',
    imageMediaId: '',
    published: true,
  });

  useEffect(() => {
    if (id && initialData) {
      // This is a safe pattern: we're populating form state from props
      // only on initial mount or when id/initialData changes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        nameEn: initialData.nameEn || '',
        nameFa: initialData.nameFa || '',
        nameAr: initialData.nameAr || '',
        roleEn: initialData.roleEn || '',
        roleFa: initialData.roleFa || '',
        roleAr: initialData.roleAr || '',
        credEn: initialData.credEn || '',
        credFa: initialData.credFa || '',
        credAr: initialData.credAr || '',
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

  const handleImageSelect = (mediaId: string) => {
    setFormData(prev => ({ ...prev, imageMediaId: mediaId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = id ? `/api/team/${id}` : '/api/team';
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

      router.push('/admin/team');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ذخیره‌سازی');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name (English) *</label>
          <input
            type="text"
            name="nameEn"
            value={formData.nameEn}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name (Farsi)</label>
          <input
            type="text"
            name="nameFa"
            value={formData.nameFa}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name (Arabic)</label>
          <input
            type="text"
            name="nameAr"
            value={formData.nameAr}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role (English) *</label>
          <input
            type="text"
            name="roleEn"
            value={formData.roleEn}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role (Farsi)</label>
          <input
            type="text"
            name="roleFa"
            value={formData.roleFa}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role (Arabic)</label>
          <input
            type="text"
            name="roleAr"
            value={formData.roleAr}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credentials (English)</label>
          <input
            type="text"
            name="credEn"
            value={formData.credEn}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Former Special Forces, 22 years"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credentials (Farsi)</label>
          <input
            type="text"
            name="credFa"
            value={formData.credFa}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="نیروهای ویژه سابق، ۲۲ سال"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credentials (Arabic)</label>
          <input
            type="text"
            name="credAr"
            value={formData.credAr}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="قوات خاصة سابقة، ٢٢ سنة"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تصویر (آواتار)</label>
        <ImagePicker
          selectedId={formData.imageMediaId}
          onSelect={handleImageSelect}
        />
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
        <label htmlFor="published" className="text-sm font-medium text-gray-700">منتشر شده</label>
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