import { useTranslations } from "next-intl";

export default function ServicesGrid() {
    const t = useTranslations("services");
    const items = t.raw("items");

    return (
        <section id="services" className="py-20 bg-black">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-yellow-400 text-2xl mb-10">{t("title")}</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((item: string) => (
                        <div
                            key={item}
                            className="p-6 bg-black/40 border border-yellow-500/10 rounded-lg hover:border-yellow-500/40 transition"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
