import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
const URL = import.meta.env.VITE_BACKEND_URL;

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const cartId = location.state?.cartId
    console.log(location.state)
    console.log(cartId)
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            setLoading(true);

            // 1️⃣ Create Order (secure)
            const res = await fetch(`${URL}/create-order`, {
                method: "POST",
                credentials:"include",
                body: JSON.stringify({ cartId }),
            });

            const order = await res.json();

            if (!order.id) {
                toast.error("Order creation failed");
                setLoading(false);
                return;
            }

            // 2️⃣ Razorpay options
            const options = {
                key: "rzp_test_SLusQgLO3Ovu0C", // 🔥 replace with your test key
                amount: order.amount,
                currency: order.currency,
                name: "WHIFF",
                description: "Perfume Purchase",
                order_id: order.id,

                handler: async function (response) {
                    try {
                        // 3️⃣ Verify Payment
                        const verifyRes = await fetch(`${URL}/verify-payment`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const data = await verifyRes.json();

                        if (data.success) {
                            navigate(`/order-success/${data.orderId}`);
                        } else {
                            alert("Payment verification failed");
                        }
                    } catch (err) {
                        console.error(err);
                        toast.error("Verification error");
                    }
                },

                theme: {
                    color: "#000000",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            setLoading(false);

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f5f3] flex items-center justify-center px-6">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

                <h1 className="text-2xl font-semibold text-center mb-8">
                    Secure Checkout
                </h1>

                <div className="space-y-4 text-sm text-gray-600 mb-8">
                    <div className="flex justify-between">
                        <span>Order Amount</span>
                        <span className="font-medium text-black">
                            Amount calculated securely
                        </span>
                    </div>

                    <p className="text-xs text-gray-400">
                        Final amount will be calculated on the server including
                        applicable discounts.
                    </p>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition duration-200"
                >
                    {loading ? "Processing..." : "Pay Securely"}
                </button>

            </div>
        </div>
    );
};

export default Checkout;