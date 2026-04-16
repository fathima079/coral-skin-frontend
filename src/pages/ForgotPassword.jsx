import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await api.post("/api/auth/forgot-password", { email });
      // We show the message and clear the input so the user knows to check their inbox
      setMessage(data.message || "A secure link has been sent to your email.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans flex flex-col pt-32 md:pt-40">
      <div className="flex-1 px-6">
        <div className="w-full max-w-xl mx-auto">
          
          {/* Header - Matching Home Hero Style */}
          <div className="mb-12">
            <h1 className="text-[12vw] sm:text-[5rem] leading-[0.9] font-bold tracking-tight text-[#2D3A3A]">
              RECOVER <br />
              <span className="italic font-light text-[#8A9A8A]">
                ACCESS.
              </span>
            </h1>
            <p className="mt-6 text-base text-[#555] max-w-sm leading-relaxed">
              Enter your registered email below. We will send a secure link to reset your password.
            </p>
          </div>

          {/* Feedback Messages */}
          {message && (
            <div className="mb-8 p-5 bg-white border border-[#8A9A8A]/20 rounded-2xl text-[#2D3A3A] text-sm italic shadow-sm animate-fade-in">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm italic shadow-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#8A9A8A] outline-none transition-all duration-500 placeholder:text-gray-300 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <Mail className="absolute right-0 top-4 text-gray-300 group-focus-within:text-[#8A9A8A] transition-colors" size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 rounded-full hover:bg-[#3A4A3A] transition-all duration-500 disabled:opacity-50"
            >
              <span className="text-xs tracking-widest uppercase">
                {loading ? "Sending..." : "Send Reset Link"}
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
              className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-black transition-colors flex items-center gap-2"
            >
              <span>←</span> Back to Login
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
}