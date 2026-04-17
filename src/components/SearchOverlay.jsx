import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/productapi";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (isOpen) {
      const fetchProducts = async () => {
        const data = await getAllProducts();
        setAllProducts(data.data || data);
      };
      fetchProducts();
    }
  }, [isOpen]);


  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results.slice(0, 5));
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, allProducts]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProductClick = (id) => {
    setSearchQuery("");
    onClose();
    navigate(`/products/${id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] transition-all duration-500 opacity-100 visible">

      <div className="absolute inset-0 bg-[#FAF9F6]/98 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative max-w-4xl mx-auto pt-32 px-6">
        <button onClick={onClose} className="absolute top-10 right-6 text-gray-400 hover:text-black transition-colors">
          <X size={30} strokeWidth={1} />
        </button>

        <div className="relative">
          <input
            autoFocus
            type="text"
            placeholder="Start typing to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b-2 border-black/10 py-6 text-3xl md:text-5xl font-light outline-none focus:border-[#8A9A8A] transition-colors placeholder:text-gray-200"
          />
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300" size={32} />
        </div>


        <div className="mt-12 grid gap-8">
          {filteredResults.length > 0 ? (
            filteredResults.map((product) => (
              <div 
                key={product._id} 
                onClick={() => handleProductClick(product._id)}
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={product.images?.[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-medium group-hover:text-[#8A9A8A] transition-colors">{product.name}</h4>
                  <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest">{product.category}</p>
                </div>
                <ArrowRight size={20} className="text-gray-300 group-hover:translate-x-2 transition-transform" />
              </div>
            ))
          ) : searchQuery.length >= 2 ? (
            <p className="text-gray-400 italic">No products found for "{searchQuery}"</p>
          ) : (
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A9A8A] font-bold">Try: Serum, Cleanser, or Oil</p>
          )}
        </div>
      </div>
    </div>
  );
};