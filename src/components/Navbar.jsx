import React, { useState, useEffect } from "react";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SearchOverlay from "./SearchOverlay"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    setCartCount(count);
    }

    window.addEventListener("cartUpdated", updateCart);
    updateCart();

    return () => window.removeEventListener("cartUpdated", updateCart);
    
  },[])

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if(token) {
      navigate("/profile")
    }else { 
      navigate("/login")
    }
  }

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"}`}>
        <div className="bg-[#1A1A1A] text-[#FAF9F6] text-[10px] py-2 tracking-[0.3em] uppercase text-center font-bold">
          Complimentary samples with every order
        </div>
      </div>

      <header className={`fixed inset-x-0 z-40 transition-all duration-500 ${isScrolled ? "bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm py-4 top-0" : "bg-transparent py-6 top-[30px]"}`}>
        <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-10 flex items-center justify-between">

          <nav className="hidden md:flex items-center gap-8 min-w-[180px]">
            <Link to="/products" className="text-[11px] font-bold tracking-[0.2em] uppercase hover:text-[#8A9A8A] transition-colors">Shop</Link>
            <Link to="/about" className="text-[11px] font-bold tracking-[0.2em] uppercase hover:text-[#8A9A8A] transition-colors">Our Story</Link>
          </nav>

          <Link to="/" className="flex-shrink-0 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.05em] text-[#1A1A1A]">
              CORAL<span className="text-[#8A9A8A]">.</span>
            </h1>
          </Link>

          <div className="flex items-center justify-end gap-4 sm:gap-6 min-w-[140px]">
            
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center gap-2 cursor-pointer hover:text-[#8A9A8A] transition-colors"
            >
              <span className="hidden lg:block text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Search
              </span>
              <Search size={20} strokeWidth={1.5} />
            </div>

            <User
              onClick={handleProfileClick}
              className="hidden md:block hover:text-[#8A9A8A] transition-colors cursor-pointer"
              size={20}
              strokeWidth={1.5}
            />

            <Link to="/cart" className="relative hover:text-[#8A9A8A] transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-[#8A9A8A] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
            </Link>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}><Menu size={24} /></button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 bg-[#FAF9F6] z-[70] transform transition-transform duration-500 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-6"><button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button></div>
        <nav className="flex flex-col items-center gap-10 mt-20">
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-bold tracking-tight">SHOP</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-bold tracking-tight text-[#8A9A8A]">STORY</Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;