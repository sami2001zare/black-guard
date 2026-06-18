"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TeamSection() {
  const t = useTranslations("TeamSection");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const teamMembers = [
    { id: "1", image: "/team/op-director.jpg", social: { linkedin: "#", twitter: "#" } },
    { id: "2", image: "/team/intel-head.jpg", social: { linkedin: "#", twitter: "#" } },
    { id: "3", image: "/team/training-commander.jpg", social: { linkedin: "#", twitter: "#" } },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-blue-400 text-sm font-mono uppercase tracking-widest">
              {t("badge") || "MEET THE TEAM"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white mt-3">
            {t("title")}
          </h2>
          <div className="w-20 h-0.5 bg-blue-500 mx-auto mt-4" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              className={`
                group relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden
                transition-all duration-700 ease-out hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden bg-gray-800">
                <Image
                  src={member.image}
                  alt={t(`member${member.id}Name`)}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                
                {/* Social Icons - Appear on Hover */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-4 group-hover:translate-y-0">
                  <Link
                    href={member.social.linkedin}
                    className="w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white text-sm transition"
                    aria-label="LinkedIn"
                  >
                    in
                  </Link>
                  <Link
                    href={member.social.twitter}
                    className="w-9 h-9 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center text-white text-sm transition"
                    aria-label="Twitter"
                  >
                    tw
                  </Link>
                </div>

                {/* Experience Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/30">
                  <span className="text-blue-400 text-xs font-mono">
                    {t(`member${member.id}Cred`)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                  {t(`member${member.id}Name`)}
                </h3>
                <p className="text-blue-400 text-sm font-medium mt-1">
                  {t(`member${member.id}Role`)}
                </p>
                <div className="flex justify-center gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-gray-800 rounded text-gray-400 text-[10px] uppercase tracking-wider">
                    {t(`member${member.id}Specialty`) || "Expert"}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <Link
                    href={`/team/${member.id}`}
                    className="text-blue-400 text-sm hover:text-blue-300 transition inline-flex items-center gap-1"
                  >
                    {t("viewProfile") || "View Profile"}
                    <span className="inline-block transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <div className="text-center mt-12">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white border border-gray-700 hover:border-blue-500 px-6 py-3 rounded-sm font-medium transition"
          >
            {t("viewAllTeam") || "View All Team Members"}
            <span className="text-blue-400">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}