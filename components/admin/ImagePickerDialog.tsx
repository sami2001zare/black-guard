'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Media {
    id: string;
    path: string;
    filename: string;
}

interface ImagePickerDialogProps {
    open: boolean;
    onClose: () => void;
    onSelect: (mediaId: string) => void;
    selectedId?: string | null;
}

export default function ImagePickerDialog({
    open,
    onClose,
    onSelect,
    selectedId,
}: ImagePickerDialogProps) {
    const [media, setMedia] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (open) {
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
            fetchMedia();
        }
    }, [open]);

    const filtered = media.filter((item) =>
        item.filename.toLowerCase().includes(search.toLowerCase())
    );

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">انتخاب تصویر</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <svg
                            className="w-6 h-6"
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

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="جستجوی تصویر..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">هیچ تصویری یافت نشد.</p>
                            <p className="text-sm text-gray-400">
                                لطفاً ابتدا تصویر را در گالری آپلود کنید.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {filtered.map((item) => (
                                <div
                                    key={item.id}
                                    className={`relative aspect-square cursor-pointer border-2 rounded-lg overflow-hidden transition ${
                                        selectedId === item.id
                                            ? 'border-blue-500 ring-2 ring-blue-200'
                                            : 'border-transparent hover:border-blue-300'
                                    }`}
                                    onClick={() => {
                                        onSelect(item.id);
                                        onClose();
                                    }}
                                >
                                    <Image
                                        src={item.path}
                                        alt={item.filename}
                                        fill
                                        className="object-cover"
                                    />
                                    {selectedId === item.id && (
                                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                ✓
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                        بستن
                    </button>
                </div>
            </div>
        </div>
    );
}
