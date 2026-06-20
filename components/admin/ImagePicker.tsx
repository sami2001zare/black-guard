'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImagePickerProps {
    selectedId?: string | null;
    onSelect: (mediaId: string) => void;
}

interface Media {
    id: string;
    path: string;
    filename: string;
}

export default function ImagePicker({ selectedId, onSelect }: ImagePickerProps) {
    const [media, setMedia] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchMedia = async () => {
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
    }, []);

    const filtered = media.filter((item) =>
        item.filename.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-3">
            <input
                type="text"
                placeholder="جستجوی تصویر..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {loading ? (
                <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <p className="text-gray-500 text-sm">
                    هیچ تصویری یافت نشد. لطفاً ابتدا تصویر را در گالری آپلود کنید.
                </p>
            ) : (
                <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg bg-gray-50">
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition ${
                                selectedId === item.id
                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                    : 'border-transparent hover:border-blue-300'
                            }`}
                            onClick={() => onSelect(item.id)}
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={item.path}
                                    alt={item.filename}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedId && (
                <div className="text-sm text-blue-600">
                    تصویر انتخاب شد: {media.find((m) => m.id === selectedId)?.filename}
                </div>
            )}
        </div>
    );
}
