import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { IoPersonOutline, IoHeartOutline, IoCartOutline } from "react-icons/io5";


const Navbar = () => {
  const navigate = useNavigate();

  const handleAccountClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/account/me", {
        credentials: "include",
      });

      if (res.ok) {
        navigate("/account");
      } else {
        navigate("/account/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <header className="w-full">

     
      <div className="w-full bg-black text-white text-[11px] px-4 py-2 flex items-center justify-end">
        <div className="hidden sm:flex gap-4">
          <span className="cursor-pointer hover:underline"><a href=" https://chat.whatsapp.com/FoJVrMNdgdC4zhRPM0Cdfd" target="_blank">Connect with us</a></span>
        </div>
      </div>

     
      <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white border-b">

        {/* LEFT : SEARCH (Desktop only)
        <div className="hidden md:flex items-center w-full max-w-sm">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search fragrances..."
              className="w-full border rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
            />
            <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-600" />
          </div>
        </div> */}

        <div className="flex justify-center flex-1 md:flex-none">
          <img
            src={logo}
            alt="Whiff Logo"
            className="w-20 sm:w-24 h-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* RIGHT : ICONS */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <button
            className="flex items-center gap-1 hover:text-black/80"
            onClick={handleAccountClick}
          >
            <IoPersonOutline className="text-xl" />
            <span className="hidden sm:inline">Account</span>
          </button>

          <button className="flex items-center gap-1 hover:text-black/80"
          onClick={() => navigate("/wishlist")}
          >
            <IoHeartOutline className="text-xl" />
            <span className="hidden sm:inline">Wishlist</span>
          </button>

          <button className="flex items-center gap-1 hover:text-black/80" onClick={()=>{navigate('/cart')}}>
            <IoCartOutline className="text-xl" />
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>

      </nav>

      {/* ───────── CATEGORY NAV ───────── */}
      

    </header>

  );
};

export default Navbar;
