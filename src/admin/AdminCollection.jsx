import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Pencil, Trash2, Plus, Box, Tag } from "lucide-react";

function AdminCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed loading products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item from the collection?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="w-6 h-6 border-2 border-[#8A9A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans p-6 md:p-10">
      <div className="max-w-[1400px] mx-auto">

        {/* COMPACT HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A9A8A] font-bold">
              Inventory Management
            </p>
            <h1 className="text-3xl font-medium mt-1 tracking-tight">
              Collection <span className="italic font-light text-[#8A9A8A]">({products.length})</span>
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold hover:bg-[#3A4A3A] transition-all shadow-lg shadow-black/5"
          >
            <Plus size={14} /> Add New Formula
          </button>
        </div>

        {/* DENSE PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map(product => (
            <div
              key={product._id}
              className="group bg-white border border-black/[0.05] rounded-2xl p-3 hover:border-[#8A9A8A]/50 transition-all duration-300"
            >
              {/* IMAGE - More compact aspect ratio */}
              <div className="relative aspect-square bg-[#FAF9F6] rounded-xl overflow-hidden mb-3">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Minimalist Stock Badge */}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-widest ${product.stock > 0 ? 'bg-white/90 text-gray-500' : 'bg-red-500 text-white'}`}>
                  {product.stock > 0 ? `Qty: ${product.stock}` : 'Out of Stock'}
                </div>
              </div>

              {/* INFO - Smaller Typography */}
              <div className="px-1">
                <p className="text-[9px] uppercase tracking-widest text-[#8A9A8A] font-bold truncate">
                  {product.category}
                </p>

                <h3 className="text-sm font-bold mt-0.5 leading-tight truncate">
                  {product.name}
                </h3>

                <div className="flex justify-between items-baseline mt-3 pb-3 border-b border-black/[0.03]">
                  <span className="text-sm font-bold text-[#1A1A1A]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase font-medium">
                    {product.brand}
                  </span>
                </div>

                {/* ACTION BUTTONS - Icon focused and smaller */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                    className="flex-1 bg-[#FAF9F6] text-[#2D3A3A] py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#8A9A8A]/10 transition-colors"
                  >
                    <Pencil size={12} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="aspect-square bg-white border border-black/5 text-gray-400 py-2 px-3 rounded-lg hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Delete Product"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-black/10">
            <Box className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-sm text-gray-400 font-medium">
              Your collection is currently empty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}