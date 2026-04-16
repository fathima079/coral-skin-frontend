<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/productapi";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, Leaf, Droplets, Sparkles } from "lucide-react";

const Home = () => {
  const [ bestSellers, setBestSellers ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await getAllProducts();
      const productData = data.data || data;

      const filtered = productData
        .filter((product) => product.isBestSeller === true)
        .slice(0, 5);

      setBestSellers(filtered);
    };
    load();
  }, []);


  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] font-sans overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">

          {/* LEFT */}
          <div>
            <h1 className="text-[14vw] sm:text-[10vw] lg:text-[7rem] leading-[0.9] font-bold tracking-tight text-[#2D3A3A]">
              PURE <br />
              <span className="ml-6 sm:ml-10 italic font-light text-[#8A9A8A]">
                ESSENCE.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base sm:text-lg text-[#555] leading-relaxed">
              We create high-performance skincare that respects your biology
              and the planet. Minimalist formulas, maximalist results.
            </p>

            <button onClick={() => navigate("/products")} className="mt-8 group flex items-center gap-3 bg-[#1A1A1A] text-white px-7 py-4 rounded-full hover:bg-[#3A4A3A] transition-all duration-500">
              <span className="text-xs tracking-widest uppercase">
                Shop Now
              </span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-[30px] overflow-hidden bg-[#E2E8E2]">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating image hidden on mobile */}
            <div className="hidden md:block absolute -bottom-8 -left-8 w-48 lg:w-60 rounded-3xl overflow-hidden border-8 border-[#FAF9F6] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
                alt="Texture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="py-14 border-y border-black/5">
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {[
            { icon: <Leaf size={18} />, text: "100% Vegan" },
            { icon: <Droplets size={18} />, text: "Paraben Free" },
            { icon: <Sparkles size={18} />, text: "Clinically Proven" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="p-3 bg-white rounded-full shadow-sm">
                {item.icon}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
<section className="py-20 px-6 md:px-12 lg:px-16">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
    <div>
      <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold">
        The Collection
      </span>
      <h2 className="text-4xl md:text-5xl font-medium mt-3"> {/* Slightly smaller heading */}
        Selected Works
      </h2>
    </div>

    <p className="max-w-xs text-sm text-gray-500 italic">
      Our essentials are designed to be used in synergy.
    </p>
  </div>

  {/* Updated Grid: More columns = smaller cards */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {bestSellers.map((product) => (
      <div
        key={product._id}
        onClick={() => handleClick(product._id)}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F0F0F0]">
          <img
            src={
              product.images?.[0] ||
              "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800"
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          {/* Smaller Action Button */}
          <button className="absolute bottom-3 right-3 bg-white p-2.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-sm">
            <ShoppingBag size={16} />
          </button>
        </div>

        <div className="flex flex-col mt-3 gap-1"> {/* Changed to column for a tighter look */}
          <h4 className="text-sm font-medium text-[#1A1A1A] truncate">{product.name}</h4>
          <span className="text-sm font-light text-gray-500">₹{product.price}</span>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* FOOTER */}
      <footer className="py-16 text-center">
        <h2 className="text-[12vw] md:text-[8vw] font-bold text-black/5 mb-8">
          CORAL SKIN
        </h2>

        <div className="flex flex-wrap justify-center gap-6 text-xs tracking-[0.2em] uppercase font-bold text-gray-500">
          <a href="#">Instagram</a>
          <a href="#">Sustainability</a>
          <a href="#">Stockists</a>
        </div>
      </footer>
    </div>
  );
};

=======
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/productapi";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, Leaf, Droplets, Sparkles } from "lucide-react";

const Home = () => {
  const [ bestSellers, setBestSellers ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await getAllProducts();
      const productData = data.data || data;

      const filtered = productData
        .filter((product) => product.isBestSeller === true)
        .slice(0, 5);

      setBestSellers(filtered);
    };
    load();
  }, []);


  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] font-sans overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">

          {/* LEFT */}
          <div>
            <h1 className="text-[14vw] sm:text-[10vw] lg:text-[7rem] leading-[0.9] font-bold tracking-tight text-[#2D3A3A]">
              PURE <br />
              <span className="ml-6 sm:ml-10 italic font-light text-[#8A9A8A]">
                ESSENCE.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base sm:text-lg text-[#555] leading-relaxed">
              We create high-performance skincare that respects your biology
              and the planet. Minimalist formulas, maximalist results.
            </p>

            <button onClick={() => navigate("/products")} className="mt-8 group flex items-center gap-3 bg-[#1A1A1A] text-white px-7 py-4 rounded-full hover:bg-[#3A4A3A] transition-all duration-500">
              <span className="text-xs tracking-widest uppercase">
                Shop Now
              </span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-[30px] overflow-hidden bg-[#E2E8E2]">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating image hidden on mobile */}
            <div className="hidden md:block absolute -bottom-8 -left-8 w-48 lg:w-60 rounded-3xl overflow-hidden border-8 border-[#FAF9F6] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
                alt="Texture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="py-14 border-y border-black/5">
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {[
            { icon: <Leaf size={18} />, text: "100% Vegan" },
            { icon: <Droplets size={18} />, text: "Paraben Free" },
            { icon: <Sparkles size={18} />, text: "Clinically Proven" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="p-3 bg-white rounded-full shadow-sm">
                {item.icon}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
<section className="py-20 px-6 md:px-12 lg:px-16">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
    <div>
      <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold">
        The Collection
      </span>
      <h2 className="text-4xl md:text-5xl font-medium mt-3"> {/* Slightly smaller heading */}
        Selected Works
      </h2>
    </div>

    <p className="max-w-xs text-sm text-gray-500 italic">
      Our essentials are designed to be used in synergy.
    </p>
  </div>

  {/* Updated Grid: More columns = smaller cards */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {bestSellers.map((product) => (
      <div
        key={product._id}
        onClick={() => handleClick(product._id)}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F0F0F0]">
          <img
            src={
              product.images?.[0] ||
              "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800"
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          {/* Smaller Action Button */}
          <button className="absolute bottom-3 right-3 bg-white p-2.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-sm">
            <ShoppingBag size={16} />
          </button>
        </div>

        <div className="flex flex-col mt-3 gap-1"> {/* Changed to column for a tighter look */}
          <h4 className="text-sm font-medium text-[#1A1A1A] truncate">{product.name}</h4>
          <span className="text-sm font-light text-gray-500">₹{product.price}</span>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* FOOTER */}
      <footer className="py-16 text-center">
        <h2 className="text-[12vw] md:text-[8vw] font-bold text-black/5 mb-8">
          CORAL SKIN
        </h2>

        <div className="flex flex-wrap justify-center gap-6 text-xs tracking-[0.2em] uppercase font-bold text-gray-500">
          <a href="#">Instagram</a>
          <a href="#">Sustainability</a>
          <a href="#">Stockists</a>
        </div>
      </footer>
    </div>
  );
};

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default Home;