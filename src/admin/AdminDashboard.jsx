import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/productapi";
import { useNavigate } from "react-router-dom";
import { 
  Compass, 
  Plus, 
  ShoppingBag, 
  Layers, 
  ChevronRight, 
  Search, 
  Zap,
  MoreHorizontal,
  LogOut
} from "lucide-react";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.data || data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    loadProducts();
  }, []);

  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ FIXED NavItem
  const NavItem = ({ icon, label, active, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300
          ${
            active
              ? "bg-black text-white shadow-sm"
              : "text-gray-500 hover:bg-[#F5F5F5] hover:text-black"
          }`}
      >
        <span className="opacity-80">{icon}</span>
        <span className="text-sm font-medium hidden lg:block">{label}</span>
      </div>
    );
  };

  // ✅ FIXED StatBox
  const StatBox = ({ label, value, detail }) => {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
          {label}
        </p>
        <h2 className="text-3xl font-semibold">{value}</h2>
        <p className="text-xs text-gray-400">{detail}</p>
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
      <div className="w-5 h-5 bg-[#8A9A8A] rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] flex">
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 border-r border-black/5 bg-white flex flex-col items-center lg:items-start py-10 sticky top-0 h-screen">
        <div className="px-8 mb-16">
          <h1 className="text-2xl font-bold tracking-tighter italic hidden lg:block">
            C<span className="text-[#8A9A8A]">.</span>
          </h1>
          <div className="w-8 h-8 bg-[#1A1A1A] rounded-full lg:hidden" />
        </div>

        <nav className="flex-1 w-full px-4 space-y-8">
          <div className="space-y-2">
            <p className="hidden lg:block text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold px-4 mb-4">
              Main
            </p>
            <NavItem icon={<Compass size={20}/>} label="Overview" active />
            <NavItem icon={<ShoppingBag size={20}/>} label="Orders" onClick={() => navigate("/admin/orders")} />
          </div>

          <div className="space-y-2">
            <p className="hidden lg:block text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold px-4 mb-4">
              Inventory
            </p>
            <NavItem icon={<Layers size={20}/>} label="Collection" onClick={() => navigate("/admin/products")} />
            <NavItem icon={<Plus size={20}/>} label="Add New" onClick={() => navigate("/admin/add-product")} />
          </div>
        </nav>

        <div className="px-6 w-full space-y-4">
          <div className="bg-[#FAF9F6] p-4 rounded-2xl hidden lg:block">
            <p className="text-[10px] font-bold uppercase tracking-tight">
              System Status
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-gray-500">Live & Secure</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-50 transition-all"
          >
            <LogOut size={20}/>
            <span className="text-sm font-medium hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 lg:px-12 px-6 py-10">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
              Studio Workspace
            </h2>
            <p className="text-2xl font-medium mt-1">
              Welcome back, Admin
            </p>
          </div>

          <div className="bg-white border border-black/5 rounded-full px-4 py-2 flex items-center gap-3">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm focus:outline-none"
            />
          </div>
        </header>

        {/* STATS */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20 border-b border-black/5 pb-16">
          <StatBox label="Active Products" value={products.length} detail="All items" />
          <StatBox label="Total Stock" value={totalStock} detail="Units available" />
          <StatBox label="Revenue" value="₹84.2k" detail="This month" />

          <button 
            onClick={() => navigate("/admin/add-product")}
            className="bg-black text-white p-6 rounded-3xl flex items-center justify-between hover:bg-[#3A4A3A]"
          >
            <span className="text-xs uppercase font-bold">New Product</span>
            <Zap size={18}/>
          </button>
        </section>

        {/* PRODUCTS */}
        <section>
          <div className="flex justify-between mb-8">
            <h3 className="text-xl italic">
              Latest Products<span className="text-[#8A9A8A]">.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.slice(-3).map((p) => (
              <div key={p._id} className="bg-white p-6 rounded-3xl">
                <img
                  src={p.images?.[0]}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h4 className="font-medium">{p.name}</h4>
                <p className="text-sm text-gray-400">{p.category}</p>
                <p className="mt-2 font-bold">₹{p.price}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;