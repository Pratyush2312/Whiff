import { useNavigate } from "react-router";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-black text-gray-300 px-6 sm:px-12 lg:px-20 pt-16 pb-8">

            {/* TOP GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* BRAND */}
                <div>
                    <h2 className="text-white text-2xl font-semibold mb-4">WHIFF</h2>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Thoughtfully crafted fragrances for everyday luxury.
                    </p>
                </div>

                {/* SHOP */}
                <div>
                    <h3 className="text-white text-sm font-semibold tracking-wider mb-4">
                        SHOP
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li
                            className="hover:text-white cursor-pointer"
                            onClick={() => navigate('/shop')}
                        >
                            Perfumes
                        </li>
                    </ul>
                </div>

                {/* FOLLOW */}
                <div>
                    <h3 className="text-white text-sm font-semibold tracking-wider mb-4">
                        FOLLOW
                    </h3>
                    <div className="flex gap-4 text-lg">
                        <a
                            href="https://www.instagram.com/whiffperfumeco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            <FaFacebook />
                        </a>
                    </div>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="text-white text-sm font-semibold tracking-wider mb-4">
                        CONTACT
                    </h3>
                    <p className="text-sm text-gray-400">
                        Email:{" "}
                        <a
                            href="mailto:whiffperfumeco@gmail.com"
                            className="hover:text-gray-400 underline"
                        >
                            whiffperfumeco@gmail.com
                        </a>
                    </p>
                    <p className="text-sm text-gray-400">
                        Phone: +91 79807 15632
                    </p>
                    <p className="text-sm text-gray-400">
                        Location: Kolkata, India
                    </p>
                </div>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-800 my-10" />

            {/* QUICK LINKS */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <span
                    onClick={() => navigate('/privacy-policy')}
                    className="hover:text-white cursor-pointer"
                >
                    Privacy Policy
                </span>

                <span
                    onClick={() => navigate('/terms')}
                    className="hover:text-white cursor-pointer"
                >
                    Terms & Conditions
                </span>

                <span
                    onClick={() => navigate('/refund-policy')}
                    className="hover:text-white cursor-pointer"
                >
                    Refund Policy
                </span>

                <span
                    onClick={() => navigate('/contact')}
                    className="hover:text-white cursor-pointer"
                >
                    Contact Us
                </span>
            </div>

            {/* BOTTOM */}
            <div className="text-center text-xs text-gray-500 mt-10">
                © 2026 Whiff. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;
