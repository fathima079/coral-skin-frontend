import React, { useState, useEffect } from 'react';
import ProductList from '../components/productList';
import CategoryBar from '../components/CategoryBar';
import { getAllProducts } from '../services/productapi';

function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllProducts();
        const productData = data.data || data;

        console.log("API DATA:", productData); // 👈 DEBUG

        setProducts(productData);
        setFilteredProducts(productData);

        const uniqueCategories = [
          "All",
          ...new Set(productData.map(p => p.category?.trim()).filter(Boolean))
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading shop data:", error);
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
          p =>
            p.category?.toLowerCase().trim() ===
            activeCategory.toLowerCase().trim()
        )
      );
    }
  }, [activeCategory, products]);

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