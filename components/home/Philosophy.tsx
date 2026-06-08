import { useTranslations } from "next-intl";

export default function Philosophy() {
    const t = useTranslations("philosophy");
    const points = t.raw("points");

    return (
        <section className="py-24 bg-[#0F1A2F] text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-yellow-400 text-3xl mb-10">{t("title")}</h2>

                <div className="space-y-4 text-gray-300">
                    {points.map((p: string) => (
                        <p key={p}>{p}</p>
                    ))}
                </div>
            </div>
        </section>
    );
}
