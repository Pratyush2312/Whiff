import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductGallery from "./ProductGallery";
import WhyChooseWhiff from "./WhyChooseWhiff";
import Footer from "./Footer";
import toast from "react-hot-toast";
const URL=import.meta.env.VITE_BACKEND_URL
const PerfumeCard = () => {
    const { slug } = useParams();

    const [perfume, setPerfume] = useState(null);
    const [volume, setVolume] = useState("10 ML");
    const [cart, setCart] = useState([]);
    const [hasDiscount, setHasDiscount] = useState(false);

    /* ---------------- PRICE MAP ---------------- */

    const priceByVolume = {
        "10 ML": 199,
        "30 ML": 299,
    };

    const basePrice = priceByVolume[volume];
    const finalPrice = hasDiscount
        ? Math.round(basePrice * 0.9)
        : basePrice;

    /* ---------------- FETCH PROFILE (DISCOUNT FLAG) ---------------- */

    const fetchProfile = async () => {
        try {
            const res = await fetch(
                `${URL}/account/profile`,
                { credentials: "include" }
            );
            const user = await res.json();

            // 🔥 discount sirf first login pe
            setHasDiscount(user.isFirstLogin === true);
        } catch (err) {
            console.log("Profile fetch error");
        }
    };

    /* ---------------- FETCH PERFUME ---------------- */

    const fetchPerfume = async () => {
        try {
            const res = await fetch(
                `${URL}/perfumes/${slug}`
            );
            const data = await res.json();
            setPerfume(data);
        } catch (err) {
            toast.error("Error loading perfume");
        }
    };

    /* ---------------- FETCH CART ---------------- */

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

    /* ---------------- ADD / REMOVE CART ---------------- */

    const addToCart = async (id) => {
        try {
            const res = await fetch(`${URL}/cart/add`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    perfumeId: id,
                    volume,
                }),
            });

            const data = await res.json();
            if (data.status === "added") {
                toast.success("Added to cart");
                fetchCart();
            }
        } catch (err) {
            toast.error("Error adding to cart");
        }
    };

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
    };

    /* ---------------- EFFECTS ---------------- */

    useEffect(() => {
        fetchProfile();
        fetchPerfume();
        fetchCart();
    }, [slug]);

    if (!perfume) return <p>Loading...</p>;

    const images = [
        perfume.image,
        perfume.front,
        perfume.back,
    ]
        .filter(Boolean)
        .map((img) => `${URL}/${img}`);

    const cartItem = cart.find(
        (item) =>
            String(item.perfume._id) === String(perfume._id) &&
            item.volume === volume
    );

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen flex flex-col">

            <div className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-20">

                {/* LEFT */}
                <ProductGallery images={images} />

                {/* RIGHT */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">{perfume.name}</h1>

                    {/* PRICE */}
                    {hasDiscount ? (
                        <>
                            <p className="text-sm line-through text-gray-400">
                                ₹{basePrice}
                            </p>
                            <p className="text-xl font-semibold text-green-600">
                                ₹{finalPrice} (10% OFF)
                            </p>
                        </>
                    ) : (
                        <p className="text-xl font-semibold">
                            ₹{basePrice}
                        </p>
                    )}

                    <span className="w-[30vw] bg-gray-200 h-1"></span>

                    <p>{perfume.description}</p>

                    {/* VOLUME */}
                    <div>
                        <p className="mb-2 font-medium">
                            Volume: {volume}
                        </p>
                        <div className="flex gap-4">
                            {["10 ML", "30 ML"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setVolume(size)}
                                    className={`px-4 py-2 border rounded ${volume === size
                                        ? "border-black"
                                        : "border-gray-300"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <button
                        className="rounded border p-3 bg-black text-white"
                        onClick={() =>
                            cartItem
                                ? removeFromCart(cartItem._id)
                                : addToCart(perfume._id)
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
    );
};

export default PerfumeCard;
