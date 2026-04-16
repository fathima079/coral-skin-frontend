<<<<<<< HEAD
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
      setFilteredProducts(products.filter(
        p => p.category?.toLowerCase().trim() === activeCategory.toLowerCase().trim()
      ));
    }
  }, [activeCategory, products]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      
      {/* --- HERO HEADER SECTION --- */}
      {/* We group Title, Breadcrumbs and Category Bar to fill the top space effectively */}
      <header className="pt-32 pb-10 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-black/5 pb-12">
          
          <div className="max-w-xl">
            {/* Breadcrumb tucked neatly above title */}
            <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] mb-4">
              <a href="/" className="hover:text-[#1A1A1A] transition-colors">Home</a>
              <span className="text-gray-300">/</span>
              <span className="text-[#1A1A1A]">Shop All</span>
            </nav>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#1A1A1A] leading-[0.9]">
              THE <br /> COLLECTION<span className="text-[#8A9A8A]">.</span>
            </h1>
          </div>

          <div className="lg:text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
              Currently Viewing
            </p>
            <p className="text-sm italic font-serif text-[#1A1A1A]">
              {activeCategory} — {filteredProducts.length} Formulations
            </p>
          </div>
        </div>

        {/* Category Bar sits tight under the header line */}
        <div className="mt-8">
          <CategoryBar 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
          />
        </div>
      </header>

      {/* --- MAIN PRODUCT GRID --- */}
      <main className="px-6 md:px-16 max-w-[1440px] mx-auto">
        {/* We pass the smaller cards here */}
        <ProductList products={filteredProducts} />
        
        {/* Empty State with proper centering if no products */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-center">
             <p className="text-gray-300 italic mb-4">No formulations found in this category.</p>
             <button 
               onClick={() => setActiveCategory("All")}
               className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1"
             >
               View All Products
             </button>
          </div>
        )}
      </main>

      {/* --- ADVISORY SECTION (Now feels like a natural end to the page) --- */}
      <section className="mt-32 py-24 px-6 md:px-16 bg-[#1A1A1A] text-[#FAF9F6]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8A9A8A] block mb-8">
            Personalized Care
          </span>
          <h3 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-12">
            Not sure which formula is right for your skin? <br />
            <span className="italic font-serif opacity-80">Our specialists are here to guide you.</span>
          </h3>
          <button className="bg-[#FAF9F6] text-[#1A1A1A] px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#8A9A8A] hover:text-white transition-all duration-500">
            Book a Virtual Consultation
          </button>
        </div>
      </section>

      {/* FOOTER SPACE */}
      <footer className="py-12 text-center opacity-20 text-[10px] tracking-[0.5em] uppercase">
        Coral Skin Rituals
      </footer>
    </div>
  );
}

=======
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
      setFilteredProducts(products.filter(
        p => p.category?.toLowerCase().trim() === activeCategory.toLowerCase().trim()
      ));
    }
  }, [activeCategory, products]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      
      {/* --- HERO HEADER SECTION --- */}
      {/* We group Title, Breadcrumbs and Category Bar to fill the top space effectively */}
      <header className="pt-32 pb-10 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-black/5 pb-12">
          
          <div className="max-w-xl">
            {/* Breadcrumb tucked neatly above title */}
            <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] mb-4">
              <a href="/" className="hover:text-[#1A1A1A] transition-colors">Home</a>
              <span className="text-gray-300">/</span>
              <span className="text-[#1A1A1A]">Shop All</span>
            </nav>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#1A1A1A] leading-[0.9]">
              THE <br /> COLLECTION<span className="text-[#8A9A8A]">.</span>
            </h1>
          </div>

          <div className="lg:text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
              Currently Viewing
            </p>
            <p className="text-sm italic font-serif text-[#1A1A1A]">
              {activeCategory} — {filteredProducts.length} Formulations
            </p>
          </div>
        </div>

        {/* Category Bar sits tight under the header line */}
        <div className="mt-8">
          <CategoryBar 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
          />
        </div>
      </header>

      {/* --- MAIN PRODUCT GRID --- */}
      <main className="px-6 md:px-16 max-w-[1440px] mx-auto">
        {/* We pass the smaller cards here */}
        <ProductList products={filteredProducts} />
        
        {/* Empty State with proper centering if no products */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-center">
             <p className="text-gray-300 italic mb-4">No formulations found in this category.</p>
             <button 
               onClick={() => setActiveCategory("All")}
               className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1"
             >
               View All Products
             </button>
          </div>
        )}
      </main>

      {/* --- ADVISORY SECTION (Now feels like a natural end to the page) --- */}
      <section className="mt-32 py-24 px-6 md:px-16 bg-[#1A1A1A] text-[#FAF9F6]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8A9A8A] block mb-8">
            Personalized Care
          </span>
          <h3 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-12">
            Not sure which formula is right for your skin? <br />
            <span className="italic font-serif opacity-80">Our specialists are here to guide you.</span>
          </h3>
          <button className="bg-[#FAF9F6] text-[#1A1A1A] px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#8A9A8A] hover:text-white transition-all duration-500">
            Book a Virtual Consultation
          </button>
        </div>
      </section>

      {/* FOOTER SPACE */}
      <footer className="py-12 text-center opacity-20 text-[10px] tracking-[0.5em] uppercase">
        Coral Skin Rituals
      </footer>
    </div>
  );
}

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default Shop;