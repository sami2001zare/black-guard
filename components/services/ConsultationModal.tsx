'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';

interface ConsultationModalProps {
    serviceName: string;
}

export default function ConsultationModal({ serviceName }: ConsultationModalProps) {
    const t = useTranslations('ConsultationModal');
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    }, []);

    // Show modal after page load with a small delay
    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeen = sessionStorage.getItem('consultation_modal_seen');
            if (!hasSeen) {
                setIsOpen(true);
                sessionStorage.setItem('consultation_modal_seen', 'true');
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, closeModal]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const messageWithService = `${t('messagePrefix')} ${serviceName}\n\n${formData.message}`;

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: messageWithService,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to send');
            }

            setSubmitted(true);
            setTimeout(() => {
                closeModal();
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', message: '' });
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('errorMessage'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
                ref={modalRef}
                className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-gray-700 max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{t('title')}</h2>
                        <p className="text-gray-300 text-sm mt-1">
                            {t('subtitle')}{' '}
                            <span className="text-blue-400 font-semibold">{serviceName}</span>
                        </p>
                    </div>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-white transition"
                        aria-label={t('close')}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {submitted ? (
                    <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-lg text-center">
                        <p className="text-green-400 font-bold">{t('successMessage')}</p>
                        <p className="text-gray-300 text-sm mt-1">{t('successSubtext')}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="modal-name"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                {t('nameLabel')} <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="modal-name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition"
                                placeholder={t('namePlaceholder')}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="modal-email"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                {t('emailLabel')} <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                id="modal-email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition"
                                placeholder={t('emailPlaceholder')}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="modal-phone"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                {t('phoneLabel')}
                            </label>
                            <input
                                type="tel"
                                id="modal-phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition"
                                placeholder={t('phonePlaceholder')}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="modal-message"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                {t('messageLabel')} <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                id="modal-message"
                                name="message"
                                rows={3}
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
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? t('submitting') : t('submitButton')}
                        </button>
                        <p className="text-center text-gray-500 text-xs mt-2">{t('privacyNote')}</p>
                    </form>
                )}
            </div>
        </div>
    );
}
