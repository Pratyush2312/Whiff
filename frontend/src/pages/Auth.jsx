import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const Auth = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [hasDiscount, setHasDiscount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    setPassword("");
    setShowPassword(false);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !password ||
      !phone.trim() ||
      !address.trim()
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${URL}/account/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          email: email.trim(),
          password,
          phone: phone.trim(),
          address: address.trim(),
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success(data.message || "Account created successfully.");
        switchMode(true);
        return;
      }

      if (data.status === "duplicate") {
        toast.error(
          data.message || "An account with this email already exists.",
        );
        return;
      }

      toast.error(data.message || "Unable to create your account.");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Couldn't connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${URL}/account/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setHasDiscount(data.firstLoginDiscount === true);

        toast.success(data.message || "Welcome back to Whiff!");

        // Keep the existing post-login destination.
        navigate("/");
        return;
      }

      if (data.status === "new") {
        toast.error(data.message || "Please create an account first.");
        return;
      }

      if (data.status === "invalid") {
        toast.error(data.message || "Invalid email or password.");
        return;
      }

      toast.error(data.message || "Unable to log in. Please try again.");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Couldn't connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-text-primary outline-none transition placeholder:text-text-muted hover:border-border-strong focus:border-brand focus:ring-2 focus:ring-brand/10";

  const labelClass =
    "mb-2 block text-xs font-medium tracking-wide text-text-secondary";

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-text-primary">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-soft/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      {/* Back navigation */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2.5 text-sm text-text-secondary backdrop-blur-sm transition hover:border-brand hover:text-brand sm:left-8 sm:top-8">
        <ArrowLeft size={16} />
        Back to Whiff
      </button>

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-center justify-center px-4 py-24 sm:px-8 sm:py-28 lg:px-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_80px_rgba(41,35,33,0.08)] md:grid-cols-2">
          {/* Editorial panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-surface-dark p-10 text-text-inverse md:flex lg:p-12">
            <div className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-16 top-32 h-56 w-56 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />

            <div className="relative">
              <div className="mb-10 flex items-center gap-3">
                <Sparkles size={20} className="text-accent" />
                <span className="text-sm font-semibold tracking-[0.25em]">
                  WHIFF
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login-intro" : "signup-intro"}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate="visible"
                  exit="exit"
                  variants={reveal}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}>
                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-brand-muted">
                    {isLogin ? "Your fragrance story" : "A new beginning"}
                  </p>

                  <h1 className="font-display text-4xl leading-tight lg:text-5xl">
                    {isLogin ? (
                      <>
                        Good to have
                        <span className="mt-1 block italic text-brand-muted">
                          you back.
                        </span>
                      </>
                    ) : (
                      <>
                        Every great
                        <span className="mt-1 block italic text-brand-muted">
                          story begins.
                        </span>
                      </>
                    )}
                  </h1>

                  <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
                    {isLogin
                      ? "Step back into a world of thoughtful fragrances, little luxuries, and scents that feel like you."
                      : "Create your Whiff account and begin discovering fragrances that make every moment a little more memorable."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-12 border-t border-white/15 pt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Sparkles size={16} className="text-brand-muted" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Fragrance, made personal.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/50">
                    Find the scents that feel unmistakably yours.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => switchMode(!isLogin)}
                className="mt-7 inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white">
                {isLogin
                  ? "New to Whiff? Create an account"
                  : "Already with us? Log in"}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Form panel */}
          <div className="min-w-0 px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="mb-8 md:mb-10">
              <div className="mb-5 flex items-center gap-2 md:hidden">
                <Sparkles size={17} className="text-brand" />
                <span className="text-xs font-semibold tracking-[0.22em]">
                  WHIFF
                </span>
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {isLogin ? "Welcome back" : "Join the collection"}
              </p>

              <h2 className="font-display text-3xl sm:text-4xl">
                {isLogin ? "Sign in." : "Create account."}
              </h2>

              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {isLogin
                  ? "Your next favourite fragrance is just around the corner."
                  : "A few details and your fragrance journey begins."}
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {isLogin ? (
                <motion.form
                  key="login"
                  onSubmit={handleLogin}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={reveal}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                  className="space-y-5">
                  <div>
                    <label htmlFor="login-email" className={labelClass}>
                      Email address
                    </label>
                    <div className="relative">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                      />
                      <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        className={`${inputClass} pl-11`}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className={labelClass}>
                      Password
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                      />
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        required
                        className={`${inputClass} px-11`}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-brand">
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {hasDiscount && (
                    <div className="flex items-center gap-2 rounded-xl bg-brand-soft/60 px-4 py-3 text-xs text-brand">
                      <Check size={15} />
                      Your first-login offer is available.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-text-inverse transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                    {submitting ? "Signing in..." : "Sign in to Whiff"}
                    {!submitting && <ArrowRight size={17} />}
                  </button>

                  <p className="pt-2 text-center text-sm text-text-secondary md:hidden">
                    New to Whiff?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode(false)}
                      className="font-semibold text-brand underline underline-offset-4">
                      Create an account
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  onSubmit={handleSignUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={reveal}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                  className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="signup-firstname" className={labelClass}>
                        First name
                      </label>
                      <div className="relative">
                        <UserRound
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                        />
                        <input
                          id="signup-firstname"
                          type="text"
                          autoComplete="given-name"
                          placeholder="First name"
                          required
                          className={`${inputClass} pl-10`}
                          value={firstname}
                          onChange={(event) => setFirstname(event.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signup-lastname" className={labelClass}>
                        Last name
                      </label>
                      <input
                        id="signup-lastname"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Last name"
                        required
                        className={inputClass}
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-email" className={labelClass}>
                      Email address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                      />
                      <input
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        className={`${inputClass} pl-11`}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-phone" className={labelClass}>
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                      />
                      <input
                        id="signup-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Your phone number"
                        required
                        className={`${inputClass} pl-11`}
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-address" className={labelClass}>
                      Delivery address
                    </label>
                    <div className="relative">
                      <MapPin
                        size={16}
                        className="pointer-events-none absolute left-4 top-4 text-text-muted"
                      />
                      <textarea
                        id="signup-address"
                        autoComplete="street-address"
                        placeholder="Your full delivery address"
                        required
                        rows={2}
                        className={`${inputClass} resize-y pl-11`}
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-password" className={labelClass}>
                      Password
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                      />
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a password"
                        required
                        className={`${inputClass} px-11`}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-brand">
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-text-inverse transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                    {submitting ? "Creating your account..." : "Create account"}
                    {!submitting && <ArrowRight size={17} />}
                  </button>

                  <p className="pt-2 text-center text-sm text-text-secondary md:hidden">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode(true)}
                      className="font-semibold text-brand underline underline-offset-4">
                      Sign in
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="mt-7 text-center text-[11px] leading-5 text-text-muted">
              By continuing, you agree to shop responsibly and provide accurate
              account and delivery information.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Auth;
