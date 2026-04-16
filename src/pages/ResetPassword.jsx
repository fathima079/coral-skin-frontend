<<<<<<< HEAD
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    try {
      await api.post(`/api/auth/reset-password/${token}`, { password });
      // Navigate to login with a success state
      navigate("/login", { state: { message: "Your password has been reset successfully." } });
    } catch (err) {
      setError(err.response?.data?.message || "This link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans flex flex-col pt-32 md:pt-40">
      <div className="flex-1 px-6">
        <div className="w-full max-w-xl mx-auto">
          
          {/* Header - Matching Home/Forgot Style */}
          <div className="mb-12">
            <h1 className="text-[12vw] sm:text-[5rem] leading-[0.9] font-bold tracking-tight text-[#2D3A3A]">
              NEW <br />
              <span className="italic font-light text-[#8A9A8A]">
                START.
              </span>
            </h1>
            <p className="mt-6 text-base text-[#555] max-w-sm leading-relaxed">
              Create a strong new password to secure your account.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm italic shadow-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] mb-2 block">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#8A9A8A] outline-none transition-all duration-500 placeholder:text-gray-300 text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Lock className="absolute right-0 top-4 text-gray-300 group-focus-within:text-[#8A9A8A] transition-colors" size={20} />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#8A9A8A] outline-none transition-all duration-500 placeholder:text-gray-300 text-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <ShieldCheck className="absolute right-0 top-4 text-gray-300 group-focus-within:text-[#8A9A8A] transition-colors" size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 rounded-full hover:bg-[#3A4A3A] transition-all duration-500 disabled:opacity-50"
            >
              <span className="text-xs tracking-widest uppercase">
                {loading ? "Updating..." : "Update Password"}
              </span>
              {!loading && (
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              )}
            </button>
          </form>

          {/* Navigation Link */}
          <div className="mt-16 pt-8 border-t border-black/5">
            <button
              onClick={() => navigate("/login")}
              className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-black transition-colors"
            >
              Cancel and Return to Login
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="py-12 text-center mt-auto">
        <h2 className="text-[10vw] font-bold text-black/5 select-none tracking-widest uppercase">
          CORAL SKIN
        </h2>
      </footer>
    </div>
  );
=======
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    try {
      await api.post(`/api/auth/reset-password/${token}`, { password });
      // Navigate to login with a success state
      navigate("/login", { state: { message: "Your password has been reset successfully." } });
    } catch (err) {
      setError(err.response?.data?.message || "This link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans flex flex-col pt-32 md:pt-40">
      <div className="flex-1 px-6">
        <div className="w-full max-w-xl mx-auto">
          
          {/* Header - Matching Home/Forgot Style */}
          <div className="mb-12">
            <h1 className="text-[12vw] sm:text-[5rem] leading-[0.9] font-bold tracking-tight text-[#2D3A3A]">
              NEW <br />
              <span className="italic font-light text-[#8A9A8A]">
                START.
              </span>
            </h1>
            <p className="mt-6 text-base text-[#555] max-w-sm leading-relaxed">
              Create a strong new password to secure your account.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm italic shadow-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] mb-2 block">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#8A9A8A] outline-none transition-all duration-500 placeholder:text-gray-300 text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Lock className="absolute right-0 top-4 text-gray-300 group-focus-within:text-[#8A9A8A] transition-colors" size={20} />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#8A9A8A] outline-none transition-all duration-500 placeholder:text-gray-300 text-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <ShieldCheck className="absolute right-0 top-4 text-gray-300 group-focus-within:text-[#8A9A8A] transition-colors" size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 rounded-full hover:bg-[#3A4A3A] transition-all duration-500 disabled:opacity-50"
            >
              <span className="text-xs tracking-widest uppercase">
                {loading ? "Updating..." : "Update Password"}
              </span>
              {!loading && (
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              )}
            </button>
          </form>

          {/* Navigation Link */}
          <div className="mt-16 pt-8 border-t border-black/5">
            <button
              onClick={() => navigate("/login")}
              className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-black transition-colors"
            >
              Cancel and Return to Login
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="py-12 text-center mt-auto">
        <h2 className="text-[10vw] font-bold text-black/5 select-none tracking-widest uppercase">
          CORAL SKIN
        </h2>
      </footer>
    </div>
  );
>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
}