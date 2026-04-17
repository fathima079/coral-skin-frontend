import React, { useState, useEffect } from "react";
import ProductList from "../components/productList";
import CategoryBar from "../components/CategoryBar";
import { getAllProducts } from "../services/productapi";

function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllProducts();
        const productData = data?.data || data || [];

        console.log("API DATA:", productData);

        setProducts(productData);
        setFilteredProducts(productData);

        const uniqueCategories = [
          "All",
          ...new Set(
            productData
              .map((p) => p.category?.trim())
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error loading shop data:", err);
        setError("Failed to load products");
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

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default Shop;