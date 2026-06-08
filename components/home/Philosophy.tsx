export default function Philosophy() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Philosophy
                    </h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        At Black Guard, we believe that true security is
                        invisible. Our professionals are trained to provide
                        seamless protection that allows you to live, work, and
                        travel with complete peace of mind.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Every client receives a tailored security plan based on
                        rigorous risk assessment, continuous training, and
                        absolute discretion. Your safety is not just our job —
                        it is our commitment.
                    </p>
                </div>

                {/* Optional: Key values as badges */}
                <div className="flex flex-wrap justify-center gap-4 mt-12">
                    {[
                        "Discretion",
                        "Professionalism",
                        "Rapid Response",
                        "Client Focus",
                    ].map((value, idx) => (
                        <span
                            key={idx}
                            className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            {value}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
