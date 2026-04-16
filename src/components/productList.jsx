<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Filter, ChevronDown } from 'lucide-react';

function ProductList({ products }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-fit pt-0 pb-0 px-6 md:px-12 lg:px-16">
      
      {/* --- PAGE HEADER (Scales down with cards) --- */}
      <div className="max-w-[1440px] mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1A1A1A]">
              SHOP ALL<span className="text-[#8A9A8A]">.</span>
            </h2>
            <p className="text-gray-400 mt-2 uppercase text-[9px] tracking-[0.3em] font-bold">
              {products.length} Formulations
            </p>
          </div>
          
          <div className="flex gap-6 items-center text-[10px] uppercase tracking-widest font-bold text-gray-500">
            <button className="flex items-center gap-2 hover:text-[#8A9A8A] transition-colors">
              Filter <Filter size={12} />
            </button>
            <button className="flex items-center gap-2 hover:text-[#8A9A8A] transition-colors">
              Sort <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID (Increased columns = Smaller cards) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10 max-w-[1440px] mx-auto">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => handleClick(p._id)}
            className="group cursor-pointer"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F2F2F0] rounded-sm mb-3">
              <img
                src={p.images?.[0] || "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800"}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              
              {/* Overlay Badge */}
              {p.discountPrice && (
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#1A1A1A] shadow-sm">
                  Sale
                </div>
              )}

              {/* Hover Icon (Smaller) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center">
                <div className="bg-white p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                    <ShoppingBag size={16} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Product Info (More compact) */}
            <div className="space-y-0.5 px-1">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[11px] font-bold tracking-tight uppercase group-hover:text-[#8A9A8A] transition-colors leading-tight truncate">
                    {p.name}
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                   {p.category || "Botanical"}
                </p>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-[12px] font-medium">₹{p.discountPrice || p.price}</span>
                  {p.discountPrice && (
                      <span className="text-[10px] line-through text-gray-300">₹{p.price}</span>
                  )}
              </div>
              
              {/* Minimalist Divider Line */}
              <div className="pt-2">
                  <div className="h-[1px] w-full bg-black/5"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- LOAD MORE --- */}
      <div className="mt-20 flex justify-center">
        <button className="border border-black/10 px-10 py-3 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">
            View All
        </button>
      </div>

    </div>
  );
}

=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Filter, ChevronDown } from 'lucide-react';

function ProductList({ products }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-fit pt-0 pb-0 px-6 md:px-12 lg:px-16">
      
      {/* --- PAGE HEADER (Scales down with cards) --- */}
      <div className="max-w-[1440px] mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1A1A1A]">
              SHOP ALL<span className="text-[#8A9A8A]">.</span>
            </h2>
            <p className="text-gray-400 mt-2 uppercase text-[9px] tracking-[0.3em] font-bold">
              {products.length} Formulations
            </p>
          </div>
          
          <div className="flex gap-6 items-center text-[10px] uppercase tracking-widest font-bold text-gray-500">
            <button className="flex items-center gap-2 hover:text-[#8A9A8A] transition-colors">
              Filter <Filter size={12} />
            </button>
            <button className="flex items-center gap-2 hover:text-[#8A9A8A] transition-colors">
              Sort <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID (Increased columns = Smaller cards) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10 max-w-[1440px] mx-auto">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => handleClick(p._id)}
            className="group cursor-pointer"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F2F2F0] rounded-sm mb-3">
              <img
                src={p.images?.[0] || "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800"}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              
              {/* Overlay Badge */}
              {p.discountPrice && (
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#1A1A1A] shadow-sm">
                  Sale
                </div>
              )}

              {/* Hover Icon (Smaller) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center">
                <div className="bg-white p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                    <ShoppingBag size={16} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Product Info (More compact) */}
            <div className="space-y-0.5 px-1">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[11px] font-bold tracking-tight uppercase group-hover:text-[#8A9A8A] transition-colors leading-tight truncate">
                    {p.name}
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                   {p.category || "Botanical"}
                </p>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-[12px] font-medium">₹{p.discountPrice || p.price}</span>
                  {p.discountPrice && (
                      <span className="text-[10px] line-through text-gray-300">₹{p.price}</span>
                  )}
              </div>
              
              {/* Minimalist Divider Line */}
              <div className="pt-2">
                  <div className="h-[1px] w-full bg-black/5"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- LOAD MORE --- */}
      <div className="mt-20 flex justify-center">
        <button className="border border-black/10 px-10 py-3 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">
            View All
        </button>
      </div>

    </div>
  );
}

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default ProductList;