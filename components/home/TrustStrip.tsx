import { useTranslations } from "next-intl";

export default function TrustStrip() {
    const t = useTranslations("trust");
    const items = t.raw("items");

    return (
        <section className="bg-[#0F1A2F] py-6 border-y border-yellow-500/10">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center text-gray-300 text-sm">
                {items.map((item: string) => (
                    <div key={item}>{item}</div>
                ))}
            </div>
        </section>
    );
}
