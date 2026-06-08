"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations("hero");

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-24">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C89D3E_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />

            <div className="relative z-10 text-center max-w-4xl px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold tracking-widest text-white"
                >
                    {t("title")}
                </motion.h1>

                <motion.p className="mt-6 text-xl text-yellow-400">
                    {t("subtitle")}
                </motion.p>

                <motion.p className="mt-6 text-gray-400">
                    {t("description")}
                </motion.p>

                <div className="mt-10 flex gap-4 justify-center flex-wrap">
                    <button className="px-6 py-3 bg-red-900 text-white rounded hover:scale-105 transition">
                        {t("cta_primary")}
                    </button>

                    <button className="px-6 py-3 border border-yellow-500 text-yellow-400 rounded hover:scale-105 transition">
                        {t("cta_secondary")}
                    </button>
                </div>
            </div>
        </section>
    );
}
