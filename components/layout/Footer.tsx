export default function Footer() {
    return (
        <footer className="bg-black text-gray-500 py-10 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <div className="text-white font-black text-xl mb-2">
                            BLACK GUARD
                        </div>
                        <p>Executive protection & tactical security</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-2">
                            Contact
                        </h4>
                        <p>+98 21 12345 6789</p>
                        <p>ops@blackguard.com</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-2">Legal</h4>
                        <p>Licensed by IRGC Security Services</p>
                        <p>© 2025 – All rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
