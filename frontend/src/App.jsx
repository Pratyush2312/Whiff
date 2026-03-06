import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import PerfumeCard from "./components/PerfumeCard";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Combo from "./pages/Combo";
import ComboCard from "./components/ComboCard";
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import RefundPolicy from "./pages/RefundPolicy"
import Contact from "./pages/Contact"
import Checkout from "./pages/Checkout";
import { Route, Routes, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/account" element={<PageWrapper><Account /></PageWrapper>} />
          <Route path="/account/auth" element={<PageWrapper><Auth /></PageWrapper>} />
          <Route path="/combos" element={<PageWrapper><Combo /></PageWrapper>} />
          <Route path="/combo/:slug" element={<PageWrapper><ComboCard /></PageWrapper>} />
          <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
          <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
          <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
          <Route path="/perfume/:slug" element={<PageWrapper><PerfumeCard /></PageWrapper>} />
          {/* <Route path="/checkout" element={<PageWrapper><Checkout/></PageWrapper>} /> */}
          <Route path="/privacy-policy" element={<Privacy />} />  
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};


export default App;
