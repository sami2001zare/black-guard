const clients = [
    "National Bank of Persia",
    "Gulf Bridge Logistics",
    "AriaTech Industries",
    "Tehran Grand Hotel",
];

export default function ClientsSection() {
    return (
        <section className="py-12 bg-black border-y border-gray-800">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-6">
                    Trusted by leading organizations
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-gray-400 font-medium">
                    {clients.map((c, idx) => (
                        <span key={idx}>{c}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}
