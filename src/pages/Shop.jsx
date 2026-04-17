import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/productapi";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllProducts();
        const productData = data?.data || data || [];

        setProducts(productData);
        setFilteredProducts(productData);

        const uniqueCategories = [
          "All",
          ...new Set(productData.map((p) => p.category?.trim()).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) => p.category?.toLowerCase().trim() === activeCategory.toLowerCase().trim()
        )
      );
    }
  }, [activeCategory, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="animate-pulse text-[#8A9A8A] tracking-[0.3em] uppercase text-sm font-bold">
          Loading Collection...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] font-sans min-h-screen">
      {/* HEADER SECTION */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold">
            Browse
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D3A3A] mt-4">
            THE <span className="italic font-light text-[#8A9A8A]">SHOP.</span>
          </h1>
          <p className="mt-6 max-w-md text-[#555] leading-relaxed">
            High-performance skincare formulated with minimalist principles. 
            Filtered by your skin's needs.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="px-6 md:px-12 lg:px-16 mb-12">
        <div className="flex flex-wrap gap-3 border-b border-black/5 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="px-6 md:px-12 lg:px-16 pb-24">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-gray-400 italic">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="group cursor-pointer"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F0F0F0]">
                  <img
                    src={
                      product.images?.[0] ||
                      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  {/* MINI ACTION BUTTON */}
                  <button className="absolute bottom-3 right-3 bg-white p-2.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-sm">
                    <ShoppingBag size={16} />
                  </button>
                  
                  {product.isBestSeller && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest px-2 py-1 rounded">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* PRODUCT INFO */}
                <div className="flex flex-col mt-4 gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A9A8A] font-bold">
                    {product.category}
                  </span>
                  <h4 className="text-sm font-medium text-[#1A1A1A] truncate group-hover:text-[#8A9A8A] transition-colors">
                    {product.name}
                  </h4>
                  <span className="text-sm font-light text-gray-500">
                    ₹{product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER ACCENT - Matching Home */}
      <footer className="py-16 text-center border-t border-black/5">
        <h2 className="text-[12vw] md:text-[8vw] font-bold text-black/5 mb-8">
          CORAL SKIN
        </h2>
        <div className="flex flex-wrap justify-center gap-6 text-xs tracking-[0.2em] uppercase font-bold text-gray-400">
          <a href="#" className="hover:text-black transition-colors">Instagram</a>
          <a href="#" className="hover:text-black transition-colors">Sustainability</a>
          <a href="#" className="hover:text-black transition-colors">Stockists</a>
        </div>
      </footer>
    </div>
  );
};

export default Shop;