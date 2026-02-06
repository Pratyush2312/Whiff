import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
const URL = import.meta.env.VITE_BACKEND_URL
const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])
    const navigate = useNavigate()
    const showWishlist = async () => {
        try {
            const res = await fetch(`${URL}/wishlist`, {
                credentials: 'include'
            }
            )
            const data = await res.json()
            if (data.status == 'empty') {
                setWishlist([])
                toast.error(data.message)
                return
            }
            if (res.status === 401) {
                toast.error("Please login")
                return
            }
            if (data.status == 'success') {
                setWishlist(data.wishlist)
                return
            }
        } catch (err) {
            console.error(err)
            toast.error("Error connecting to the server")
        }
    }

    const handleClick = (slug) => {
        navigate(`/perfume/${encodeURIComponent(slug)}`)
    }

    useEffect(() => {
        showWishlist()
    }, [])

    return (
        <div>
            <main className="flex-1 min-h-screen bg-[#f6f5f3] px-4 sm:px-6 lg:px-12 py-10">

                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold italic">
                        Your Wishlist
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Fragrances you’ve saved to come back to ✨
                    </p>
                </div>

                {wishlist.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <p className="text-lg">Your wishlist is empty</p>
                        <p className="text-sm mt-2">
                            Start adding perfumes you love ❤️
                        </p>
                    </div>
                )}

                <section
                    className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center"
                >
                    {wishlist.map(item => (
                        <div
                            key={item._id}
                            className="w-full max-w-[260px] bg-white rounded-3xl p-5 text-center shadow-sm hover:shadow-xl transition-all duration-300"
                        >

                            <div
                                className="w-full h-[240px] flex items-center justify-center overflow-hidden rounded-xl bg-[#fafafa] cursor-pointer"
                            >
                                <img
                                    src={`${URL}/${item.perfume.image}`}
                                    alt={item.perfume.name}
                                    className="max-w-[75%] max-h-[75%] object-contain transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            <h2 className="mt-5 text-base font-semibold">
                                {item.perfume.name}
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                by Whiff
                            </p>

                            <p className="font-medium text-lg mt-2">
                                ₹{item.perfume.price}
                            </p>

                            <button
                                className="mt-5 w-full rounded-full border border-black py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200"
                                onClick={() => handleClick(item.perfume.slug)}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </section>
            </main>
        </div>

    )
}

export default Wishlist
