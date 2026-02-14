import { useState, useEffect } from "react"
import { useParams } from "react-router"
import WhyChooseWhiff from "./WhyChooseWhiff";
import ComboGallery from "./ComboGallery";
import Footer from "./Footer";
import toast from "react-hot-toast";
const URL = import.meta.env.VITE_BACKEND_URL
const ComboCard = () => {
    const { slug } = useParams()
    const [combo, setCombo] = useState(null);
    // const [volume, setVolume] = useState("10 ML");
    const [cart, setCart] = useState([]);
    const [hasDiscount, setHasDiscount] = useState(false);

    const basePrice = combo?.price || 0;

    const finalPrice = hasDiscount
        ? Math.round(basePrice * 0.9)
        : basePrice;

    const fetchProfile = async () => {
        try {
            const res = await fetch(
                `${URL}/account/profile`,
                { credentials: "include" }
            );
            const user = await res.json();
            setHasDiscount(user.isFirstLogin === true);
        } catch (err) {
            console.log("Profile fetch error");
        }
    }

    const fetchCombo = async () => {
        try {
            const res = await fetch(
                `${URL}/combos/${slug}`
            )
            const data = await res.json();
            setCombo(data);
        } catch (err) {
            console.error(err)
            toast.error("Error loading combo");
        }
    }

    const fetchCart = async () => {
        try {
            const res = await fetch(`${URL}/cart`, {
                credentials: "include",
            });
            const data = await res.json();
            setCart(data.cart);
        } catch (err) {
            console.log("Cart fetch error");
        }
    };

    const addToCart = async (id) => {
        try {
            const res = await fetch(`${URL}/cart/add`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    itemId: id,
                    itemType: "Combo"
                }),
            });

            const data = await res.json();
            if (data.status === "added") {
                toast.success("Added to cart")
                fetchCart()
            }
            if (!res.ok) {
                toast.error('Not authenticated')
                return
            }
        } catch (err) {
            toast.error("Error adding to cart");
        }
    }

    const removeFromCart = async (cartId) => {
        try {
            await fetch(
                `${URL}/cart/remove/${cartId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            toast.success("Removed from cart");
            fetchCart();
        } catch (err) {
            toast.error("Error removing item");
        }
    }

    // if (!combo) return <p>Loading...</p>

    const images = [
        combo?.image,
        // combo.front,
        // combo.back,
    ]

    const cartItem = cart?.find(
        (item) =>
            String(item.item._id) === String(combo._id)
    )


    useEffect(() => {
        fetchProfile()
        fetchCombo()
        fetchCart()
    }, [slug])
    return (
        <div className="min-h-screen flex flex-col">

            <div className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-20">

                {/* LEFT */}
                <ComboGallery images={images} />

                {/* RIGHT */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">{combo?.name}</h1>

                    {/* PRICE */}
                    <div className="mt-2">
                        {hasDiscount ? (
                            <>
                                <p className="text-sm text-gray-400 line-through">
                                    ₹{basePrice}
                                </p>
                                <p className="text-2xl font-semibold text-black">
                                    ₹{finalPrice}
                                    <span className="text-green-600 text-sm ml-2">
                                        (10% OFF)
                                    </span>
                                </p>
                            </>
                        ) : (
                            <p className="text-2xl font-semibold">
                                ₹{basePrice}
                            </p>
                        )}
                    </div>

                    <span className="w-[30vw] bg-gray-200 h-1"></span>

                    <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-xl">
                        {combo?.desc}
                    </p>
                    <div className="mt-6">
                        <span className="text-sm uppercase tracking-widest text-gray-500">
                            Volume:
                        </span>

                        <div className="mt-2 inline-block px-4 py-1 text-sm font-medium">
                            {combo?.volume}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <button
                        className="rounded border p-3 bg-black text-white"
                        onClick={() =>
                            cartItem
                                ? removeFromCart(cartItem._id)
                                : addToCart(combo?._id)
                        }
                    >
                        {cartItem
                            ? "Remove from Cart"
                            : "Add to Cart"}
                    </button>
                </div>
            </div>

            <WhyChooseWhiff />
            <Footer />
        </div>
    )
}

export default ComboCard
