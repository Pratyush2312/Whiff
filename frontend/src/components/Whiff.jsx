import React from 'react'
const Whiff = () => {
    return (
            <section className="py-24 bg-white text-center">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl tracking-widest uppercase mb-6">
                    Why Whiff
                </h2>

                {/* Sub text */}
                <p className="max-w-md mx-auto text-sm text-black/70 mb-16 md:max-w-xl">
                    Thoughtfully crafted fragrances for everyday luxury.
                </p>

                {/* Points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">

                    <div>
                        <h3 className="uppercase tracking-widest text-sm mb-3">
                            Crafted with care
                        </h3>
                        <p className="text-sm text-black/60">
                            Every fragrance is carefully developed with attention to detail.
                        </p>
                    </div>

                    <div>
                        <h3 className="uppercase tracking-widest text-sm mb-3">
                            Inspired by nature
                        </h3>
                        <p className="text-sm text-black/60">
                            Notes drawn from natural elements and timeless inspirations.
                        </p>
                    </div>

                    <div>
                        <h3 className="uppercase tracking-widest text-sm mb-3">
                            Designed to last
                        </h3>
                        <p className="text-sm text-black/60">
                            Long-lasting scents made for everyday wear.
                        </p>
                    </div>

                </div>

            </section>
    )
}

export default Whiff
