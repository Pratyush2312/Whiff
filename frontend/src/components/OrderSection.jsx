import React, { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import toast from "react-hot-toast";
import { data } from "autoprefixer";
const URL = import.meta.env.VITE_BACKEND_URL
const OrderSection = () => {
    const [orders, setOrders] = useState([]);
    const [length, setLength] = useState();
    const handleCopy = (slug) => {
        navigator.clipboard.writeText(slug);
        toast.success("Order Id copied");
    }
    const fetchOrders = async () => {
        try {
            const res = await fetch(`${URL}/api/orders`, {
                credentials: "include",
            });

            const data = await res.json();
            console.log(data.length);
            setLength(data.length);
            setOrders(data.orders);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 relative">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                My Orders 📦
            </h1>

            <p className="absolute right-4 sm:right-11 top-12 sm:top-11 text-sm sm:text-base">
                <span className="font-semibold text-black">
                    {length} Orders
                </span>
            </p>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found</p>
            ) : (
                <div className="flex flex-col gap-4 sm:gap-5 max-w-3xl mx-auto">

                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white p-4 sm:p-5 rounded-xl shadow-md"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">

                                <p className="text-xs sm:text-sm text-gray-500 break-all">
                                    Order ID:{" "}
                                    <span className="font-semibold text-black">
                                        {order.orderId}
                                    </span>

                                    <button
                                        onClick={() => { handleCopy(order.orderId) }}
                                        className='ml-2 bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm hover:bg-gray-300'
                                    >
                                        <IoCopy />
                                    </button>
                                </p>

                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs w-fit">
                                    {order.status || "Placed"}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-2 mb-3">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between text-xs sm:text-sm"
                                    >
                                        <span className="break-words">
                                            {item.name} ({item.volume})
                                        </span>
                                        <span>₹{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between font-semibold border-t pt-2 text-sm sm:text-base">
                                <span>Total</span>
                                <span>₹{order.totalAmount}</span>
                            </div>

                            {/* Date */}
                            <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderSection;