import React from 'react'
import { FaWhatsapp } from "react-icons/fa"
const Whatsapp = () => {
    return (
        <div className="fixed bottom-6 left-6 z-50 group">
            <div
                className="absolute left-16 bottom-1/2 translate-y-1/2
                   opacity-0 group-hover:opacity-100
                   scale-95 group-hover:scale-100
                   transition-all duration-300
                   bg-black text-white text-xs
                   px-3 py-2 rounded
                   whitespace-nowrap"
            >
                Chat on WhatsApp
            </div>

            {/* Button */}
            <a
                href="https://wa.me/+917980715632?text=Hi%2C%20I%20am%20interested%20in%20your%20perfumes."
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full
                   bg-green-600 text-white
                   flex items-center justify-center
                   shadow-lg hover:bg-green-700 transition"
            >
                <FaWhatsapp className="text-2xl" />
            </a>

        </div>
    )
}

export default Whatsapp
