'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'خطا در ورود');
                setLoading(false);
                return;
            }

            // Success: redirect to admin with full page reload
            window.location.href = '/admin';
        } catch {
            setError('خطای شبکه، لطفاً دوباره تلاش کنید');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">ب</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">ورود به پنل مدیریت</h1>
                    <p className="text-gray-500 text-sm mt-1">لطفاً اطلاعات خود را وارد کنید</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            ایمیل
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            رمز عبور
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'در حال ورود...' : 'ورود'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <Link href="/" className="text-blue-600 hover:text-blue-700 transition">
                        بازگشت به سایت
                    </Link>
                </div>
            </div>
        </div>
    );
}
