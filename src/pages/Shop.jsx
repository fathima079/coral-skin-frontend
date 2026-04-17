import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/productapi";
import { useNavigate } from "react-router-dom";

function Shop() {
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
          ...new Set(
            productData.map((p) => p.category?.trim()).filter(Boolean)
          ),
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
          (p) =>
            p.category?.toLowerCase().trim() ===
            activeCategory.toLowerCase().trim()
        )
      );
    }
  }, [activeCategory, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 md:px-16 py-24">

      {/* 🔥 HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          Shop Collection
        </h1>
        <p className="text-gray-400 mt-3 text-sm tracking-widest uppercase">
          Clean. Minimal. Effective.
        </p>
      </div>

      {/* 🔥 CATEGORY BAR */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-xs tracking-widest uppercase border rounded-full transition-all
              ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "border-black/20 hover:bg-black hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔥 PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400">No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* INFO */}
              <div className="mt-4">
                <h3 className="text-sm font-medium group-hover:text-[#8A9A8A] transition">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                  {product.category}
                </p>
                <p className="mt-1 font-semibold">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;