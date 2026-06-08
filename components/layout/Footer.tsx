export default function Footer() {
    return (
        <footer className="bg-black border-t border-yellow-500/10 py-12 mt-20">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
                <div>
                    <h3 className="text-white font-bold tracking-widest mb-3">
                        BLACKGUARD
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Elite Protection & Discretion Services
                    </p>
                </div>

                <div>
                    <h4 className="text-yellow-400 mb-3">Navigation</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Home</li>
                        <li>Services</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-yellow-400 mb-3">24/7 Hotline</h4>
                    <p className="text-red-500 font-bold">+1 XXX XXX XXXX</p>
                </div>
            </div>

            <div className="text-center text-gray-600 text-xs mt-10">
                © {new Date().getFullYear()} BlackGuard. All rights reserved.
            </div>
        </footer>
    );
}
