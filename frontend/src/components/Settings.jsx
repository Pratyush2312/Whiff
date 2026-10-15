import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  Settings as SettingsIcon,
  UserRound,
  LogOut,
  ShieldCheck,
  ArrowUpRight,
  X,
  Sparkles,
  LoaderCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const Settings = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const cancelButtonRef = useRef(null);
  const modalRef = useRef(null);

  const closeModal = () => {
    if (!loading) setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) return;

    const previousActiveElement = document.activeElement;

    cancelButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        setShowModal(false);
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [showModal, loading]);

  const handleLogout = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch(`${URL}/account/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        toast.error(data.message || "Logout failed. Please try again.");
        return;
      }

      toast.success("Logged out successfully");
      setShowModal(false);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-w-0 flex-1 bg-background px-4 py-6 text-text-primary sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8 border-b border-border pb-6 sm:mb-10 sm:pb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand">
            <SettingsIcon size={15} strokeWidth={1.5} />
            <span>Your account</span>
          </div>

          <h1 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Settings<span className="text-brand">.</span>
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
            Manage your account and keep your Whiff experience just the way you
            like it.
          </p>
        </div>

        {/* Account settings */}
        <div className="max-w-2xl">
          <div className="mb-5">
            <h2 className="font-display text-2xl sm:text-3xl">
              Account preferences
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              Manage your current session and account access.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_30px_rgba(41,35,33,0.04)]">
            {/* Account overview */}
            <div className="flex items-start gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-rose text-brand">
                <UserRound size={21} strokeWidth={1.5} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-text-primary">
                  Account access
                </h3>

                <p className="mt-1 text-sm leading-6 text-text-secondary">
                  Your account session is managed securely through Whiff's
                  authentication system.
                </p>
              </div>

              <ShieldCheck
                size={19}
                className="mt-1 shrink-0 text-success"
                strokeWidth={1.6}
              />
            </div>

            <div className="border-t border-border" />

            {/* Logout row */}
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FAEEEE] text-[#A34444]">
                  <LogOut size={20} strokeWidth={1.6} />
                </div>

                <div>
                  <h3 className="font-medium text-text-primary">Sign out</h3>

                  <p className="mt-1 max-w-sm text-sm leading-6 text-text-secondary">
                    End your current session on this device. You can always sign
                    in again later.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#E9CDCD] px-5 py-3 text-sm font-medium text-[#A34444] transition duration-300 hover:border-[#A34444] hover:bg-[#FAEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A34444] focus-visible:ring-offset-2 sm:self-center">
                Log out
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>

          {/* Brand note */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-surface-secondary/60 p-4 sm:p-5">
            <Sparkles
              size={17}
              className="mt-0.5 shrink-0 text-accent"
              strokeWidth={1.5}
            />

            <p className="text-sm leading-6 text-text-secondary">
              Your fragrance journey will be right here when you return. Thanks
              for being part of Whiff.
            </p>
          </div>
        </div>
      </div>

      {/* Logout confirmation modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#211B1A]/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}>
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative my-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/60 bg-background shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
            {/* Modal top accent */}
            <div className="h-1.5 bg-gradient-to-r from-brand-muted via-brand to-accent" />

            <div className="p-6 sm:p-8">
              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                aria-label="Close dialog"
                className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition hover:bg-surface-rose hover:text-brand disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                <X size={18} />
              </button>

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAEEEE] text-[#A34444]">
                <LogOut size={24} strokeWidth={1.5} />
              </div>

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                Before you go
              </p>

              <h2
                id="logout-title"
                className="pr-8 font-display text-3xl sm:text-4xl">
                Leaving so soon?
              </h2>

              <p
                id="logout-description"
                className="mt-4 text-sm leading-7 text-text-secondary">
                Are you sure you want to log out of your Whiff account? You'll
                need to sign in again to access your account.
              </p>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-text-primary transition hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                  Stay signed in
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loading}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#A34444] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#873838] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A34444] focus-visible:ring-offset-2">
                  {loading ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Signing out…
                    </>
                  ) : (
                    <>
                      <LogOut size={16} />
                      Yes, log out
                    </>
                  )}
                </button>
              </div>

              <p className="mt-5 text-center text-xs text-text-muted">
                Thank you for being part of Whiff.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Settings;
