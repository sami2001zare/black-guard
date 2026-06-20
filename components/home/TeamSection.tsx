"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface TeamMember {
  id: string;
  nameEn: string;
  nameFa: string;
  nameAr: string;
  roleEn: string;
  roleFa: string;
  roleAr: string;
  credEn: string;
  credFa: string;
  credAr: string;
  imageMedia: { path: string } | null;
  order: number;
  published: boolean;
}

export default function TeamSection() {
  const t = useTranslations("TeamSection");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useLocale();

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

  // Fetch team members
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/public/team');
        if (res.ok) {
          const data = await res.json();
          setMembers(data);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const getLocalizedText = (member: TeamMember, field: 'name' | 'role' | 'cred') => {
    if (locale === 'fa') {
      return field === 'name' ? member.nameFa :
             field === 'role' ? member.roleFa :
             member.credFa;
    } else if (locale === 'ar') {
      return field === 'name' ? member.nameAr :
             field === 'role' ? member.roleAr :
             member.credAr;
    }
    return field === 'name' ? member.nameEn :
           field === 'role' ? member.roleEn :
           member.credEn;
  };

  if (loading) {
    return (
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) {
    return null;
  }

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
              {t("badge")}
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
          {members.map((member, idx) => (
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
                {member.imageMedia ? (
                  <Image
                    src={member.imageMedia.path}
                    alt={getLocalizedText(member, 'name')}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                    {t("noImage") || "No image"}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                {/* Experience Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/30">
                  <span className="text-blue-400 text-xs font-mono">
                    {getLocalizedText(member, 'cred')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                  {getLocalizedText(member, 'name')}
                </h3>
                <p className="text-blue-400 text-sm font-medium mt-1">
                  {getLocalizedText(member, 'role')}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <Link
                    href={`/team/${member.id}`}
                    className="text-blue-400 text-sm hover:text-blue-300 transition inline-flex items-center gap-1"
                  >
                    {t("viewProfile")}
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
            {t("viewAllTeam")}
            <span className="text-blue-400">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}