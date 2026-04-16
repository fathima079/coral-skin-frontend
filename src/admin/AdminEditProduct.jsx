import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../api/api";
import { 
  Plus, Trash2, ArrowLeft, RefreshCcw, 
  Sparkles, Droplets, Image as ImageIcon, Check 
} from 'lucide-react';

function AdminEditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "cleanser",
        price: "",
        discountPrice: "",
        stock: 0,
        isFeatured: false,
        isNew: false,
        isBestSeller: false,
        description: "",
        howToUse: ""
    });

    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [skinType, setSkinType] = useState([]);
    const [concerns, setConcerns] = useState([]);

    const skinOptions = ["dry", "oily", "combination", "sensitive", "normal"];
    const concernOptions = ["acne", "aging", "pigmentation", "hydration", "dullness"];

    // Stylized Classes
    const inputClasses = "w-full bg-[#FAF9F6] border-black/[0.05] border rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#8A9A8A]/50 transition-all placeholder:text-gray-300";
    const labelClasses = "text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] mb-2 block";
    const sectionHeader = "flex items-center gap-2 pb-4 mb-6 border-b border-black/[0.03]";

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/api/products/${id}`);
                const p = res.data;
                setFormData({
                    name: p.name,
                    brand: p.brand,
                    category: p.category,
                    price: p.price,
                    discountPrice: p.discountPrice || "",
                    stock: p.stock,
                    isFeatured: p.isFeatured,
                    isNew: p.isNew,
                    isBestSeller: p.isBestSeller,
                    description: p.description,
                    howToUse: p.howToUse
                });
                setVariants(p.variants || []);
                setImages(p.images || [""]);
                setIngredients(p.ingredients || [""]);
                setBenefits(p.benefits || [""]);
                setSkinType(p.skinType || []);
                setConcerns(p.concerns || []);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load product", err);
                alert("Error loading product data");
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const toggleArrayValue = (value, array, setter) => {
        if (array.includes(value)) {
            setter(array.filter(i => i !== value));
        } else {
            setter([...array, value]);
        }
    };

    const updateField = (i, value, setter, state) => {
        const copy = [...state];
        copy[i] = value;
        setter(copy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            price: Number(formData.price),
            discountPrice: Number(formData.discountPrice),
            stock: Number(formData.stock),
            variants,
            images: images.filter(Boolean),
            ingredients: ingredients.filter(Boolean),
            benefits: benefits.filter(Boolean),
            skinType,
            concerns
        };

        try {
            await api.put(`/api/products/${id}`, payload);
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            alert("Failed to update product");
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#8A9A8A]" size={24} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] p-6 md:p-12 lg:p-16">
            <div className="max-w-4xl mx-auto">
                
                <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] mb-8">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Discard Changes
                </button>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/[0.03]">
                    <header className="mb-10">
                        <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-[10px] font-bold">Product ID: {id.slice(-6)}</span>
                        <h1 className="text-3xl font-medium mt-1 tracking-tight">Edit <span className="italic font-light text-[#8A9A8A]">Formula.</span></h1>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        
                        {/* BASIC INFORMATION */}
                        <section>
                            <div className={sectionHeader}>
                                <Sparkles size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">General Details</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>Product Name</label>
                                    <input name="name" value={formData.name} className={inputClasses} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClasses}>Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className={inputClasses}>
                                        <option>cleanser</option>
                                        <option>serum</option>
                                        <option>moisturizer</option>
                                        <option>sunscreen</option>
                                        <option>toner</option>
                                        <option>mask</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClasses}>Price (₹)</label>
                                        <input name="price" value={formData.price} type="number" className={inputClasses} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Stock</label>
                                        <input name="stock" value={formData.stock} type="number" className={inputClasses} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* COMPATIBILITY SECTION */}
                        <section className="grid md:grid-cols-2 gap-12">
                            <div>
                                <label className={labelClasses}>Skin Types</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {skinOptions.map(s => (
                                        <button 
                                            key={s} type="button"
                                            onClick={() => toggleArrayValue(s, skinType, setSkinType)}
                                            className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all ${skinType.includes(s) ? 'bg-[#8A9A8A] text-white border-[#8A9A8A]' : 'bg-transparent text-gray-400 border-black/10 hover:border-[#8A9A8A]'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Concerns</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {concernOptions.map(c => (
                                        <button 
                                            key={c} type="button"
                                            onClick={() => toggleArrayValue(c, concerns, setConcerns)}
                                            className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all ${concerns.includes(c) ? 'bg-[#2D3A3A] text-white border-[#2D3A3A]' : 'bg-transparent text-gray-400 border-black/10 hover:border-[#2D3A3A]'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* IMAGES SECTION */}
                        <section>
                            <div className={sectionHeader}>
                                <ImageIcon size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Product Imagery</h2>
                            </div>
                            {images.map((val, i) => (
                                <div key={i} className="flex gap-2 mb-3 items-center">
                                    <div className="w-12 h-12 rounded-lg bg-[#FAF9F6] border border-black/5 overflow-hidden flex-shrink-0">
                                        {val && <img src={val} alt="preview" className="w-full h-full object-cover" />}
                                    </div>
                                    <input value={val} placeholder="Image URL" className={inputClasses} onChange={(e) => updateField(i, e.target.value, setImages, images)} />
                                    <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="p-2 text-red-300 hover:text-red-500"><Trash2 size={16}/></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => setImages([...images, ""])} className="text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] flex items-center gap-2 mt-2">
                                <Plus size={14} /> Add Gallery Image
                            </button>
                        </section>

                        {/* DESCRIPTION SECTION */}
                        <section className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Description</label>
                                <textarea name="description" value={formData.description} className={`${inputClasses} h-32 resize-none`} onChange={handleChange} />
                            </div>
                            <div>
                                <label className={labelClasses}>Application Ritual</label>
                                <textarea name="howToUse" value={formData.howToUse} className={`${inputClasses} h-32 resize-none`} onChange={handleChange} />
                            </div>
                        </section>

                        {/* BOTTOM BAR */}
                        <section className="pt-8 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex gap-8">
                                {["isFeatured", "isNew", "isBestSeller"].map(tag => (
                                    <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name={tag} checked={formData[tag]} className="sr-only peer" onChange={handleChange} />
                                        <div className="w-5 h-5 border-2 border-black/10 rounded-md peer-checked:bg-[#8A9A8A] peer-checked:border-[#8A9A8A] transition-all flex items-center justify-center">
                                            {formData[tag] && <Check size={12} className="text-white" />}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-[#1A1A1A] transition-colors">{tag.replace("is", "")}</span>
                                    </label>
                                ))}
                            </div>

                            <button className="w-full md:w-auto bg-[#1A1A1A] text-white px-12 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-[#3A4A3A] transition-all shadow-xl shadow-black/10">
                                Update Collection
                            </button>
                        </section>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminEditProduct;