"use client";

export default function MobileActionBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 md:hidden flex z-50">
            <button className="flex-1 bg-red-900 text-white py-4">
                Call 24/7
            </button>
            <button className="flex-1 bg-yellow-600 text-black py-4">
                Contact
            </button>
        </div>
    );
}
