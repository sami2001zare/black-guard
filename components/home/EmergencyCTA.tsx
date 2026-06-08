import { useTranslations } from "next-intl";

export default function EmergencyCTA() {
    const t = useTranslations("cta");

    return (
        <section className="py-20 bg-red-900/10 border-y border-red-900/30 text-center">
            <h2 className="text-white text-2xl">{t("title")}</h2>

            <p className="text-gray-400 mt-3">{t("subtitle")}</p>

            <button className="mt-6 px-8 py-4 bg-red-900 text-white rounded hover:scale-105 transition">
                {t("button")}
            </button>
        </section>
    );
}
