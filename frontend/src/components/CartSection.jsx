import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
const URL=import.meta.env.VITE_BACKEND_URL
const CartSection = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  /* ---------------- FETCH CART ---------------- */

  const fetchCart = async () => {
    try {
      const res = await fetch(`${URL}/cart`, {
        credentials: "include",
      });

      if (res.status === 401) {
        toast.error("Please login again");
        return;
      }

      const data = await res.json();
      setCart(data.cart || []);
    } catch {
      toast.error("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ---------------- NAVIGATE ---------------- */

  const handleClick = (slug) => {
    navigate(`/perfume/${encodeURIComponent(slug)}`);
  };

  /* ---------------- REMOVE ITEM ---------------- */

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(
        `${URL}/cart/remove/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        toast.success(data.message);
        fetchCart();
      }
    } catch {
      toast.error("Error removing item");
    }
  };

  /* ---------------- WHATSAPP ---------------- */

  const buildWhatsappMessage = () => {
    let message = `Hi Whiff\n\nI want to order:\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. `;

      if (item.combo) {
        message += `${item.combo.name}\n`;
        item.combo.perfumes.forEach((p) => {
          message += `• ${p.perfume.name} (${p.volume})\n`;
        });
      } else if (item.perfume) {
        message += `${item.perfume.name}\n`;
        message += `Volume: ${item.volume}\n`;
      }

      message += `Quantity: ${item.quantity}\n\n`;
    });

    message += `Please confirm availability.\nThank you`;
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

  /* ---------------- EMPTY STATE ---------------- */

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <span className="text-6xl mb-4">🛒</span>
        <p className="text-lg">Your cart is empty</p>
        <p className="text-sm">Add perfumes to proceed</p>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <span className="text-gray-500">
          {cart.length} items
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cart.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <div className="h-60 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {/* COMBO IMAGE */}
                {item.combo && item.combo.image && (
                  <img
                    className="w-full h-full object-cover"
                    src={`${URL}/${item.combo.image}`}
                    alt={item.combo.name}
                  />
                )}

                {/* PERFUME IMAGE */}
                {item.perfume && item.perfume.image && (
                  <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={`${URL}/${item.perfume.image}`}
                    alt={item.perfume.name}
                    onClick={() => handleClick(item.perfume.slug)}
                  />
                )}
              </div>

              {/* INFO */}
              {item.combo ? (
                <>
                  <h3 className="font-medium text-gray-800">
                    {item.combo.name}
                  </h3>

                  <ul className="text-sm text-gray-500 mt-1">
                    {item.combo.perfumes.map((p, i) => (
                      <li key={i}>
                        • {p.perfume.name} ({p.volume})
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h3 className="font-medium text-gray-800">
                    {item.perfume.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Volume: {item.volume}
                  </p>
                </>
              )}

              {/* <p className="text-sm text-gray-500 mt-1">
                Quantity: {item.quantity}
              </p> */}

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>

                {item.perfume && (
                  <button
                    className="text-sm bg-black text-white px-3 py-1 rounded-md"
                    onClick={() => handleClick(item.perfume.slug)}
                  >
                    View
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-gray-50 rounded-xl p-6 h-fit sticky top-20">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="h-px bg-gray-300 my-4" />

          <button
            onClick={handleWhatsappCheckout}
            className="w-full bg-green-500 hover:bg-green-600
                       text-white font-semibold py-3 rounded-full transition"
          >
            Inquire on WhatsApp
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            You’ll be redirected to WhatsApp
          </p>
        </div>

      </div>
    </div>
  );
};

export default CartSection;
