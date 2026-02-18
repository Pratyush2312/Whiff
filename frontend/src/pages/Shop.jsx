import { useState, useEffect } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router';
import PerfumeCard from '../components/PerfumeCard'
import toast from 'react-hot-toast';
const URL = import.meta.env.VITE_BACKEND_URL
const Shop = () => {
  const navigate = useNavigate()
  const [wishList, setwishList] = useState([])
  const [loading, setLoading] = useState(true)
  const [perfumes, setPerfumes] = useState([])
  const fetchPerfume = async () => {
    try {
      const data = await fetch(`${URL}/perfumes`)
      const res = await data.json()
      setPerfumes(res)
    } catch (err) {
      toast.error("Failed to load perfumes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPerfume()
  }, [])





  const handleClick = (slug) => {
    navigate(`/perfume/${encodeURIComponent(slug)}`)
  }



  const addToWishlist = async (id) => {
    try {
      const response = await fetch(`${URL}/wishlist/add`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          perfumeId: id
        })
      })

      const data = await response.json()

      if (data.status === "duplicate") {
        toast.error(data.message)
        return
      }
      if (!response.ok) {
        toast.error(data.message || "Something went wrong")
        return
      }


      toast.success(data.message)
      setwishList(prev =>
        prev.includes(String(id)) ? prev : [...prev, String(id)]
      );


    } catch (err) {
      toast.error("Error connecting to backend")
    }
  }

  const removefromWishlist = async (id) => {
    try {
      const res = await fetch(`${URL}/wishlist/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          perfumeId: id
        })
      })
      const data = await res.json()
      if (data.status == 'success') {
        setwishList(prev => prev.filter(itemId => itemId !== id))
        toast.success(data.message)
        return
      }
      if (data.status == 'notfound') {
        toast.error(data.message)
        return
      }
    } catch (err) {
      console.log(err)
      toast.error("Error connecting to the server")
    }
  }
  const fetchWishlist = async () => {
    const res = await fetch(`${URL}/wishlist`, {
      credentials: "include"
    });
    const data = await res.json();

    if (data.status === "success") {
      const ids = data.wishlist.map(item => String(item.perfume._id));
      setwishList(ids);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);



  return (
    <div className="flex">
      <main className="flex-1 bg-[#f6f5f3] px-4 sm:px-6 lg:px-12 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold italic">
            Our Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Signature fragrances crafted by Whiff
          </p>
        </div>

        {loading ? (
          <div className="w-full flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500">Loading perfumes…</p>
            </div>
          </div>
        ) : (
          <section
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center"
          >
            {perfumes
              .filter(p => p.isActive)
              .map((i) => {
                const isWishlisted = wishList.includes(String(i._id));

                return (
                  <div
                    key={i._id}
                    onClick={() => handleClick(i.slug)}
                    className="relative w-full max-w-[240px] bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >

                    {/* IMAGE */}
                    <div className="w-full h-[220px] flex items-center justify-center overflow-hidden">
                      <img
                        src={i.image}
                        alt={i.name}
                        className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* CATEGORY */}
                    {/* <span className="absolute top-3 left-3 text-xs px-2 py-[2px] rounded-full bg-violet-100 text-violet-700 font-medium">
                      {i.category}
                    </span> */}  

                    {/* WISHLIST */}
                    <button
                      className="absolute top-3 right-3 text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        isWishlisted
                          ? removefromWishlist(i._id)
                          : addToWishlist(i._id);
                      }}
                    >
                      {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    {/* TEXT */}
                    <h2 className="mt-4 text-sm font-semibold">{i.name}</h2>
                    <p className="text-xs text-gray-500">by Whiff</p>
                  </div>
                );
              })}
          </section>
        )}

      </main>
    </div>
  );

}

export default Shop
