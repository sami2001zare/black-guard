'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface GalleryImage {
    id: string;
    path: string;
    filename: string;
    alt?: string | null;
    title?: string | null;
    createdAt: string;
}

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const locale = useLocale();
    const t = useTranslations('GalleryPage');
    const isRtl = locale === 'fa';

    // Fetch gallery images
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/public/gallery');
                if (res.ok) {
                    const data = await res.json();
                    setImages(data);
                }
            } catch (error) {
                console.error('Error fetching gallery images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    // Control body scroll when modal is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedIndex]);

    // Navigation functions
    const goPrev = useCallback(() => {
        if (selectedIndex !== null && images.length > 0) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    }, [selectedIndex, images.length]);

    const goNext = useCallback(() => {
        if (selectedIndex !== null && images.length > 0) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    }, [selectedIndex, images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') {
                setSelectedIndex(null);
                document.body.style.overflow = 'auto';
            }
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, goPrev, goNext]);

    const openModal = (index: number) => setSelectedIndex(index);
    const closeModal = () => setSelectedIndex(null);
    const currentImage = selectedIndex !== null ? images[selectedIndex] : null;

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen py-16 md:py-24">
                <div className="container mx-auto px-4 flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div
            className="bg-black text-white min-h-screen py-16 md:py-24"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        {t('title')}
                    </h1>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mt-4" />
                    <p className="text-gray-400 mt-4">{t('subtitle')}</p>
                </div>

                {images.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">{t('noImages')}</p>
                    </div>
                ) : (
                    <>
                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={img.id}
                                    onClick={() => openModal(idx)}
                                    className="group relative aspect-square overflow-hidden rounded-md border border-gray-800 hover:border-blue-500/50 transition focus:outline-none"
                                    aria-label={img.alt || img.filename}
                                >
                                    <Image
                                        src={img.path}
                                        alt={img.alt || img.filename}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold uppercase tracking-wide">
                                            {t('enlarge')}
                                        </span>
                                    </div>
                                    {img.title && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
                                            <p className="text-white text-sm truncate">
                                                {img.title}
                                            </p>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="text-center mt-8 text-gray-500 text-sm">
                            {t('imageCount', { count: images.length })}
                        </div>
                    </>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && currentImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 z-10 text-white hover:text-blue-400 text-3xl font-bold transition"
                        aria-label={t('close')}
                    >
                        ✕
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goPrev();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition z-10"
                        aria-label={t('prev')}
                    >
                        ❮
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goNext();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition z-10"
                        aria-label={t('next')}
                    >
                        ❯
                    </button>

                    <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-md z-10">
                        {selectedIndex + 1} / {images.length}
                    </div>

                    <div
                        className="relative max-w-6xl max-h-[90vh] w-full mx-4 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full min-h-[400px] md:min-h-[600px]">
                            <Image
                                src={currentImage.path}
                                alt={currentImage.alt || currentImage.filename}
                                fill
                                className="object-contain"
                                quality={90}
                                sizes="90vw"
                                priority={selectedIndex === 0}
                            />
                        </div>
                        <p className="text-center text-gray-300 text-sm mt-4">
                            {currentImage.title || currentImage.filename}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
