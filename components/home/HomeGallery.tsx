"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const galleryImages = [
  { src: "/gallery/event-1.jpg", alt: "Event security", altFa: "امنیت رویداد" },
  { src: "/gallery/vip-protection.jpg", alt: "VIP protection", altFa: "حفاظت از شخصیت‌های مهم" },
  { src: "/gallery/training-session.jpg", alt: "Training session", altFa: "جلسه تمرینی" },
  { src: "/gallery/luxury-transfer.jpg", alt: "Luxury transfer", altFa: "ترانسفر لوکس" },
];

export default function HomeGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const locale = useLocale();
  const isRtl = locale === "fa";

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const currentImage = selectedIndex !== null ? galleryImages[selectedIndex] : null;

  return (
    <>
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
              {isRtl ? "نمونه کارها" : "Recent Operations"}
            </h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto my-3" />
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              {isRtl ? "گلچینی از ماموریت‌های اخیر" : "A selection of our recent missions"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => openModal(idx)}
                className="group relative aspect-square overflow-hidden rounded-md border border-gray-800 hover:border-blue-500/50 transition focus:outline-none"
                aria-label={isRtl ? img.altFa : img.alt}
              >
                <Image
                  src={img.src}
                  alt={isRtl ? img.altFa : img.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white text-sm font-semibold uppercase tracking-wide">
                    {isRtl ? "بزرگنمایی" : "Enlarge"}
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
              {isRtl ? "مشاهده گالری کامل →" : "View Full Gallery →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 text-white hover:text-blue-400 text-3xl font-bold transition focus:outline-none"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition z-10"
            aria-label="Previous"
          >
            ❮
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition z-10"
            aria-label="Next"
          >
            ❯
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md z-10">
            {selectedIndex + 1} / {galleryImages.length}
          </div>

          {/* Image container */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full mx-4 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
              <Image
                src={currentImage.src}
                alt={isRtl ? currentImage.altFa : currentImage.alt}
                fill
                className="object-contain"
                quality={95}
              />
            </div>
            <p className="text-center text-gray-300 text-sm mt-4">
              {isRtl ? currentImage.altFa : currentImage.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}