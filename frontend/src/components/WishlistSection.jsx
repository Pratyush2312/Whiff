import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
const URL=import.meta.env.VITE_BACKEND_URL
const WishlistSection = () => {
    const [wishList, setwishList] = useState([])
    const navigate = useNavigate()
    const handleClick = (slug) => {
        navigate(`/perfume/${encodeURIComponent(slug)}`)
    }
    const fetchWishlist = async () => {
        const res = await fetch(`${URL}/wishlist`, {
            credentials: "include"
        });
        const data = await res.json();

        if (data.status === "success") {
            // const ids = data.wishlist.map(item => String(item.perfume._id));
            setwishList(data.wishlist);
        }
    }
    const removefromWishlist = async (id) => {
        try {
            const res = await fetch(`${URL}/wishlist/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            const data = await res.json()
            if (data.status == 'success') {
                setwishList(prev => prev.filter(itemId => itemId !== id))
                toast.success(data.message)
                fetchWishlist()
                return
            }
            if (data.status == 'notfound') {
                toast.error(data.message)
                return
            }
        } catch (err) {
            console.log(err)
            toast.error("Error connecting to the server")
        }
    }
    useEffect(() => {
        fetchWishlist()
    }, [])
    if (wishList.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <span className="text-6xl mb-4">💔</span>
                <p className="text-lg">Your wishlist is empty</p>
                <p className="text-sm">Save perfumes you love ❤️</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                    Wishlist
                </h2>
                <span className="text-gray-500">
                    {wishList.length} items
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {wishList.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                        {/* Image */}
                        <div className="h-60 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                            <img className="w-full h-full object-cover"
                                src={item.perfume.image} alt={item.perfume.name} />
                        </div>

                        {/* Info */}
                        <h3 className="font-medium text-gray-800">
                            {item.perfume.name}
                        </h3>

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-4">
                            <button className="text-sm text-red-500 hover:underline" onClick={()=>{removefromWishlist(item.perfume._id)}}>
                                Remove
                            </button>

                            <button className="text-sm bg-black text-white px-3 py-1 rounded-md" onClick={() => { handleClick(item.perfume.slug) }}>
                                View
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default WishlistSection
