'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MobileActionBar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Hide bar when scrolling down, show when scrolling up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 shadow-lg z-50 transition-transform duration-300 md:hidden ${
                isVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
            <div className="flex justify-around items-center">
                <Link href="tel:+1234567890" className="flex flex-col items-center">
                    <span className="text-xl">📞</span>
                    <span className="text-xs mt-1">Call</span>
                </Link>
                <Link href="/contact" className="flex flex-col items-center">
                    <span className="text-xl">✉️</span>
                    <span className="text-xs mt-1">Quote</span>
                </Link>
                <Link href="/services" className="flex flex-col items-center">
                    <span className="text-xl">🛡️</span>
                    <span className="text-xs mt-1">Services</span>
                </Link>
            </div>
        </div>
    );
}
