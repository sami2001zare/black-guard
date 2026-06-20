'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
    const t = useTranslations('ContactPage');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to send');
            }

            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            setError(err instanceof Error ? err.message : t('errorMessage'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-500/10 border border-green-500/50 p-6 rounded-lg text-center">
                <div className="text-green-400 text-4xl mb-2">✓</div>
                <p className="text-green-400 font-bold text-lg">{t('successMessage')}</p>
                <p className="text-gray-300 text-sm mt-1">{t('successSubtext')}</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-blue-400 hover:text-blue-300 text-sm underline transition"
                >
                    {t('sendAnother')}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('nameLabel')} <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition"
                    placeholder={t('namePlaceholder')}
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('emailLabel')} <span className="text-red-400">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition"
                    placeholder={t('emailPlaceholder')}
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('phoneLabel')}
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition"
                    placeholder={t('phonePlaceholder')}
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('messageLabel')} <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition resize-none"
                    placeholder={t('messagePlaceholder')}
                />
            </div>
            {error && (
                <div className="bg-red-500/10 border border-red-500 p-3 rounded-lg text-red-400 text-sm">
                    {error}
                </div>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
                {isSubmitting ? t('submitting') : t('submitButton')}
            </button>
            <p className="text-center text-gray-500 text-xs">{t('privacyNote')}</p>
        </form>
    );
}
