import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const WhyChooseWhiff = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">

      {/* WHY CHOOSE */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          ✨ Why Choose Whiff?
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Whiff is crafted for fragrance lovers who want a premium, long-lasting
          scent without paying luxury-brand prices. Each perfume is formulated
          using high-quality oils and balanced notes for Indian weather.
        </p>
      </div>

      {/* ACCORDION */}
      <div className="bg-white border rounded-2xl p-6">

        {/* HEADER */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center text-lg font-medium"
        >
          Delivery & Returns
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <FaMinus /> : <FaPlus />}
          </motion.span>
        </button>

        {/* CONTENT */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">

                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Delivery Details
                  </h4>
                  <p>
                    Orders are processed within <strong>1–3 business days</strong>.
                    Delivery usually takes <strong>3–7 business days</strong>
                    across India.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Returns & Exchanges
                  </h4>

                  <ul className="list-disc pl-5 space-y-2">
                    <li>Damaged products during transit</li>
                    <li>Incorrect items received</li>
                  </ul>

                  <p className="mt-3 text-sm text-gray-600">
                    Contact us within <strong>24 hours</strong> with photos/videos.
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default WhyChooseWhiff;
