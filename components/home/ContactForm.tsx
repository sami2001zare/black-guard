"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// SVG Icons (inline to avoid dependencies)
const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-mono uppercase tracking-widest">
            {t("badge") || "GET IN TOUCH"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase mt-2">
            {t("title")}
          </h2>
          <div className="w-16 h-0.5 bg-blue-500 mx-auto my-4" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/50 p-8 rounded-md text-center animate-in fade-in duration-500">
            <CheckIcon />
            <p className="text-green-400 font-bold text-lg">
              {t("successMessage")}
            </p>
            <p className="text-gray-300 text-sm mt-2">
              {t("successSubtext")}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm underline transition"
            >
              {t("sendAnother") || "Send another message"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-1.5">
                  {t("nameLabel") || "Full Name"} <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t("namePlaceholder")}
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-black border ${errors.name ? "border-red-500" : "border-gray-700"} p-3 pl-10 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition rounded-sm`}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <UserIcon />
                  </span>
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 animate-in fade-in">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1.5">
                  {t("emailLabel") || "Email Address"} <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-black border ${errors.email ? "border-red-500" : "border-gray-700"} p-3 pl-10 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition rounded-sm`}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <EmailIcon />
                  </span>
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 animate-in fade-in">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-1.5">
                {t("phoneLabel") || "Phone Number"}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t("phonePlaceholder")}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 p-3 pl-10 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition rounded-sm"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <PhoneIcon />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-1.5">
                {t("messageLabel") || "Message"} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t("messagePlaceholder")}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-black border ${errors.message ? "border-red-500" : "border-gray-700"} p-3 pl-10 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition rounded-sm resize-none`}
                />
                <span className="absolute left-3 top-3">
                  <MessageIcon />
                </span>
              </div>
              {errors.message && (
                <p className="text-red-400 text-xs mt-1 animate-in fade-in">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 uppercase tracking-wide transition rounded-sm ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("submitting") || "Sending..."}
                </span>
              ) : (
                t("submitButton")
              )}
            </button>

            {submitError && (
              <div className="bg-red-500/10 border border-red-500 p-4 text-center rounded-sm animate-in fade-in">
                <p className="text-red-400 text-sm">{t("errorMessage") || "Something went wrong. Please try again."}</p>
              </div>
            )}

            <p className="text-center text-gray-500 text-xs mt-4">
              {t("privacyNote") || "Your information is encrypted and will never be shared with third parties."}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}