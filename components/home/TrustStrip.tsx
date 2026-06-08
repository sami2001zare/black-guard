export default function TrustStrip() {
    const stats = [
        { value: "15+", label: "Years of Service" },
        { value: "98%", label: "Client Retention" },
        { value: "< 3min", label: "Avg. Response" },
        { value: "24/7", label: "Global Coverage" },
    ];

    return (
        <div className="bg-black border-b border-gray-800 py-5">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center md:justify-between gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-blue-500">
                                {stat.value}
                            </div>
                            <div className="text-xs uppercase tracking-wider text-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
