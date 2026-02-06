import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
const URL=import.meta.env.VITE_BACKEND_URL
const Settings = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/account/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="flex-1 p-8 bg-white">

      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      {/* SETTINGS CARD */}
      <div className="max-w-md bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-medium mb-2">Account</h3>
        <p className="text-sm text-gray-500 mb-6">
          Manage your account preferences
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="w-full rounded-full bg-red-500
                     text-white py-3 font-medium
                     hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* LOGOUT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
                        bg-black/40">

          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold mb-2">
              Confirm Logout
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout from your account?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-full border
                           hover:bg-gray-100 transition"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 py-2 rounded-full bg-red-500
                           text-white hover:bg-red-600 transition
                           disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
