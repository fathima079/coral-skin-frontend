import React from "react";

const CategoryBar = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="px-6 md:px-16 max-w-[1440px] mx-auto mb-10">
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full border text-[11px] uppercase tracking-widest font-bold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg shadow-black/10"
                : "bg-transparent border-black/10 text-black/60 hover:border-[#8A9A8A] hover:text-[#8A9A8A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};