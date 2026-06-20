"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface About {
  id: string;
  titleEn: string;
  titleFa: string;
  titleAr: string;
  imageMedia?: { path: string };
  published: boolean;
  createdAt: string;
}

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/about');
      if (res.ok) {
        const data = await res.json();
        setAbout(data);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // This effect runs only once on mount. The state updates are safe
    // and necessary for fetching initial data.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAbout();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این محتوا مطمئن هستید؟')) return;
    try {
      const res = await fetch(`/api/about/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAbout(null);
      } else {
        alert('خطا در حذف');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('خطا در حذف');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">مدیریت درباره ما</h1>
        {!about && (
          <Link
            href="/admin/about/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            + افزودن محتوا
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !about ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">هیچ محتوایی برای درباره ما تعریف نشده است.</p>
          <Link
            href="/admin/about/new"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            اولین محتوا را اضافه کنید
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-6">
              {about.imageMedia ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={about.imageMedia.path}
                    alt={about.titleEn}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs shrink-0">
                  بدون تصویر
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{about.titleEn}</h2>
                <p className="text-gray-500 text-sm mt-1">{about.titleFa}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    about.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {about.published ? 'فعال' : 'غیرفعال'}
                  </span>
                  <span className="text-xs text-gray-400">
                    ایجاد: {new Date(about.createdAt).toLocaleDateString('fa-IR')}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/about/${about.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ویرایش
                </Link>
                <button
                  onClick={() => handleDelete(about.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}