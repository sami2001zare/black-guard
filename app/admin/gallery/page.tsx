'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
    isGallery?: boolean; // optional, default false
    createdAt: string;
}

export default function GalleryPage() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'gallery' | 'non-gallery'>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'size'>('newest');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isBulkMode, setIsBulkMode] = useState(false);

    const fetchMedia = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/media'); // Use public endpoint
            if (res.ok) {
                const data = await res.json();
                // Ensure isGallery field exists (default to false)
                const processed = data.map((item: any) => ({
                    ...item,
                    isGallery: item.isGallery || false,
                }));
                setMedia(processed);
            } else {
                console.error('Failed to fetch media:', res.status);
            }
        } catch (error) {
            console.error('Error fetching media:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    // Filter and sort
    const filteredMedia = useMemo(() => {
        let result = [...media];

        if (filterStatus === 'gallery') {
            result = result.filter((item) => item.isGallery);
        } else if (filterStatus === 'non-gallery') {
            result = result.filter((item) => !item.isGallery);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(
                (item) =>
                    item.filename.toLowerCase().includes(term) ||
                    (item.alt && item.alt.toLowerCase().includes(term)) ||
                    (item.title && item.title.toLowerCase().includes(term))
            );
        }

        switch (sortBy) {
            case 'newest':
                result.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case 'oldest':
                result.sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
                break;
            case 'name':
                result.sort((a, b) => a.filename.localeCompare(b.filename));
                break;
            case 'size':
                result.sort((a, b) => b.size - a.size);
                break;
        }
        return result;
    }, [media, filterStatus, searchTerm, sortBy]);

    const totalImages = media.length;
    const galleryImages = media.filter((item) => item.isGallery).length;

    const handleDelete = async (id: string) => {
        if (!confirm('آیا از حذف این تصویر مطمئن هستید؟')) return;
        try {
            const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMedia(media.filter((item) => item.id !== id));
                setSelectedIds((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
            } else {
                alert('خطا در حذف تصویر');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('خطا در حذف تصویر');
        }
    };

    // Toggle gallery status - requires a PATCH endpoint. If not implemented, skip.
    const handleToggleGallery = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch('/api/media', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isGallery: !currentStatus }),
            });
            if (res.ok) {
                setMedia(
                    media.map((item) =>
                        item.id === id ? { ...item, isGallery: !currentStatus } : item
                    )
                );
            } else {
                alert('خطا در تغییر وضعیت گالری');
            }
        } catch (error) {
            console.error('Toggle gallery error:', error);
            alert('خطا در تغییر وضعیت گالری');
        }
    };

    // Bulk toggles - same issue, need PATCH endpoint
    const handleBulkToggleGallery = async (setTo: boolean) => {
        if (selectedIds.size === 0) {
            alert('لطفاً حداقل یک تصویر را انتخاب کنید.');
            return;
        }
        const confirmMessage = setTo
            ? `آیا از افزودن ${selectedIds.size} تصویر به گالری مطمئن هستید؟`
            : `آیا از حذف ${selectedIds.size} تصویر از گالری مطمئن هستید؟`;
        if (!confirm(confirmMessage)) return;

        try {
            const promises = Array.from(selectedIds).map((id) =>
                fetch('/api/media', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, isGallery: setTo }),
                })
            );
            await Promise.all(promises);
            setMedia(
                media.map((item) =>
                    selectedIds.has(item.id) ? { ...item, isGallery: setTo } : item
                )
            );
            setSelectedIds(new Set());
        } catch (error) {
            console.error('Bulk toggle error:', error);
            alert('خطا در تغییر وضعیت گالری');
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.size === 0) {
            alert('لطفاً حداقل یک تصویر را انتخاب کنید.');
            return;
        }
        if (!confirm(`آیا از حذف ${selectedIds.size} تصویر مطمئن هستید؟`)) return;

        try {
            const promises = Array.from(selectedIds).map((id) =>
                fetch(`/api/media/${id}`, { method: 'DELETE' })
            );
            await Promise.all(promises);
            setMedia(media.filter((item) => !selectedIds.has(item.id)));
            setSelectedIds(new Set());
        } catch (error) {
            console.error('Bulk delete error:', error);
            alert('خطا در حذف تصاویر');
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredMedia.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredMedia.map((item) => item.id)));
        }
    };

    const handleUploadSuccess = () => {
        setDialogOpen(false);
        fetchMedia();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">مدیریت گالری</h1>
                    <p className="text-sm text-gray-500">
                        {totalImages} تصویر • {galleryImages} در گالری
                    </p>
                </div>
                <button
                    onClick={() => setDialogOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    + افزودن تصویر جدید
                </button>
            </div>

            <AddMediaDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSuccess={handleUploadSuccess}
            />

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="جستجوی تصویر..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="all">همه تصاویر</option>
                        <option value="gallery">در گالری</option>
                        <option value="non-gallery">خارج از گالری</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="newest">جدیدترین</option>
                        <option value="oldest">قدیمی‌ترین</option>
                        <option value="name">بر اساس نام</option>
                        <option value="size">بر اساس حجم</option>
                    </select>
                    <button
                        onClick={() => setIsBulkMode(!isBulkMode)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            isBulkMode
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {isBulkMode ? 'خروج از حالت گروهی' : 'حالت گروهی'}
                    </button>
                </div>

                {isBulkMode && (
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-200">
                        <button
                            onClick={toggleSelectAll}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            {selectedIds.size === filteredMedia.length
                                ? 'لغو انتخاب همه'
                                : 'انتخاب همه'}
                        </button>
                        <span className="text-sm text-gray-500">{selectedIds.size} انتخاب شده</span>
                        <button
                            onClick={() => handleBulkToggleGallery(true)}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition"
                        >
                            افزودن به گالری
                        </button>
                        <button
                            onClick={() => handleBulkToggleGallery(false)}
                            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-md transition"
                        >
                            حذف از گالری
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition"
                        >
                            حذف انتخاب‌ها
                        </button>
                    </div>
                )}
            </div>

            {/* Media Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredMedia.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">
                        {searchTerm || filterStatus !== 'all'
                            ? 'تصویری با این شرایط یافت نشد.'
                            : 'هیچ تصویری آپلود نشده است.'}
                    </p>
                    {(searchTerm || filterStatus !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterStatus('all');
                            }}
                            className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
                        >
                            پاک کردن فیلترها
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMedia.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition ${
                                selectedIds.has(item.id)
                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                    : 'border-gray-200'
                            }`}
                        >
                            {isBulkMode && (
                                <div className="absolute top-2 left-2 z-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.has(item.id)}
                                        onChange={() => {
                                            const newSet = new Set(selectedIds);
                                            if (newSet.has(item.id)) {
                                                newSet.delete(item.id);
                                            } else {
                                                newSet.add(item.id);
                                            }
                                            setSelectedIds(newSet);
                                        }}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                            <div className="aspect-square relative">
                                <Image
                                    src={item.path}
                                    alt={item.alt || item.filename}
                                    fill
                                    className="object-cover"
                                />
                                {item.isGallery && (
                                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                        گالری
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <p className="text-sm text-gray-700 truncate" title={item.filename}>
                                    {item.filename}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {(item.size / 1024).toFixed(0)} KB
                                </p>
                            </div>
                            {!isBulkMode && (
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={() =>
                                            handleToggleGallery(item.id, item.isGallery || false)
                                        }
                                        className={`p-1.5 rounded-full ${
                                            item.isGallery
                                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                        }`}
                                        title={item.isGallery ? 'حذف از گالری' : 'افزودن به گالری'}
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
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full"
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
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
