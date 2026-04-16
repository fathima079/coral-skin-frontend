<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { 
  ArrowLeft, Package, User, MapPin, 
  CreditCard, Calendar, Truck, CheckCircle2 
} from "lucide-react";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await api.get(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setOrder(res.data);
        
      } catch (err) {
        console.error("Error fetching order", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#8A9A8A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#8A9A8A] tracking-[0.3em] uppercase text-[10px] font-bold">Loading Details</p>
      </div>
    </div>
  );

  if (!order) return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-gray-500">
      Order not found.
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans p-6 md:p-12 lg:p-16">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP NAVIGATION */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] mb-10 hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </button>

        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-[10px] font-bold">Management Portal</span>
            <h1 className="text-4xl font-medium mt-2 tracking-tight">
              Order <span className="italic font-light text-[#8A9A8A]">#{order._id.slice(-6)}</span>
            </h1>
            <div className="flex items-center gap-6 mt-4 text-gray-400 text-[11px] uppercase tracking-widest font-bold">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-[#8A9A8A]"/> {new Date(order.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#8A9A8A]"/> {order.status}</span>
            </div>
          </div>
          
          <button className="bg-[#1A1A1A] text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#3A4A3A] transition-all shadow-xl shadow-black/5">
            Download Invoice
          </button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: ITEMS & SUMMARY */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ITEMS CARD */}
            <div className="bg-white border border-black/[0.05] rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8 border-b border-black/[0.03] pb-4">
                <Package size={18} className="text-[#8A9A8A]" />
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Consignment Details</h2>
              </div>
              
              <div className="space-y-6">
                {order.items?.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-[#FAF9F6] rounded-xl border border-black/[0.03] overflow-hidden flex-shrink-0">
                         <img 
                          src={item.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200"} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="mt-10 pt-8 border-t border-black/[0.03] space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                  <span>Subtotal</span>
                  <span className="text-[#1A1A1A]">₹{order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                  <span>Shipping</span>
                  <span className="text-[#8A9A8A]">Complimentary</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#1A1A1A] pt-4">
                  <span>Total Amount</span>
                  <span className="text-[#2D3A3A]">₹{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CUSTOMER & LOGISTICS */}
          <div className="space-y-6">
            
            {/* CUSTOMER INFO */}
            <div className="bg-white border border-black/[0.05] rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <User size={18} className="text-[#8A9A8A]" />
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Customer</h2>
              </div>
              <p className="text-sm font-bold">{order.customerName}</p>
              <p className="text-xs text-gray-400 mt-1 lowercase tracking-tight">{order.email || "customer@example.com"}</p>
            </div>

            {/* SHIPPING INFO */}
            <div className="bg-white border border-black/[0.05] rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={18} className="text-[#8A9A8A]" />
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Delivery Address</h2>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                {order.address || "No address provided for this order."}
              </p>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-[#1A1A1A] rounded-2xl p-8 text-white shadow-xl shadow-black/10">
              <div className="flex items-center gap-2 mb-6 opacity-60">
                <CreditCard size={18} />
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Payment Status</h2>
              </div>
              <div className="flex items-end justify-between">
                <div>
                   <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Gateway</p>
                   <p className="text-xs font-bold tracking-widest">RAZORPAY</p>
                </div>
                <span className="text-[10px] font-bold bg-[#8A9A8A] text-white px-3 py-1 rounded-full uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* LOGISTICS TIMELINE */}
        <div className="mt-8 bg-white border border-black/[0.05] rounded-2xl p-8 flex flex-wrap gap-8 items-center justify-center">
           <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
             <Truck size={16} className="text-[#8A9A8A]"/> Processing
           </div>
           <div className="hidden md:block w-16 h-[1px] bg-black/10"></div>
           <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${order.status === 'Shipped' || order.status === 'Delivered' ? 'opacity-100' : 'opacity-30'}`}>
             <CheckCircle2 size={16} className="text-[#8A9A8A]"/> Shipped
           </div>
           <div className="hidden md:block w-16 h-[1px] bg-black/10"></div>
           <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'opacity-100' : 'opacity-30'}`}>
             <CheckCircle2 size={16} className="text-[#8A9A8A]"/> Delivered
           </div>
        </div>

      </div>
    </div>
  );
}

=======
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { 
  ArrowLeft, Package, User, MapPin, 
  CreditCard, Calendar, Truck, CheckCircle2 
} from "lucide-react";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await api.get(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setOrder(res.data);
        
      } catch (err) {
        console.error("Error fetching order", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#8A9A8A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#8A9A8A] tracking-[0.3em] uppercase text-[10px] font-bold">Loading Details</p>
      </div>
    </div>
  );

  if (!order) return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-gray-500">
      Order not found.
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans p-6 md:p-12 lg:p-16">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP NAVIGATION */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] mb-10 hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </button>

        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-[10px] font-bold">Management Portal</span>
            <h1 className="text-4xl font-medium mt-2 tracking-tight">
              Order <span className="italic font-light text-[#8A9A8A]">#{order._id.slice(-6)}</span>
            </h1>
            <div className="flex items-center gap-6 mt-4 text-gray-400 text-[11px] uppercase tracking-widest font-bold">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-[#8A9A8A]"/> {new Date(order.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#8A9A8A]"/> {order.status}</span>
            </div>
          </div>
          
          <button className="bg-[#1A1A1A] text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#3A4A3A] transition-all shadow-xl shadow-black/5">
            Download Invoice
          </button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: ITEMS & SUMMARY */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ITEMS CARD */}
            <div className="bg-white border border-black/[0.05] rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8 border-b border-black/[0.03] pb-4">
                <Package size={18} className="text-[#8A9A8A]" />
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Consignment Details</h2>
              </div>
              
              <div className="space-y-6">
                {order.items?.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-[#FAF9F6] rounded-xl border border-black/[0.03] overflow-hidden flex-shrink-0">
                         <img 
                          src={item.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200"} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="mt-10 pt-8 border-t border-black/[0.03] space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                  <span>Subtotal</span>
                  <span className="text-[#1A1A1A]">₹{order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                  <span>Shipping</span>
                  <span className="text-[#8A9A8A]">Complimentary</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#1A1A1A] pt-4">
                  <span>Total Amount</span>
                  <span className="text-[#2D3A3A]">₹{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CUSTOMER & LOGISTICS */}
          <div className="space-y-6">
            
            {/* CUSTOMER INFO */}
            <div className="bg-white border border-black/[0.05] rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <User size={18} className="text-[#8A9A8A]" />
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Customer</h2>
              </div>
              <p className="text-sm font-bold">{order.customerName}</p>
              <p className="text-xs text-gray-400 mt-1 lowercase tracking-tight">{order.email || "customer@example.com"}</p>
            </div>

            {/* SHIPPING INFO */}
            <div className="bg-white border border-black/[0.05] rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={18} className="text-[#8A9A8A]" />
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Delivery Address</h2>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                {order.address || "No address provided for this order."}
              </p>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-[#1A1A1A] rounded-2xl p-8 text-white shadow-xl shadow-black/10">
              <div className="flex items-center gap-2 mb-6 opacity-60">
                <CreditCard size={18} />
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Payment Status</h2>
              </div>
              <div className="flex items-end justify-between">
                <div>
                   <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Gateway</p>
                   <p className="text-xs font-bold tracking-widest">RAZORPAY</p>
                </div>
                <span className="text-[10px] font-bold bg-[#8A9A8A] text-white px-3 py-1 rounded-full uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* LOGISTICS TIMELINE */}
        <div className="mt-8 bg-white border border-black/[0.05] rounded-2xl p-8 flex flex-wrap gap-8 items-center justify-center">
           <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
             <Truck size={16} className="text-[#8A9A8A]"/> Processing
           </div>
           <div className="hidden md:block w-16 h-[1px] bg-black/10"></div>
           <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${order.status === 'Shipped' || order.status === 'Delivered' ? 'opacity-100' : 'opacity-30'}`}>
             <CheckCircle2 size={16} className="text-[#8A9A8A]"/> Shipped
           </div>
           <div className="hidden md:block w-16 h-[1px] bg-black/10"></div>
           <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'opacity-100' : 'opacity-30'}`}>
             <CheckCircle2 size={16} className="text-[#8A9A8A]"/> Delivered
           </div>
        </div>

      </div>
    </div>
  );
}

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default OrderDetails;