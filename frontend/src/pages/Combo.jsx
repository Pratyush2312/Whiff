import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
const URL = import.meta.env.VITE_BACKEND_URL
const Combo = () => {
  const [combos, setCombos] = useState([]);
  const navigate=useNavigate()

 

  // 🔹 fetch combos
  useEffect(() => {
    fetch(`${URL}/combos`)
      .then(res => res.json())
      .then(setCombos)
      .catch((err) =>{
        console.error(err) 
        toast.error("Failed to load combos")});
  }, []);

  const handleClick = (slug) => {
    navigate(`/combo/${encodeURIComponent(slug)}`)
  }

  
  return (
    <div className="min-h-screen bg-[#f6f5f3] px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Perfume Combos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {combos.map((combo) => {
          return (
            <div
              key={combo._id}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <img
                src={combo.image}
                alt={combo.name}
                className="h-44 mx-auto mb-4 object-cover"
              />

              <h2 className="text-xl font-semibold mb-2">{combo.name}</h2>

              <ul className="text-sm text-gray-600 mb-4">
                {/* {combo.perfumes.map((p, i) => (
                  <li key={i}>
                    • {p.perfume.name} ({p.volume})
                  </li>
                ))} */}
              </ul>

                 
              

              <button
                className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
                onClick={()=>{handleClick(combo.slug)}}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Combo;
