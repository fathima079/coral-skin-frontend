<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  ShoppingBag, 
  Settings, 
  ShieldCheck,
  ChevronRight 
} from "lucide-react";
import api from "../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:7000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    await api.post("/api/auth/logout", { token: refreshToken });
    
    localStorage.clear();
    
    navigate("/login");  

  } catch (err) {
    console.log(err);
  }
};

  if (!user) return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="animate-pulse text-[#8A9A8A] tracking-widest uppercase text-xs">Loading Ritual...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans pt-32 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold">
            Account Overview
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2D3A3A] mt-2">
            HELLO, <span className="italic font-light text-[#8A9A8A] uppercase">{user.name.split(" ")[0]}.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-2">
            {[
              { icon: <User size={18} />, label: "Personal Info", active: true },
              { icon: <ShoppingBag size={18} />, label: "Order History", active: false },
              { icon: <Settings size={18} />, label: "Settings", active: false },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                  item.active 
                  ? "bg-white shadow-sm border border-black/5 text-[#1A1A1A]" 
                  : "text-gray-400 hover:text-[#8A9A8A]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-sm font-semibold tracking-wide uppercase">{item.label}</span>
                </div>
                {item.active && <ChevronRight size={16} />}
              </button>
            ))}

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-5 rounded-2xl text-red-400 hover:bg-red-50 transition-all mt-10"
            >
              <LogOut size={18} />
              <span className="text-sm font-semibold tracking-wide uppercase">Logout</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
              <h3 className="text-xl font-medium mb-8">Profile Details</h3>
              
              <div className="space-y-8">
                {/* Name Field */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 pb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Full Name</p>
                    <p className="text-lg text-[#2D3A3A]">{user.name}</p>
                  </div>
                  <User className="hidden md:block text-[#8A9A8A]/30" size={24} />
                </div>

                {/* Email Field */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 pb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Email Address</p>
                    <p className="text-lg text-[#2D3A3A]">{user.email}</p>
                  </div>
                  <Mail className="hidden md:block text-[#8A9A8A]/30" size={24} />
                </div>

                {/* Role/Account Type Field */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 pb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Account Tier</p>
                    <p className="text-lg text-[#2D3A3A] capitalize">{user.role} Member</p>
                  </div>
                  <ShieldCheck className="hidden md:block text-[#8A9A8A]/30" size={24} />
                </div>

                {/* Join Date */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Member Since</p>
                    <p className="text-lg text-[#2D3A3A]">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <Calendar className="hidden md:block text-[#8A9A8A]/30" size={24} />
                </div>
              </div>

              {/* Decorative CTA */}
              <div className="mt-12 p-8 bg-[#8A9A8A]/5 rounded-3xl border border-[#8A9A8A]/10">
                <p className="text-[#8A9A8A] text-sm italic italic">
                  "The best skincare routine is the one you stay consistent with."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  ShoppingBag, 
  Settings, 
  ShieldCheck,
  ChevronRight 
} from "lucide-react";
import api from "../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:7000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    await api.post("/api/auth/logout", { token: refreshToken });
    
    localStorage.clear();
    
    navigate("/login");  

  } catch (err) {
    console.log(err);
  }
};

  if (!user) return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="animate-pulse text-[#8A9A8A] tracking-widest uppercase text-xs">Loading Ritual...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans pt-32 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold">
            Account Overview
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2D3A3A] mt-2">
            HELLO, <span className="italic font-light text-[#8A9A8A] uppercase">{user.name.split(" ")[0]}.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-2">
            {[
              { icon: <User size={18} />, label: "Personal Info", active: true },
              { icon: <ShoppingBag size={18} />, label: "Order History", active: false },
              { icon: <Settings size={18} />, label: "Settings", active: false },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                  item.active 
                  ? "bg-white shadow-sm border border-black/5 text-[#1A1A1A]" 
                  : "text-gray-400 hover:text-[#8A9A8A]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-sm font-semibold tracking-wide uppercase">{item.label}</span>
                </div>
                {item.active && <ChevronRight size={16} />}
              </button>
            ))}

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-5 rounded-2xl text-red-400 hover:bg-red-50 transition-all mt-10"
            >
              <LogOut size={18} />
              <span className="text-sm font-semibold tracking-wide uppercase">Logout</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
              <h3 className="text-xl font-medium mb-8">Profile Details</h3>
              
              <div className="space-y-8">
                {/* Name Field */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 pb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Full Name</p>
                    <p className="text-lg text-[#2D3A3A]">{user.name}</p>
                  </div>
                  <User className="hidden md:block text-[#8A9A8A]/30" size={24} />
                </div>

                {/* Email Field */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 pb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Email Address</p>
                    <p className="text-lg text-[#2D3A3A]">{user.email}</p>
                  </div>
                  <Mail className="hidden md:block text-[#8A9A8A]/30" size={24} />
                </div>

                {/* Role/Account Type Field */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 pb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Account Tier</p>
                    <p className="text-lg text-[#2D3A3A] capitalize">{user.role} Member</p>
                  </div>
                  <ShieldCheck className="hidden md:block text-[#8A9A8A]/30" size={24} />
                </div>

                {/* Join Date */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Member Since</p>
                    <p className="text-lg text-[#2D3A3A]">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <Calendar className="hidden md:block text-[#8A9A8A]/30" size={24} />
                </div>
              </div>

              {/* Decorative CTA */}
              <div className="mt-12 p-8 bg-[#8A9A8A]/5 rounded-3xl border border-[#8A9A8A]/10">
                <p className="text-[#8A9A8A] text-sm italic italic">
                  "The best skincare routine is the one you stay consistent with."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default Profile;