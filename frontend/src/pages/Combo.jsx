import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Combos = () => {
  const [combos, setCombos] = useState([]);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  // 🔹 fetch user profile (for discount flag)
  useEffect(() => {
    fetch("http://localhost:3000/account/profile", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(user => {
        if (user?.isFirstLogin) setIsFirstLogin(true);
      })
      .catch(() => {});
  }, []);

  // 🔹 fetch combos
  useEffect(() => {
    fetch("http://localhost:3000/combos")
      .then(res => res.json())
      .then(setCombos)
      .catch(() => toast.error("Failed to load combos"));
  }, []);

  // 🔹 add combo to cart
  const addComboToCart = async (comboId) => {
    try {
      const res = await fetch("http://localhost:3000/cart/add-combo", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comboId }),
      });

      const data = await res.json();
      if (data.status === "added" || data.status === "updated") {
        toast.success("Combo added to cart");
      } else {
        toast.error(data.message || "Error");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f3] px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Perfume Combos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {combos.map((combo) => {
          const discountedPrice = isFirstLogin
            ? Math.round(combo.price * 0.9)
            : combo.price;

          return (
            <div
              key={combo._id}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:3000/${combo.image}`}
                alt={combo.name}
                className="h-44 mx-auto mb-4 object-contain"
              />

              <h2 className="text-xl font-semibold mb-2">{combo.name}</h2>

              <ul className="text-sm text-gray-600 mb-4">
                {combo.perfumes.map((p, i) => (
                  <li key={i}>
                    • {p.perfume.name} ({p.volume})
                  </li>
                ))}
              </ul>

              {isFirstLogin && (
                <p className="text-sm text-gray-400 line-through">
                  ₹{combo.price}
                </p>
              )}

              <p className="text-lg font-semibold text-green-600">
                ₹{discountedPrice}
                {isFirstLogin && " (10% OFF)"}
              </p>

              <button
                onClick={() => addComboToCart(combo._id)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
              >
                Add Combo to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Combos;
