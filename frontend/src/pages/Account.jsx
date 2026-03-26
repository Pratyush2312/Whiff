import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from "framer-motion";
import SidebarItem from '../components/SidebarItem'
import Profile from '../components/Profile'
import Settings from '../components/Settings'
import WishlistSection from '../components/WishlistSection'
import CartSection from '../components/CartSection'
import OrderSection from '../components/OrderSection'


const tabs = [
    { id: "profile", label: "Profile" },
    { id: "wishlist", label: "Wishlist" },
    { id: "cart", label: "Cart" },
    { id: "order", label: "Order" },
    { id: "settings", label: "Settings" }
]
const URL = import.meta.env.VITE_BACKEND_URL
const Account = () => {
    const [user, setUser] = useState(null)
    const [activeTab, setActiveTab] = useState('profile')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const checkAuth = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${URL}/account/profile`, {
                credentials: 'include'
            })
            if (res.status === 401) {
                navigate('/account/auth')
                return
            }
            const data = await res.json()
            setUser(data)

        } catch (err) {
            navigate('/account/auth')
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        checkAuth()
    }, [])



    return (
        <div className="min-h-screen bg-[#f6f5f3] flex justify-center px-4 py-6">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                {/* ================= MOBILE TABS ================= */}
                <div className="md:hidden w-full bg-white px-4 py-3 border-b">
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition
              ${activeTab === tab.id
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ================= SIDEBAR (DESKTOP) ================= */}
                <div className="w-64 bg-gray-100 p-4 hidden md:block">
                    <h2 className="text-xl font-semibold mb-6">My Account</h2>

                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative w-full text-left px-4 py-2 rounded-lg mb-2"
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-black rounded-lg"
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}

                            <span
                                className={`relative z-10 transition-colors ${activeTab === tab.id
                                    ? "text-white"
                                    : "text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ================= CONTENT ================= */}
                <div className="flex-1 p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === "profile" && <Profile user={user} />}
                            {activeTab === "wishlist" && <WishlistSection />}
                            {activeTab === "cart" && <CartSection />}
                            {activeTab === "order" && <OrderSection />}
                            {activeTab === "settings" && <Settings />}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>

    )
}

export default Account
