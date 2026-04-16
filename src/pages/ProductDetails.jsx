<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from '../services/productapi';
import { Minus, Plus, ShoppingBag, ArrowLeft, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const ViewProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.data || data); 
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    ViewProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
      <div className="w-8 h-8 border-2 border-[#8A9A8A] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
       <p className="uppercase tracking-[0.3em] font-bold text-gray-400">Product not found</p>
       <button onClick={() => navigate("/products")} className="mt-4 underline text-sm">Return to Shop</button>
    </div>
  );

  // FIXED: Logic for adding to cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item._id === product._id);

    if(exists) {
      exists.quantity += quantity;
    } else {
      cart.push({...product, quantity: quantity}); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"))
    navigate('/cart');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20 text-[#1A1A1A]">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] hover:text-black transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-[30px] overflow-hidden bg-[#E2E8E2] shadow-sm">
              <img
                src={product.images?.[0] || "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Aesthetic badge */}
            <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
               <span className="text-[10px] uppercase tracking-widest font-bold">In Stock</span>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="flex flex-col pt-4">
            <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold mb-4">
              {product.category || "Essential Ritual"}
            </span>
            
            <h1 className="text-5xl md:text-6xl font-medium mb-6 italic">
              {product.name}<span className="text-[#8A9A8A]">.</span>
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-light">₹{product.discountPrice || product.price}</span>
              {product.discountPrice && (
                <span className="text-lg line-through text-gray-300">₹{product.price}</span>
              )}
            </div>

            <p className="text-[#555] leading-relaxed mb-10 text-base max-w-md">
              {product.description || "A high-performance formula designed to respect your biology and the planet. Minimalist ingredients, maximalist results for your daily ritual."}
            </p>

            {/* ACTION AREA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              {/* Quantity */}
              <div className="flex items-center border border-black/10 px-6 py-4 rounded-full bg-white w-full sm:w-auto justify-between sm:justify-center gap-6">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="hover:text-[#8A9A8A] transition-colors"
                >
                  <Minus size={16}/>
                </button>
                <span className="text-sm font-bold min-w-[20px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="hover:text-[#8A9A8A] transition-colors"
                >
                  <Plus size={16}/>
                </button>
              </div>

              {/* Add to Cart */}
              <button
               onClick={handleAddToCart}
               className="w-full sm:flex-1 bg-[#1A1A1A] text-white rounded-full py-4 px-8 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 hover:bg-[#3A4A3A] transition-all active:scale-[0.98] shadow-lg shadow-black/5">
                <ShoppingBag size={18} strokeWidth={1.5} />
                Add to Ritual
              </button>
            </div>

            {/* FEATURE STRIP */}
            <div className="grid grid-cols-1 gap-8 border-t border-black/5 pt-10">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    <ShieldCheck size={20} className="text-[#8A9A8A]"/>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">Clean Formula</h4>
                  <p className="text-xs text-gray-400 italic">No parabens, sulfates, or synthetic fragrances.</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    <Leaf size={20} className="text-[#8A9A8A]"/>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">Ethics</h4>
                  <p className="text-xs text-gray-400 italic">100% Vegan & Cruelty Free.</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    <Sparkles size={20} className="text-[#8A9A8A]"/>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">The Result</h4>
                  <p className="text-xs text-gray-400 italic">Clinically proven radiance within 14 days.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BACKGROUND BRANDING */}
      <div className="mt-32 pt-16 text-center border-t border-black/5 overflow-hidden">
        <h2 className="text-[15vw] font-bold text-black/5 leading-none translate-y-8">
          ESSENCE
        </h2>
      </div>
    </div>
  );
}

=======
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from '../services/productapi';
import { Minus, Plus, ShoppingBag, ArrowLeft, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const ViewProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.data || data); 
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    ViewProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
      <div className="w-8 h-8 border-2 border-[#8A9A8A] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
       <p className="uppercase tracking-[0.3em] font-bold text-gray-400">Product not found</p>
       <button onClick={() => navigate("/products")} className="mt-4 underline text-sm">Return to Shop</button>
    </div>
  );

  // FIXED: Logic for adding to cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item._id === product._id);

    if(exists) {
      exists.quantity += quantity;
    } else {
      cart.push({...product, quantity: quantity}); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"))
    navigate('/cart');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20 text-[#1A1A1A]">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] hover:text-black transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-[30px] overflow-hidden bg-[#E2E8E2] shadow-sm">
              <img
                src={product.images?.[0] || "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Aesthetic badge */}
            <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
               <span className="text-[10px] uppercase tracking-widest font-bold">In Stock</span>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="flex flex-col pt-4">
            <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold mb-4">
              {product.category || "Essential Ritual"}
            </span>
            
            <h1 className="text-5xl md:text-6xl font-medium mb-6 italic">
              {product.name}<span className="text-[#8A9A8A]">.</span>
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-light">₹{product.discountPrice || product.price}</span>
              {product.discountPrice && (
                <span className="text-lg line-through text-gray-300">₹{product.price}</span>
              )}
            </div>

            <p className="text-[#555] leading-relaxed mb-10 text-base max-w-md">
              {product.description || "A high-performance formula designed to respect your biology and the planet. Minimalist ingredients, maximalist results for your daily ritual."}
            </p>

            {/* ACTION AREA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              {/* Quantity */}
              <div className="flex items-center border border-black/10 px-6 py-4 rounded-full bg-white w-full sm:w-auto justify-between sm:justify-center gap-6">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="hover:text-[#8A9A8A] transition-colors"
                >
                  <Minus size={16}/>
                </button>
                <span className="text-sm font-bold min-w-[20px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="hover:text-[#8A9A8A] transition-colors"
                >
                  <Plus size={16}/>
                </button>
              </div>

              {/* Add to Cart */}
              <button
               onClick={handleAddToCart}
               className="w-full sm:flex-1 bg-[#1A1A1A] text-white rounded-full py-4 px-8 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 hover:bg-[#3A4A3A] transition-all active:scale-[0.98] shadow-lg shadow-black/5">
                <ShoppingBag size={18} strokeWidth={1.5} />
                Add to Ritual
              </button>
            </div>

            {/* FEATURE STRIP */}
            <div className="grid grid-cols-1 gap-8 border-t border-black/5 pt-10">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    <ShieldCheck size={20} className="text-[#8A9A8A]"/>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">Clean Formula</h4>
                  <p className="text-xs text-gray-400 italic">No parabens, sulfates, or synthetic fragrances.</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    <Leaf size={20} className="text-[#8A9A8A]"/>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">Ethics</h4>
                  <p className="text-xs text-gray-400 italic">100% Vegan & Cruelty Free.</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    <Sparkles size={20} className="text-[#8A9A8A]"/>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">The Result</h4>
                  <p className="text-xs text-gray-400 italic">Clinically proven radiance within 14 days.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BACKGROUND BRANDING */}
      <div className="mt-32 pt-16 text-center border-t border-black/5 overflow-hidden">
        <h2 className="text-[15vw] font-bold text-black/5 leading-none translate-y-8">
          ESSENCE
        </h2>
      </div>
    </div>
  );
}

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default ProductDetails;