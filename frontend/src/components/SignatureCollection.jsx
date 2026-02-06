import React from 'react'
import DarkDesire from "../assets/DarkDesire10ML-front.png"
import VelvetStrength from "../assets/VelvetStrength10ML-front.png"
import VanillaVeil from "../assets/VanillaVeil10ML-front.png"

const perfume = [{
  id: 1,
  image: DarkDesire,
}, 
{
  id: 2,
  image: VelvetStrength,
}, 
{
  id: 3,
  image: VanillaVeil,
}, 

]
const SignatureCollection = () => {
  return (
    <div className="px-4 sm:px-8">

      <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center mt-10 font-body">
        Crafted for you
      </h2>

      <section
        className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-y-20
      gap-x-12
      py-16
      place-items-center
    "
      >
        {perfume.map((item) => (
          <div
            key={item.id}
            className="group relative flex justify-center w-full h-[360px]"
          >

            {/* CIRCLE */}
            <div
              className="
            absolute
            inset-0
            mx-auto
            w-[220px]
            h-[320px]
            sm:w-[240px]
            sm:h-[340px]
            md:w-[260px]
            md:h-[360px]
            rounded-full
            bg-[#F2E6D8]
            flex
            items-center
            justify-center
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:bg-[#EFE1CF]
          "
            >
              <img
                src={item.image}
                alt={item.name}
                className="
              h-[220px]
              sm:h-[240px]
              md:h-[260px]
              object-contain
              z-10
              transition-transform
              duration-500
              group-hover:scale-105
            "
              />
            </div>

          </div>
        ))}
      </section>
    </div>

  )
}

export default SignatureCollection
