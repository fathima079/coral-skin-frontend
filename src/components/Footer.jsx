import React from "react";
import { Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#FAF9F6] pt-24 pb-12 px-6 md:px-16 font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-12">
          
          {/* Section 1: Brand & Mission */}
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-4xl font-bold tracking-tighter mb-6">
              CORAL<span className="text-[#8A9A8A]">.</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Revolutionizing skincare through botanical science and minimalist rituals. 
              Designed for the modern soul, rooted in the earth.
            </p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-[#8A9A8A] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#8A9A8A] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#8A9A8A] transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] mb-8">Collection</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-[#8A9A8A] transition-all flex items-center gap-1 group">Face Oils <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
              <li><a href="#" className="hover:text-[#8A9A8A] transition-all flex items-center gap-1 group">Cleansers <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
              <li><a href="#" className="hover:text-[#8A9A8A] transition-all flex items-center gap-1 group">Serums <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
              <li><a href="#" className="hover:text-[#8A9A8A] transition-all flex items-center gap-1 group">Sets <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] mb-8">Philosophy</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-[#8A9A8A] transition-all">Our Story</a></li>
              <li><a href="#" className="hover:text-[#8A9A8A] transition-all">Sustainability</a></li>
              <li><a href="#" className="hover:text-[#8A9A8A] transition-all">Journal</a></li>
              <li><a href="#" className="hover:text-[#8A9A8A] transition-all">Contact</a></li>
            </ul>
          </div>

          {/* Section 4: Newsletter - Modern Minimalist Style */}
          <div className="col-span-12 lg:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8A9A8A] mb-8">Newsletter</h4>
            <p className="text-sm text-white/50 mb-6 italic">Join our circle for seasonal rituals and early access.</p>
            
            <form className="relative group">
              <input 
                type="email" 
                placeholder="email@address.com" 
                className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#8A9A8A] transition-colors text-lg placeholder:text-white/10"
              />
              <button className="absolute right-0 bottom-3 text-[10px] uppercase tracking-widest font-bold hover:text-[#8A9A8A] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping Info</a>
          </div>
          
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
            © 2026 CORAL SKINCARE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* Background Decor - Subtle Logo bleed */}
      <div className="absolute bottom-[-10%] right-[-5%] text-[20vw] font-bold text-white/[0.02] select-none pointer-events-none">
        CORAL
      </div>
    </footer>
  );
};

export default Footer;