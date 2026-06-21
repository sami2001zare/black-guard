'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface GalleryImage {
    id: string;
    path: string;
    filename: string;
    alt?: string | null;
    title?: string | null;
}

export default function HomeGallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const t = useTranslations('Gallery');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/public/gallery');
                if (res.ok) {
                    const data = await res.json();
                    // Show up to 8 latest images on homepage
                    setImages(data.slice(0, 8));
                }
            } catch (error) {
                console.error('Error fetching gallery images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    // Lightbox logic (same as gallery page)
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
            <section className="py-20 bg-black">
                <div className="container mx-auto px-4 flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </section>
        );
    }

    if (images.length === 0) return null;

    return (
        <>
            <section className="py-20 bg-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
                            {t('title')}
                        </h2>
                        <div className="w-16 h-0.5 bg-blue-500 mx-auto my-3" />
                        <p className="text-gray-400 text-sm max-w-2xl mx-auto">{t('subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold uppercase tracking-wide">
                                        {t('enlarge')}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            href="/gallery"
                            className="inline-flex items-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black px-6 py-2 font-bold uppercase tracking-wide transition text-sm"
                        >
                            {t('viewAll')} →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal (same as gallery page) */}
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition z-10"
                        aria-label={t('prev')}
                    >
                        ❮
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goNext();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition z-10"
                        aria-label={t('next')}
                    >
                        ❯
                    </button>
                    <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md z-10">
                        {selectedIndex + 1} / {images.length}
                    </div>
                    <div
                        className="relative max-w-5xl max-h-[90vh] w-full mx-4 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
                            <Image
                                src={currentImage.path}
                                alt={currentImage.alt || currentImage.filename}
                                fill
                                className="object-contain"
                                quality={90}
                                sizes="90vw"
                            />
                        </div>
                        <p className="text-center text-gray-300 text-sm mt-4">
                            {currentImage.title || currentImage.filename}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
