import React from "react";
import { ArrowRight, Microscope, Leaf, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] font-sans overflow-x-hidden">
      
      {/* --- MINIMALIST HERO (No Image) --- */}
      <section className="pt-48 pb-32 px-6 md:px-16 max-w-5xl mx-auto text-center">
        <span className="text-[#8A9A8A] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 block">
          Our Philosophy
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-12">
          BIOLOGY <br /> 
          <span className="italic font-light text-[#8A9A8A]">MEETS BOTANY.</span>
        </h1>
        <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Coral Skin was born from a simple observation: the skincare industry was overcomplicating health. We returned to the lab to strip away the noise, focusing on bio-available ingredients that work with your skin, not against it.
            </p>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-24 bg-white border-y border-black/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                icon: <Microscope size={20} strokeWidth={1.5} />,
                title: "Clinical Precision",
                desc: "Every formulation undergoes rigorous testing to ensure molecular efficacy."
              },
              {
                icon: <Leaf size={20} strokeWidth={1.5} />,
                title: "Botanical Integrity",
                desc: "We source cold-pressed extracts to keep the plant's intelligence intact."
              },
              {
                icon: <Globe size={20} strokeWidth={1.5} />,
                title: "Earth First",
                desc: "Glass packaging and FSC-certified paper. Luxury without the footprint."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-[#8A9A8A] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light max-w-[240px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOUNDER STORY (Small Image) --- */}
      <section className="py-32 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* SMALL FOUNDER PHOTO */}
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-10 overflow-hidden rounded-full grayscale border border-black/5 p-1 bg-white">
             <img 
               src="https://burst.shopifycdn.com/photos/fashion-model-looks-at-camera.jpg?width=1000&format=pjpg&exif=0&iptc=0" 
               alt="Founder" 
               className="w-full h-full object-cover rounded-full"
             />
          </div>

          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
            Measured by <span className="italic font-serif">Simplicity.</span>
          </h2>
          
          <div className="space-y-8 text-gray-500 font-light leading-relaxed text-base">
            <p>
              Founded in 2021, Coral Skin began as a research project into skin barrier recovery. Our founder, Dr. Elena Rossi, spent a decade in dermatological research before realizing that the most effective ingredients were already found in nature—they just needed a scientific delivery system.
            </p>
            <p>
              Today, we operate a zero-waste laboratory where we produce small batches of our signature formulations. We are proud to be independent, woman-owned, and 100% transparent about our supply chain.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-black/5 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#1A1A1A]">Elena Rossi</span>
            <span className="text-[10px] text-[#8A9A8A] font-serif italic mt-1">Founder & Lead Chemist</span>
          </div>
        </div>
      </section>

      {/* --- MINIMAL CTA --- */}
      <section className="pb-32 px-6 text-center">
          <div className="h-[1px] w-20 bg-[#8A9A8A] mx-auto mb-12"></div>
          <h2 className="text-2xl font-light mb-10 italic font-serif">Experience the ritual.</h2>
          <div 
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-4 text-[#1A1A1A] text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-2 hover:text-[#8A9A8A] hover:border-[#8A9A8A] transition-all duration-300"
          >
            Shop the Collection
            <ArrowRight size={14} />
          </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-black/5 text-center">
        <p className="text-[9px] uppercase tracking-[0.5em] text-gray-300">
          Coral Skin — Bio-Dynamic Skincare
        </p>
      </footer>
    </div>
  );
};

export default About;