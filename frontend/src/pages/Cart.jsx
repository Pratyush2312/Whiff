import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);

  const navigate = useNavigate();

  /* ---------------- PRICE LOGIC ---------------- */

  const getFinalPrice = (cartItem) => {
    const basePrice = cartItem.price;

    return hasDiscount
      ? Math.round(basePrice * 0.9)
      : basePrice;
  };

  /* ---------------- FETCH CART ---------------- */

  const fetchCart = async () => {
    try {
      const res = await fetch(`${URL}/cart`, {
        credentials: "include",
      });

      if (res.status === 401) {
        toast.error("Please login");
        return;
      }

      const data = await res.json();
      setCart(data.cart || []);
    } catch {
      toast.error("Error loading cart");
    }
  };

  /* ---------------- FETCH PROFILE (DISCOUNT) ---------------- */

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${URL}/account/profile`, {
        credentials: "include",
      });
      const user = await res.json();
      setHasDiscount(user.isFirstLogin === true);
    } catch {
      console.log("Profile fetch error");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchCart();
  }, []);

  /* ---------------- REMOVE ITEM ---------------- */

  const removeFromCart = async (cartId) => {
    try {
      const res = await fetch(
        `${URL}/cart/remove/${cartId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        toast.success("Removed from cart");
        fetchCart();
      }
    } catch {
      toast.error("Error removing item");
    }
  };

  const handleClick = (item, slug) => {
    navigate(`/${item}/${encodeURIComponent(slug)}`);
  };

  /* ---------------- WHATSAPP ---------------- */

  const buildWhatsappMessage = () => {
    let message = `Hi Whiff\n\nI want to order:\n\n`;

    cart.forEach((item, index) => {
      const price = getFinalPrice(item);

      message += `${index + 1}. ${item.item?.name}\n`;
      message += `   Volume: ${item.volume}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${price}\n\n`;
    });

    message += `Please confirm availability.\n\nThank you`;

    return encodeURIComponent(message);
  };

  const handleWhatsappCheckout = () => {
    const phoneNumber = "917980715632";
    const message = buildWhatsappMessage();
    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
  };

  /* ---------------- EMPTY CART ---------------- */

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p className="text-lg">Your cart is empty</p>
        <p className="text-sm mt-2">
          Start adding perfumes you love ❤️
        </p>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen bg-[#f6f5f3] px-4 sm:px-6 lg:px-12 py-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold italic">
          Your Cart
        </h1>
        <p className="text-gray-600 mt-2">
          Review your selections before checkout ✨
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CART ITEMS */}
        <section className="lg:col-span-2 grid gap-8 grid-cols-1 sm:grid-cols-2">
          {cart?.map((item) => {
            const finalPrice = getFinalPrice(item);

            return (
              <div
                key={item._id}
                className="bg-white rounded-3xl p-5 shadow hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="w-full h-[220px] flex items-center justify-center bg-[#fafafa] rounded-xl mb-4">
                  {item.combo && (
                    <img
                      src={item.combo.image}
                      alt={item.combo.name}
                      className="max-w-[75%] max-h-[75%] object-contain"
                    />
                  )}

                  {item.item && (
                    <img
                      src={item.item.image}
                      alt={item.item.name}
                      className="max-w-[75%] max-h-[75%] object-contain cursor-pointer"
                      onClick={() =>
                        handleClick(item.itemType.toLowerCase(), item.item.slug)
                      }
                    />
                  )}
                </div>

                {/* DETAILS */}
                {item.combo ? (
                  <>
                    <h2 className="text-lg font-semibold">
                      {item.combo.name}
                    </h2>

                    <ul className="text-sm text-gray-600 mt-2">
                      {item.combo.perfume?.map((p, i) => (
                        <li key={i}>
                          • {p.perfume.name} ({p.volume})
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold">
                      {item.item.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Volume: {item.volume}
                    </p>
                  </>
                )}

                {/* PRICE (DISCOUNTED) */}
                <p className="mt-3 font-semibold text-lg">
                  ₹{finalPrice}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-4 w-full rounded-full border border-red-500
                  text-red-500 py-2 text-sm hover:bg-red-500 hover:text-white transition"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </section>

        {/* SUMMARY */}
        <aside className="bg-white rounded-3xl p-6 shadow h-fit sticky top-24">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="h-px bg-gray-200 my-4" />

          <button
            onClick={handleWhatsappCheckout}
            className="w-full bg-green-500 hover:bg-green-600
            text-white font-semibold py-3 rounded-full transition"
          >
            Inquire on WhatsApp
          </button>
          {/* <button onClick={() => {
            console.log(cart._id)
            navigate('/checkout', {
              state: { cartId: cart[0]._id }
            })
          }}>Checkout</button> */}

          <p className="text-xs text-gray-500 text-center mt-3">
            You’ll be redirected to WhatsApp
          </p>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
