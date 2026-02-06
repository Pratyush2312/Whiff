import { useState } from "react";

const ProductGallery = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleNext = () => {
        setActiveIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handlePrev = () => {
        setActiveIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };
    return (
        <div className="relative w-full">

            {/* MAIN IMAGE */}
            <div className="w-full flex justify-center mb-6">
                <img
                    src={images[activeIndex]}
                    alt="Selected"
                    className="max-h-[500px] object-contain transition-all duration-300"
                />
            </div>
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 
                   bg-black/70 text-white px-3 py-2 rounded-full"
            >
                ❮
            </button>

            {/* Next Button */}
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 
                   bg-black/70 text-white px-3 py-2 rounded-full"
            >
                ❯
            </button>

            {/* THUMBNAIL CAROUSEL */}
            <div className="flex gap-4 overflow-x-auto justify-center">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt="Thumbnail"
                        onClick={() => setActiveIndex(index)}
                        className={`h-20 w-20 object-contain cursor-pointer border rounded
              ${activeIndex === index
                                ? "border-black"
                                : "border-gray-300"
                            }`}
                    />
                ))}
            </div>

        </div>
    );
};

export default ProductGallery;
