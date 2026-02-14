import Combo1 from "../assets/Combo1-10ML.png"
import Combo2 from "../assets/Combo1-30ML.png"
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router"
const combo = [{
  id: 1,
  image: Combo1,
  name: "The Mood Spectrum Trio"
},
{
  id: 2,
  image: Combo2,
  name: "The Breeze & Bloom Duo"
}]
const SignatureCollection = () => {
  const navigate = useNavigate()
  return (
    <div className="px-6 sm:px-10 lg:px-16 py-20 bg-neutral-50">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-14">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center sm:text-left">
          Crafted for you
        </h2>

        <button
          onClick={() => navigate('/combos')}
          className="
          justify-center
        mt-6 sm:mt-0
        flex items-center gap-2
        px-6 py-2
        rounded-full
        border border-black
        text-sm font-medium
        hover:bg-black hover:text-white
        transition duration-300
      "
        >
          More Combos <MdArrowForward />
        </button>
      </div>

      {/* Grid */}
      <section
        className="
      grid
      grid-cols-1
      sm:grid-cols-2
      gap-y-16
      gap-x-10
      place-items-center
    "
      >
        {combo.map((item) => (
          <div
            key={item.id}
            className="group relative w-full max-w-xs"
          >
            {/* Card */}
            <div
              className="
            relative
            h-[340px]
            rounded-2xl
            bg-white
            shadow-sm
            flex
            items-center
            justify-center
            transition-all
            duration-500
            group-hover:shadow-xl
            group-hover:-translate-y-2
          "
            >
              <img
                src={item.image}
                alt={item.name}
                className="
              h-56
              object-contain
              transition-transform
              duration-500
              group-hover:scale-110
            "
              />
            </div>
            <div className="mt-5 text-center">
              <h3 className="text-base font-medium">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default SignatureCollection
