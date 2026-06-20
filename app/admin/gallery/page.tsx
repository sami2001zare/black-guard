'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AddMediaDialog from '@/components/admin/AddMediaDialog';

interface MediaItem {
    id: string;
    filename: string;
    path: string;
    mimeType: string;
    size: number;
    alt?: string;
    title?: string;
    createdAt: string;
}

export default function GalleryPage() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/media');
            if (res.ok) {
                const data = await res.json();
                setMedia(data);
            }
        } catch (error) {
            console.error('Error fetching media:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // This effect runs only once on mount. The state updates are safe
        // and necessary for fetching initial data.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMedia();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('آیا از حذف این تصویر مطمئن هستید؟')) return;
        try {
            const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMedia(media.filter((item) => item.id !== id));
            } else {
                alert('خطا در حذف تصویر');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('خطا در حذف تصویر');
        }
    };

    const handleUploadSuccess = () => {
        setDialogOpen(false);
        fetchMedia();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">مدیریت گالری</h1>
                <button
                    onClick={() => setDialogOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    + افزودن تصویر جدید
                </button>
            </div>

            {/* Upload Dialog */}
            <AddMediaDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSuccess={handleUploadSuccess}
            />

            {/* Media Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : media.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">هیچ تصویری آپلود نشده است.</p>
                    <button
                        onClick={() => setDialogOpen(true)}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        اولین تصویر را آپلود کنید
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {media.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={item.path}
                                    alt={item.alt || item.filename}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-3">
                                <p className="text-sm text-gray-700 truncate" title={item.filename}>
                                    {item.filename}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {(item.size / 1024).toFixed(0)} KB
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
