<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, Truck, CreditCard, ShieldCheck, Banknote } from "lucide-react";
import api from "../api/api"

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card"); // New state for payment selection
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const orderData = {
    customerName: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    address: formData.address,
    items: cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.discountPrice || item.price,
      quantity: item.quantity,
      image: item.images?.[0]   
    })),
    totalAmount: total,
    paymentMethod
  };

  try {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

    await api.post("/api/orders", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    navigate("/");

  } catch (err) {
    console.error(err);
    alert("Failed to place order");
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartItems(cart);

}, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans pb-20">
      {/* HEADER */}
      <header className="pt-12 pb-8 px-6 md:px-12 lg:px-16 border-b border-black/5 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] hover:text-black transition-colors"
          >
            <ChevronLeft size={14} /> Back to Bag
          </button>
          <h1 className="text-xl font-medium italic tracking-tighter">
            Coral Skin<span className="text-[#8A9A8A]">.</span>
          </h1>
          <div className="flex items-center gap-2 text-gray-400">
            <Lock size={14} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: FORM FIELDS */}
          <div className="lg:col-span-7 space-y-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* 1. Contact Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#8A9A8A] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Contact Information</h2>
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A] transition-colors"
                  onChange={handleInputChange}
                />
              </section>

              {/* 2. Shipping Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#8A9A8A] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input required name="firstName" placeholder="First Name" className="bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                  <input required name="lastName" placeholder="Last Name" className="bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                </div>
                <input required name="address" placeholder="Street Address" className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 mb-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <input required name="city" placeholder="City" className="bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                  <input required name="postalCode" placeholder="Postal Code" className="bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                </div>
              </section>

              {/* 3. Payment Method Selection */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#8A9A8A] text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Payment Method</h2>
                </div>
                
                <div className="space-y-3">
                  {/* Card Option */}
                  <label className={`block cursor-pointer border rounded-xl p-5 transition-all ${paymentMethod === 'card' ? 'border-[#8A9A8A] bg-white shadow-sm' : 'border-black/5 bg-white/50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input 
                          type="radio" 
                          name="payment" 
                          className="accent-[#8A9A8A] w-4 h-4" 
                          checked={paymentMethod === 'card'} 
                          onChange={() => setPaymentMethod('card')}
                        />
                        <div className="flex items-center gap-3">
                          <CreditCard size={20} className={paymentMethod === 'card' ? 'text-[#8A9A8A]' : 'text-gray-400'} />
                          <span className="text-sm font-medium">Credit / Debit Card</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-6 h-4 bg-gray-100 rounded" />
                        <div className="w-6 h-4 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </label>

                  {/* COD Option */}
                  <label className={`block cursor-pointer border rounded-xl p-5 transition-all ${paymentMethod === 'cod' ? 'border-[#8A9A8A] bg-white shadow-sm' : 'border-black/5 bg-white/50'}`}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="payment" 
                        className="accent-[#8A9A8A] w-4 h-4" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div className="flex items-center gap-3">
                        <Banknote size={20} className={paymentMethod === 'cod' ? 'text-[#8A9A8A]' : 'text-gray-400'} />
                        <div>
                          <span className="text-sm font-medium">Cash on Delivery</span>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Pay when your ritual arrives</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

              <button
                type="submit"
                className="w-full bg-[#1A1A1A] text-white rounded-full py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#3A4A3A] transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
              >
                {paymentMethod === 'cod' ? "Confirm Order" : "Pay Now"} — ₹{total}
              </button>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-sm sticky top-32 border border-black/[0.02]">
              <h3 className="text-lg font-medium mb-8">Summary</h3>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-[#F0F0F0] rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.images?.[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">₹{(item.discountPrice || item.price) * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-black/5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? "text-[#8A9A8A] font-bold uppercase text-[10px]" : ""}>
                    {shipping === 0 ? "Complimentary" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-black/5">
                  <span className="text-base font-medium">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold italic">₹{total}</span>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Inclusive of GST</p>
                  </div>
                </div>
              </div>

              {/* Secure Trust Badges */}
              <div className="mt-10 pt-6 border-t border-black/5 flex flex-col gap-3">
                 <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    <Truck size={14} className="text-[#8A9A8A]" /> Est. Delivery: 2-4 Days
                 </div>
                 <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    <ShieldCheck size={14} className="text-[#8A9A8A]" /> Authenticity Guaranteed
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, Truck, CreditCard, ShieldCheck, Banknote } from "lucide-react";
import api from "../api/api"

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card"); // New state for payment selection
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const orderData = {
    customerName: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    address: formData.address,
    items: cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.discountPrice || item.price,
      quantity: item.quantity,
      image: item.images?.[0]   
    })),
    totalAmount: total,
    paymentMethod
  };

  try {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

    await api.post("/api/orders", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    navigate("/");

  } catch (err) {
    console.error(err);
    alert("Failed to place order");
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartItems(cart);

}, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans pb-20">
      {/* HEADER */}
      <header className="pt-12 pb-8 px-6 md:px-12 lg:px-16 border-b border-black/5 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] hover:text-black transition-colors"
          >
            <ChevronLeft size={14} /> Back to Bag
          </button>
          <h1 className="text-xl font-medium italic tracking-tighter">
            Coral Skin<span className="text-[#8A9A8A]">.</span>
          </h1>
          <div className="flex items-center gap-2 text-gray-400">
            <Lock size={14} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: FORM FIELDS */}
          <div className="lg:col-span-7 space-y-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* 1. Contact Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#8A9A8A] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Contact Information</h2>
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A] transition-colors"
                  onChange={handleInputChange}
                />
              </section>

              {/* 2. Shipping Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#8A9A8A] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input required name="firstName" placeholder="First Name" className="bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                  <input required name="lastName" placeholder="Last Name" className="bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                </div>
                <input required name="address" placeholder="Street Address" className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 mb-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <input required name="city" placeholder="City" className="bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                  <input required name="postalCode" placeholder="Postal Code" className="bg-white border border-black/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8A9A8A]" onChange={handleInputChange} />
                </div>
              </section>

              {/* 3. Payment Method Selection */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#8A9A8A] text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Payment Method</h2>
                </div>
                
                <div className="space-y-3">
                  {/* Card Option */}
                  <label className={`block cursor-pointer border rounded-xl p-5 transition-all ${paymentMethod === 'card' ? 'border-[#8A9A8A] bg-white shadow-sm' : 'border-black/5 bg-white/50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input 
                          type="radio" 
                          name="payment" 
                          className="accent-[#8A9A8A] w-4 h-4" 
                          checked={paymentMethod === 'card'} 
                          onChange={() => setPaymentMethod('card')}
                        />
                        <div className="flex items-center gap-3">
                          <CreditCard size={20} className={paymentMethod === 'card' ? 'text-[#8A9A8A]' : 'text-gray-400'} />
                          <span className="text-sm font-medium">Credit / Debit Card</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-6 h-4 bg-gray-100 rounded" />
                        <div className="w-6 h-4 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </label>

                  {/* COD Option */}
                  <label className={`block cursor-pointer border rounded-xl p-5 transition-all ${paymentMethod === 'cod' ? 'border-[#8A9A8A] bg-white shadow-sm' : 'border-black/5 bg-white/50'}`}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="payment" 
                        className="accent-[#8A9A8A] w-4 h-4" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div className="flex items-center gap-3">
                        <Banknote size={20} className={paymentMethod === 'cod' ? 'text-[#8A9A8A]' : 'text-gray-400'} />
                        <div>
                          <span className="text-sm font-medium">Cash on Delivery</span>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Pay when your ritual arrives</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

              <button
                type="submit"
                className="w-full bg-[#1A1A1A] text-white rounded-full py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#3A4A3A] transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
              >
                {paymentMethod === 'cod' ? "Confirm Order" : "Pay Now"} — ₹{total}
              </button>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-sm sticky top-32 border border-black/[0.02]">
              <h3 className="text-lg font-medium mb-8">Summary</h3>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-[#F0F0F0] rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.images?.[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">₹{(item.discountPrice || item.price) * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-black/5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? "text-[#8A9A8A] font-bold uppercase text-[10px]" : ""}>
                    {shipping === 0 ? "Complimentary" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-black/5">
                  <span className="text-base font-medium">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold italic">₹{total}</span>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Inclusive of GST</p>
                  </div>
                </div>
              </div>

              {/* Secure Trust Badges */}
              <div className="mt-10 pt-6 border-t border-black/5 flex flex-col gap-3">
                 <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    <Truck size={14} className="text-[#8A9A8A]" /> Est. Delivery: 2-4 Days
                 </div>
                 <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    <ShieldCheck size={14} className="text-[#8A9A8A]" /> Authenticity Guaranteed
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default Checkout;