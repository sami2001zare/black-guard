const testimonials = [
    {
        quote: "Their team neutralized a credible threat before our principal ever knew. Absolute professionals.",
        name: "J. Whitfield",
        title: "Security Director, Multinational Corp",
    },
    {
        quote: "We deploy Black Guard for all high‑net‑worth events. Zero incidents in three years.",
        name: "L. Chen",
        title: "Event Logistics, Asia Pacific",
    },
    {
        quote: "The residential security upgrade reduced perimeter breaches by 100%. Highly recommended.",
        name: "M. Torkan",
        title: "Private Client",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black uppercase text-white">
                        Validated by Those Who Demand Safety
                    </h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-4" />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="border-l-4 border-blue-500 bg-gray-900 p-6"
                        >
                            <p className="text-gray-300 italic mb-4">
                                “{t.quote}”
                            </p>
                            <p className="font-bold text-white">{t.name}</p>
                            <p className="text-gray-400 text-sm">{t.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
