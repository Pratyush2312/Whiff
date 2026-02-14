import React from 'react'
import { useNavigate } from 'react-router'
import banner1 from '../assets/banner1.jpg'

const Hero = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/shop ")
    }
    return (
        <section className="relative w-full h-[85vh] overflow-hidden">

            {/* Background Image */}
            <img
                src={banner1}
                alt="Hero Banner"
                className="absolute inset-0 w-full h-full object-cover object-right"
            />

            {/* Soft Overlay */}
            {/* <div className="absolute inset-0 bg-black/25"></div> */}

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-6xl mx-auto px-6 sm:px-12 w-full">

                    <div className="max-w-lg">

                        <p className="text-xs tracking-[0.3em] uppercase text-white/80 mb-4">
                            Find your signature scent
                        </p>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-white mb-6">
                            Luxury <br /> Perfumes
                        </h1>

                        <button
                            onClick={handleClick}
                            className="px-8 py-3 bg-black text-white rounded-md 
                     hover:bg-neutral-800 transition duration-300"
                        >
                            SHOP NOW
                        </button>

                    </div>

                </div>
            </div>

        </section>

    )
}

export default Hero
