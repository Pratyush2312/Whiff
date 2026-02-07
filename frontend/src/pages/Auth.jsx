import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import toast from "react-hot-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from "lucide-react";
const URL = import.meta.env.VITE_BACKEND_URL
const Auth = () => {
    const [hasDiscount, setHasDiscount] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (!firstname || !lastname || !email || !password || !phone || !address) {
                toast.error('Please enter all the fields')
                return
            }
            const payload = {
                firstname,
                lastname,
                email,
                password,
                phone,
                address
            }
            console.log("Function ke andar")
            const data = await fetch(`${URL}/account/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            const res = await data.json()
            if (res.status === 'success') {
                toast.success(res.message)
                setIsLogin(true);

                return
            }
            if (res.status === 'duplicate') {
                toast.error(res.message)
                return
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error("Fill all the credentials")
            return
        }
        try {
            const payload = {
                email,
                password
            }
            const data = await fetch(`${URL}/account/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            const res = await data.json()
            if (res.status == 'success') {
                toast.success(res.message)
                setHasDiscount(res.firstLoginDiscount)
                navigate('/')
                return;
            }
            if (res.status == 'new') {
                toast.error(res.message)
                return;
            }
            if (res.status == 'invalid') {
                toast.error(res.message)
                return;
            }
        } catch (err) {
            toast.error("Error connecting to the server")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000);

    },)


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f6f5f3] px-4 relative">

            {loading ? (
                /* LOADER */
                <div className="w-full flex justify-center items-center py-20">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-500">Loading...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    {/* CARD */}
                    <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">

                        {/* LEFT PANEL (Desktop only) */}
                        <motion.div
                            layout
                            className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center p-10"
                        >
                            <motion.h1
                                key={isLogin}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="text-3xl font-bold mb-4"
                            >
                                {isLogin ? "Welcome Back!" : "Hello There!"}
                            </motion.h1>

                            <p className="text-sm mb-6 text-center opacity-80">
                                {isLogin
                                    ? "Login to continue exploring perfumes"
                                    : "Sign up and start your fragrance journey"}
                            </p>

                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
                            >
                                {isLogin ? "Sign Up" : "Login"}
                            </button>
                        </motion.div>

                        {/* RIGHT PANEL */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 relative">

                            {/* Mobile heading */}
                            <h2 className="md:hidden text-2xl font-semibold mb-6 text-center">
                                {isLogin ? "Login" : "Sign Up"}
                            </h2>

                            <AnimatePresence mode="wait">
                                {isLogin ? (
                                    <motion.div
                                        key="login"
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -80 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <h2 className="hidden md:block text-2xl font-semibold mb-6">
                                            Login
                                        </h2>

                                        <form className="space-y-4" onSubmit={handleLogin}>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full border px-4 py-3 rounded"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="w-full border px-4 py-3 rounded"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                            <button
                                                type="submit"
                                                className="w-full bg-black text-white py-3 rounded"
                                            >
                                                Login
                                            </button>
                                        </form>

                                        {/* Mobile Toggle */}
                                        <p className="mt-4 text-center text-sm md:hidden">
                                            Don’t have an account?{" "}
                                            <button
                                                type="button"
                                                onClick={() => setIsLogin(false)}
                                                className="font-medium underline"
                                            >
                                                Sign Up
                                            </button>
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="signup"
                                        initial={{ opacity: 0, x: -80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 80 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <h2 className="hidden md:block text-2xl font-semibold mb-6">
                                            Sign Up
                                        </h2>

                                        <form className="space-y-4" onSubmit={handleSignUp}>
                                            <div className="flex flex-col md:flex-row gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="First Name"
                                                    className="w-full md:w-1/2 border px-4 py-3 rounded"
                                                    value={firstname}
                                                    onChange={(e) => setFirstname(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    className="w-full md:w-1/2 border px-4 py-3 rounded"
                                                    value={lastname}
                                                    onChange={(e) => setLastname(e.target.value)}
                                                />
                                            </div>

                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full border px-4 py-3 rounded"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                className="w-full border px-4 py-3 rounded"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Address"
                                                className="w-full border px-4 py-3 rounded"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />

                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="w-full border px-4 py-3 rounded"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                            <button
                                                type="submit"
                                                className="w-full bg-black text-white py-3 rounded"
                                            >
                                                Sign Up
                                            </button>
                                        </form>

                                        {/* Mobile Toggle */}
                                        <p className="mt-4 text-center text-sm md:hidden">
                                            Already have an account?{" "}
                                            <button
                                                type="button"
                                                onClick={() => setIsLogin(true)}
                                                className="font-medium underline"
                                            >
                                                Login
                                            </button>
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Auth
