import { useNavigate } from "react-router";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
    const navigate=useNavigate()
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
                        <li className="hover:text-white cursor-pointer" onClick={()=>{navigate('/shop')}}>
                            Perfumes
                        </li>
                    </ul>
                </div>

                {/* FOLLOW */}
                <div>
                    <h3 className="text-white text-sm font-semibold tracking-wider mb-4">
                        FOLLOW
                    </h3>
                    <div className="flex gap-4">
                        <span className="cursor-pointer hover:text-white">
                            <a href="https://www.instagram.com/whiffperfumeco?igsh=MTFicmxpN3R3YmRhNQ%3D%3D&utm_source=qr" target='_blank'><FaInstagram/></a>
                        </span>
                        <span className="cursor-pointer hover:text-white">
                            <a href="https://www.facebook.com/share/17idBkpH2e/?mibextid=wwXIfr" target='_blank'><FaFacebook/></a>
                        </span>
                    </div>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-800 my-10" />

            {/* POLICIES */}
            <div className="max-w-4xl mx-auto text-sm text-gray-400 space-y-6 leading-relaxed">

                <p>
                    Due to the nature of perfumes and personal care products, returns are
                    not accepted once the product has been opened or used.
                </p>

                <p>
                    However, we do offer replacements in case of:
                    <br />• Damaged products during transit
                    <br />• Incorrect items received
                </p>

                <p>
                    To request a replacement, please contact us within 24 hours of delivery
                    with clear photos or videos of the issue.
                </p>

                <p>
                    Orders are delivered within <span className="text-white">7–8 business days</span>.
                    Please note that Saturdays and Sundays are not counted as business days.
                </p>

            </div>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto mt-12 text-sm text-gray-400 space-y-4">

                <h4 className="text-white font-semibold text-base mb-4">
                    FAQs
                </h4>

                <p><span className="text-white">1. How long does shipping take?</span><br />
                    Orders are usually delivered within 7–8 business days.
                </p>

                <p><span className="text-white">2. Do you accept returns?</span><br />
                    Returns are not accepted once the product is opened or used.
                    Replacements are provided for damaged or incorrect items.
                </p>

                <p><span className="text-white">3. What should I do if I receive a damaged product?</span><br />
                    Contact us within 24 hours with clear photos or videos.
                </p>

                <p><span className="text-white">4. Are your perfumes long-lasting?</span><br />
                    Yes, our perfumes are crafted for excellent longevity, especially for Indian weather.
                </p>

                <p><span className="text-white">5. Are Whiff perfumes inspired by luxury fragrances?</span><br />
                    Yes, inspired by luxury scents while maintaining a unique identity.
                </p>

                <p><span className="text-white">6. Can I cancel my order after placing it?</span><br />
                    Orders can be cancelled only before shipping.
                </p>

                <p><span className="text-white">7. Do you offer Cash on Delivery (COD)?</span><br />
                    COD availability depends on your location.
                </p>

                <p><span className="text-white">8. How can I contact customer support?</span><br />
                    Reach out through our support channels for any queries.
                </p>

            </div>

            {/* BOTTOM */}
            <div className="text-center text-xs text-gray-500 mt-16">
                © 2026 Whiff. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
