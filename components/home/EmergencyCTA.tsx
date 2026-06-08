import Link from "next/link";

export default function EmergencyCTA() {
    return (
        <section className="bg-blue-700 py-16">
            <div className="container mx-auto px-4 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Need Immediate Protection?
                </h2>
                <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                    Our team is ready 24/7 to respond to your security needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="tel:+1234567890"
                        className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition duration-300"
                    >
                        Call Emergency Line
                    </Link>
                    <Link
                        href="/contact"
                        className="border border-white hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-md transition duration-300"
                    >
                        Request a Quote
                    </Link>
                </div>
                <p className="text-sm mt-6 text-blue-100">
                    Available 24 hours a day, 7 days a week
                </p>
            </div>
        </section>
    );
}
