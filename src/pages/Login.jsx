import React, { useState } from "react";
import api from "../api/api"
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, Sparkles } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const res = await api.post("api/auth/login", {
          email,
          password
        });

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans flex flex-col items-center px-6 pt-32 md:pt-40 pb-20">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-xs font-bold flex items-center justify-center gap-2">
            <Sparkles size={14} /> Welcome Back
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2D3A3A] mt-4">
            LOG <span className="italic font-light text-[#8A9A8A]">IN.</span>
          </h1>
          <p className="mt-4 text-gray-500 text-sm">
            Access your personalized skincare ritual.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 md:p-10 rounded-[30px] shadow-sm border border-black/5">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF9F6] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8A9A8A] outline-none transition-all text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input Group */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F6] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8A9A8A] outline-none transition-all text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Forgot Password Button - Positioned Below Input */}
              <div className="flex justify-end px-1">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] hover:text-[#1A1A1A] transition-colors duration-300"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-7 py-4 rounded-full hover:bg-[#3A4A3A] transition-all duration-500 mt-4 disabled:opacity-70"
            >
              <span className="text-xs tracking-widest uppercase font-semibold">
                {loading ? "Authenticating..." : "Sign In"}
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
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/register")}
                className="text-[#1A1A1A] font-bold underline underline-offset-4 hover:text-[#8A9A8A] transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        {/* Decorative Brand Text */}
        <p className="mt-12 text-center text-[8vw] md:text-[4vw] font-bold text-black/5 select-none">
          CORAL SKIN
        </p>
      </div>
    </div>
  );
}

export default Login;