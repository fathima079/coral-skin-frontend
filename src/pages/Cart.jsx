import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateQty = (id, amount) => {
    const updated = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
    0
  );

  const shipping = total < 500 ? 100 : 0;
  const finalTotal = total + shipping;

  const goToCheckout = () => {
    navigate("/checkout")
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans pb-20">
      {/* HEADER */}
      <section className="pt-32 pb-12 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold">
            Your Shopping Bag
          </span>
          <h1 className="text-5xl md:text-6xl font-medium mt-3 italic">
            Cart<span className="text-[#8A9A8A]">.</span>
          </h1>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-6">
              <div className="p-6 bg-white rounded-full shadow-sm">
                <ShoppingBag size={40} className="text-[#8A9A8A]" />
              </div>
              <p className="text-gray-500 italic">Your collection is currently empty.</p>
              <button 
                onClick={() => navigate("/products")}
                className="flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 rounded-full hover:bg-[#3A4A3A] transition-all"
              >
                <span className="text-xs tracking-widest uppercase">Start Shopping</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-16">
              {/* ITEM LIST */}
              <div className="lg:col-span-7 space-y-8">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-black/5 items-center"
                  >
                    {/* Image */}
                    <div className="w-32 h-40 bg-[#F0F0F0] rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.images?.[0] || "https://via.placeholder.com/300"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-[#8A9A8A] text-sm">₹{item.discountPrice || item.price}</p>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-center sm:justify-start gap-4 pt-4">
                        <div className="flex items-center border border-black/10 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQty(item._id, -1)}
                            className="p-2 hover:text-[#8A9A8A] transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, 1)}
                            className="p-2 hover:text-[#8A9A8A] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="hidden sm:block text-right">
                      <p className="font-medium text-lg">
                        ₹{(item.discountPrice || item.price) * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}
              <div className="lg:col-span-5">
                <div className="bg-white p-8 md:p-10 rounded-[30px] shadow-sm sticky top-32">
                  <h3 className="text-xl font-medium mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="italic">₹{shipping}</span>
                    </div>
                    <div className="pt-4 border-t border-black/5 flex justify-between items-end">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-2xl font-bold">₹{finalTotal}</span>
                    </div>
                  </div>

                  <button 
                  onClick={() => goToCheckout()}
                  className="w-full group flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-7 py-5 rounded-full hover:bg-[#3A4A3A] transition-all duration-500">
                    <span className="text-xs tracking-[0.2em] uppercase font-bold">
                      Proceed to Checkout
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
                  
                  <p className="text-[10px] text-center text-gray-400 mt-6 uppercase tracking-widest">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER-LIKE BRANDING */}
      <div className="mt-32 pt-16 text-center border-t border-black/5">
        <h2 className="text-[8vw] font-bold text-black/5 leading-none">
          CORAL SKIN
        </h2>
      </div>
    </div>
  );
};

export default Cart;