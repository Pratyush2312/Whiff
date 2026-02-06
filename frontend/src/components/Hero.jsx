import React from 'react'
import { useNavigate } from 'react-router'
import banner1 from '../assets/banner1.jpg'

const Hero = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/shop ")
    }
    return (
        <section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <img
                src={banner1}
                alt="Hero Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />

           

            {/* CONTENT */}
            <div className="relative z-10 h-full flex items-center">
                <div
                    className="px-6 sm:px-10 md:px-24 max-w-xl text-left"
                >

                    <p className="text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 text-white">
                        Find your signature scent
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-5 sm:mb-6 text-white">
                        Luxury <br className="hidden sm:block" /> Perfumes
                    </h1>

                    <button
                        onClick={handleClick}
                        className="
          px-6 sm:px-8
          py-3
          bg-black
          text-white
          text-xs sm:text-sm
          tracking-widest
          hover:bg-black/80
          transition
        "
                    >
                        SHOP NOW
                    </button>

                </div>
            </div>
        </section>

    )
}

export default Hero
