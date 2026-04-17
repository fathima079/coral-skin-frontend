import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Package, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setOrders(res.data);
        
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };
    loadOrders();
  }, []);

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-[#8A9A8A]/10 text-[#2D3A3A]";
      case "pending": return "bg-yellow-50 text-yellow-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Fixed: Navigates to the route defined in your App.js
  const handleViewDetails = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-8">
          <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-[10px] font-bold">
            Admin Dashboard
          </span>
          <h1 className="text-3xl font-medium mt-1 tracking-tight">
            Orders <span className="italic font-light text-[#8A9A8A] text-2xl">({orders.length})</span>
          </h1>
        </header>

        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              // Added click handler to the whole card
              onClick={() => handleViewDetails(order._id)}
              className="group bg-white border border-black/[0.05] rounded-xl hover:border-[#8A9A8A]/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Customer Info */}
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="h-9 w-9 bg-[#FAF9F6] rounded-full flex items-center justify-center text-[#8A9A8A]">
                      <User size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight">{order.customerName}</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">#{order._id.slice(-6)}</p>
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div className="flex-1 border-t md:border-t-0 md:border-x border-black/[0.03] px-0 md:px-6 py-2 md:py-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Package size={12} className="text-[#8A9A8A]" />
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Items</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {order.items?.map((item, idx) => (
                        <span key={idx} className="text-xs text-gray-600">
                          {item.name} <span className="text-gray-400 font-light">×{item.quantity}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Status */}
                  <div className="flex items-center justify-between md:justify-end gap-6 min-w-[180px]">
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Total</p>
                      <p className="text-base font-bold text-[#2D3A3A]">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold border border-black/5 ${getStatusStyles(order.status)}`}>
                        {order.status}
                      </span>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-[#8A9A8A] transition-colors" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;