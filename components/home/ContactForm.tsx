"use client";
import { useState } from "react";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
        setSubmitted(true);
    };

    return (
        <section className="py-24 bg-gray-900">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white uppercase">
                        Request a Consultation
                    </h2>
                    <div className="w-12 h-0.5 bg-blue-500 mx-auto my-3" />
                    <p className="text-gray-300">
                        Complete the form. A security advisor will respond
                        within 2 hours.
                    </p>
                </div>
                {submitted ? (
                    <div className="bg-blue-500/10 border border-blue-500 p-6 text-center">
                        <p className="text-blue-400 font-bold">
                            Request received.
                        </p>
                        <p className="text-gray-300 text-sm">
                            We’ll contact you shortly.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full name"
                                required
                                className="w-full bg-black border border-gray-700 p-3 text-white placeholder-gray-500 focus:border-blue-500 outline-none"
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                                className="w-full bg-black border border-gray-700 p-3 text-white placeholder-gray-500 focus:border-blue-500 outline-none"
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone (optional)"
                            className="w-full bg-black border border-gray-700 p-3 text-white placeholder-gray-500 focus:border-blue-500 outline-none"
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                        />
                        <textarea
                            name="message"
                            rows={4}
                            placeholder="Describe your security requirement"
                            required
                            className="w-full bg-black border border-gray-700 p-3 text-white placeholder-gray-500 focus:border-blue-500 outline-none"
                            onChange={(e) =>
                                setForm({ ...form, message: e.target.value })
                            }
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 uppercase tracking-wide transition"
                        >
                            Send Encrypted Request
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
