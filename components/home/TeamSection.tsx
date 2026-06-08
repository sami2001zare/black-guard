import Image from "next/image";
import { useLocale } from "next-intl";

const team = [
    {
        name: "Hamed Babaee",
        role: "Director of Operations",
        cred: "Former IRGC Special Forces, 22 years",
        img: "/image/team/op-director.jpg",
    },
    {
        name: "Sara Ahmadi",
        role: "Head of Intelligence",
        cred: "Ex‑Military Intelligence, MSc Security",
        img: "/image/team/intel-head.jpg",
    },
    {
        name: "Hamid Soroush",
        role: "Training Commander",
        cred: "Certified Firearms & Tactics Instructor",
        img: "/image/team/training-commander.jpg",
    },
];

export default function TeamSection() {
    const locale = useLocale();
    const isRtl = locale === "fa" || locale === "ar";

    return (
        <section className="py-24 bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black uppercase text-white">
                        {isRtl ? "ستاد فرماندهی" : "Command Staff"}
                    </h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-4" />
                    <p className="text-gray-400 mt-3">
                        {isRtl
                            ? "دهه‌ها تجربه عملیاتی واقعی"
                            : "Decades of real‑world operational experience"}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((m, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="relative w-40 h-40 mx-auto rounded-full border-2 border-blue-500/50 overflow-hidden mb-4 group-hover:border-blue-500 transition">
                                <Image
                                    src={m.img}
                                    alt={m.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white">
                                {m.name}
                            </h3>
                            <p className="text-blue-400 text-sm">{m.role}</p>
                            <p className="text-gray-500 text-xs mt-1">
                                {m.cred}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
