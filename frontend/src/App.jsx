import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import PerfumeCard from "./components/PerfumeCard"
import Wishlist from "./pages/Wishlist"
import Account from "./pages/Account"
import Cart from "./pages/Cart"
import Combos from "./pages/Combo"
import { Route, Routes } from "react-router"
import { Toaster } from "react-hot-toast"
function App() {

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account/>} />
        <Route path="/account/auth" element={<Auth />} />
        {/* <Route path="/accounts/login" element={<Login />} /> */}
        <Route path="/combos" element={<Combos />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path='/perfume/:slug' element={<PerfumeCard />} />

      </Routes>

    </>
  )
}

export default App
