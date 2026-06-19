'use client'

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Animation on scroll - fade in cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Testimonial keys (for translation)
  const testimonialKeys = ["1", "2", "3"];

  return (
    <section ref={sectionRef} className="py-24 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white">
            {t("title")}
          </h2>
          <div className="w-20 h-0.5 bg-blue-500 mx-auto mt-4" />
          <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto">
            {t("subtitle") || "What our clients say about us"}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialKeys.map((key, idx) => (
            <div
              key={idx}
              className={`
                border-l-4 border-blue-500 bg-gray-900 p-6 
                transition-all duration-700 ease-out
                hover:bg-gray-800 hover:border-blue-400 hover:-translate-y-1
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="text-blue-500 text-3xl font-serif mb-2">"</div>
              
              {/* Quote Text */}
              <p className="text-gray-300 italic mb-4 leading-relaxed">
                {t(`quote${key}`)}
              </p>
              
              {/* Author Info */}
              <div className="pt-4 border-t border-gray-700">
                <p className="font-bold text-white">{t(`name${key}`)}</p>
                <p className="text-gray-400 text-sm">{t(`title${key}`)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 px-4 py-2 rounded-md">
            <span className="text-blue-500 text-lg">★</span>
            <span className="text-gray-300 text-sm">
              {t("ratingText") || "Rated 4.9/5 by our clients"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}