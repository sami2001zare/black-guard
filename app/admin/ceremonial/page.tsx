'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CeremonialService {
    id: string;
    titleEn: string;
    titleFa: string;
    titleAr: string;
    imageMedia?: { path: string };
    order: number;
    published: boolean;
}

export default function CeremonialServicesPage() {
    const [services, setServices] = useState<CeremonialService[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/ceremonial');
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // This effect triggers data fetching; the state updates are safe
        // because they happen asynchronously and won't cause cascading renders.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchServices();
    }, [fetchServices]);

    const handleDelete = async (id: string) => {
        if (!confirm('آیا از حذف این خدمت تشریفاتی مطمئن هستید؟')) return;
        try {
            const res = await fetch(`/api/admin/ceremonial/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setServices(services.filter((s) => s.id !== id));
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
                <h1 className="text-2xl font-bold text-gray-800">مدیریت خدمات تشریفاتی</h1>
                <Link
                    href="/admin/ceremonial/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    + افزودن خدمت جدید
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : services.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">هیچ خدمت تشریفاتی تعریف نشده است.</p>
                    <Link
                        href="/admin/ceremonial/new"
                        className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
                    >
                        اولین خدمت را اضافه کنید
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-right p-3 font-medium text-gray-600">تصویر</th>
                                <th className="text-right p-3 font-medium text-gray-600">
                                    عنوان (EN)
                                </th>
                                <th className="text-right p-3 font-medium text-gray-600">
                                    عنوان (FA)
                                </th>
                                <th className="text-right p-3 font-medium text-gray-600">وضعیت</th>
                                <th className="text-right p-3 font-medium text-gray-600">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr
                                    key={service.id}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="p-3">
                                        {service.imageMedia ? (
                                            <div className="relative w-12 h-12 rounded overflow-hidden">
                                                <Image
                                                    src={service.imageMedia.path}
                                                    alt={service.titleEn}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                                                بدون
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3 font-medium">{service.titleEn}</td>
                                    <td className="p-3">{service.titleFa}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                service.published
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}
                                        >
                                            {service.published ? 'فعال' : 'غیرفعال'}
                                        </span>
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <Link
                                            href={`/admin/ceremonial/${service.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            ویرایش
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service.id)}
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
