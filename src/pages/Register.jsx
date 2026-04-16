import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, User, Sparkles } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:7000/api/auth/register", formData);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans flex flex-col items-center px-6 pt-32 pb-20">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold flex items-center justify-center gap-2">
            <Sparkles size={14} /> Join the Ritual
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2D3A3A] mt-4">
            CREATE <br />
            <span className="italic font-light text-[#8A9A8A]">ACCOUNT.</span>
          </h1>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            Experience high-performance skincare designed for your biology.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 md:p-10 rounded-[30px] shadow-sm border border-black/5">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-[#FAF9F6] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8A9A8A] outline-none transition-all text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF9F6] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8A9A8A] outline-none transition-all text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F6] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8A9A8A] outline-none transition-all text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-7 py-4 rounded-full hover:bg-[#3A4A3A] transition-all duration-500 mt-4 disabled:opacity-70"
            >
              <span className="text-xs tracking-widest uppercase font-semibold">
                {loading ? "Creating Account..." : "Join Coral Skin"}
              </span>
              {!loading && (
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already a member?{" "}
              <button 
                onClick={() => navigate("/login")}
                className="text-[#1A1A1A] font-bold underline underline-offset-4 hover:text-[#8A9A8A] transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Decorative Brand Text */}
        <p className="mt-12 text-center text-[8vw] md:text-[4vw] font-bold text-black/5 select-none uppercase">
          Pure Essence
        </p>
      </div>
    </div>
  );
}

export default Register;