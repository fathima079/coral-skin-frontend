<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/api";
import { Plus, Trash2, ArrowLeft, Save, Sparkles, Beaker, BarChart3, Layers, ImageIcon } from 'lucide-react';

function AdminAddProducts() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        brand: "", // Added Brand
        category: "cleanser",
        price: "",
        discountPrice: "",
        stock: 0,
        rating: 0,
        reviewCount: 0,
        isFeatured: false,
        isNew: false,
        isBestSeller: false,
        description: "",
        howToUse: ""
    });

    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([""]);
    const [ingredients, setIngredients] = useState([""]);
    const [benefits, setBenefits] = useState([""]);
    const [skinType, setSkinType] = useState([]);
    const [concerns, setConcerns] = useState([]);

    const skinOptions = ["dry", "oily", "combination", "sensitive", "normal"];
    const concernOptions = ["acne", "aging", "pigmentation", "hydration", "dullness"];

    const inputClasses = "w-full bg-[#FAF9F6] border-black/[0.05] border rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#8A9A8A]/50 transition-all placeholder:text-gray-300";
    const labelClasses = "text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] mb-2 block";
    const sectionHeader = "flex items-center gap-2 pb-4 mb-6 border-b border-black/[0.03]";

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

    const addField = (setter, state) => setter([...state, ""]);
    const removeField = (index, setter, state) => setter(state.filter((_, i) => i !== index));
    const updateField = (i, value, setter, state) => {
        const copy = [...state];
        copy[i] = value;
        setter(copy);
    };

    const addVariant = () => setVariants([...variants, { size: "", price: "", stock: "" }]);
    const updateVariant = (index, key, value) => {
        const copy = [...variants];
        copy[index][key] = value;
        setVariants(copy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            price: Number(formData.price),
            discountPrice: Number(formData.discountPrice),
            stock: Number(formData.stock),
            rating: Number(formData.rating),
            reviewCount: Number(formData.reviewCount),
            variants: variants.filter(v => v.size),
            images: images.filter(Boolean),
            ingredients: ingredients.filter(Boolean),
            benefits: benefits.filter(Boolean),
            skinType,
            concerns
        };

        try {
            await api.post("/api/products", payload);
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            alert("Failed to add product");
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                
                <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] mb-8 hover:text-[#1A1A1A] transition-colors">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </button>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/[0.03]">
                    <header className="mb-10">
                        <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-[10px] font-bold">Inventory Control</span>
                        <h1 className="text-3xl font-medium mt-1 tracking-tight">Add New <span className="italic font-light text-[#8A9A8A]">Formula.</span></h1>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        
                        {/* BASIC INFO + BRAND */}
                        <section>
                            <div className={sectionHeader}>
                                <Sparkles size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Core Identity</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-1">
                                    <label className={labelClasses}>Product Name</label>
                                    <input name="name" placeholder="e.g. Squalane Cleanser" className={inputClasses} onChange={handleChange} required />
                                </div>
                                <div className="md:col-span-1">
                                    <label className={labelClasses}>Brand Name</label>
                                    <input name="brand" placeholder="e.g. Coral Skin" className={inputClasses} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClasses}>Category</label>
                                    <select name="category" onChange={handleChange} className={inputClasses}>
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
                                        <label className={labelClasses}>Standard Price (₹)</label>
                                        <input name="price" type="number" className={inputClasses} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Discount Price</label>
                                        <input name="discountPrice" type="number" className={inputClasses} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* STATS: STOCK, RATING, REVIEW COUNT */}
                        <section>
                            <div className={sectionHeader}>
                                <BarChart3 size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Technical Stats</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <label className={labelClasses}>Initial Stock</label>
                                    <input name="stock" type="number" className={inputClasses} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Rating (0-5)</label>
                                    <input name="rating" type="number" step="0.1" placeholder="4.8" className={inputClasses} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Reviews</label>
                                    <input name="reviewCount" type="number" placeholder="24" className={inputClasses} onChange={handleChange} />
                                </div>
                            </div>
                        </section>

                        {/* VARIANTS (SIZE/PRICE/STOCK) */}
                        <section>
                            <div className={sectionHeader}>
                                <Layers size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Size Variants</h2>
                            </div>
                            <div className="space-y-4">
                                {variants.map((v, i) => (
                                    <div key={i} className="flex gap-4 items-end bg-[#FAF9F6]/50 p-4 rounded-2xl border border-black/[0.02]">
                                        <div className="flex-1">
                                            <input placeholder="Size (e.g. 100ml)" className={inputClasses} onChange={(e) => updateVariant(i, "size", e.target.value)} />
                                        </div>
                                        <div className="w-24">
                                            <input type="number" placeholder="Price" className={inputClasses} onChange={(e) => updateVariant(i, "price", e.target.value)} />
                                        </div>
                                        <div className="w-24">
                                            <input type="number" placeholder="Stock" className={inputClasses} onChange={(e) => updateVariant(i, "stock", e.target.value)} />
                                        </div>
                                        <button type="button" onClick={() => removeField(i, setVariants, variants)} className="p-3 text-red-300 hover:text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addVariant} className="text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] flex items-center gap-2">
                                    <Plus size={14} /> Add Volume Option
                                </button>
                            </div>
                        </section>

                        {/* INGREDIENTS */}
                        <section>
                            <div className={sectionHeader}>
                                <Beaker size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Ingredients List</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                {ingredients.map((val, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input value={val} placeholder="e.g. Salicylic Acid 2%" className={inputClasses} onChange={(e) => updateField(i, e.target.value, setIngredients, ingredients)} />
                                        <button type="button" onClick={() => removeField(i, setIngredients, ingredients)} className="p-2 text-red-200 hover:text-red-500"><Trash2 size={14}/></button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => addField(setIngredients, ingredients)} className="text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] flex items-center gap-2 mt-4">
                                <Plus size={14} /> Add Ingredient
                            </button>
                        </section>

                        {/* IMAGES & DESCRIPTIONS */}
                        <section className="space-y-8">
                            <div>
                                <div className={sectionHeader}>
                                    <ImageIcon size={16} className="text-[#8A9A8A]" />
                                    <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Gallery URLs</h2>
                                </div>
                                {images.map((val, i) => (
                                    <div key={i} className="flex gap-2 mb-3">
                                        <input value={val} placeholder="Image Link" className={inputClasses} onChange={(e) => updateField(i, e.target.value, setImages, images)} />
                                        <button type="button" onClick={() => removeField(i, setImages, images)} className="p-3 text-red-300"><Trash2 size={18}/></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addField(setImages, images)} className="text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] flex items-center gap-2">
                                    <Plus size={14} /> Add Image Slot
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>Story/Description</label>
                                    <textarea name="description" className={`${inputClasses} h-32 resize-none`} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Usage Ritual</label>
                                    <textarea name="howToUse" className={`${inputClasses} h-32 resize-none`} onChange={handleChange} />
                                </div>
                            </div>
                        </section>

                        {/* SUBMIT */}
                        <footer className="pt-8 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex gap-8">
                                {["isFeatured", "isNew", "isBestSeller"].map(tag => (
                                    <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name={tag} className="sr-only peer" onChange={handleChange} />
                                        <div className="w-5 h-5 border-2 border-black/10 rounded-md peer-checked:bg-[#8A9A8A] peer-checked:border-[#8A9A8A] transition-all"></div>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-[#1A1A1A]">{tag.replace("is", "")}</span>
                                    </label>
                                ))}
                            </div>

                            <button className="w-full md:w-auto bg-[#1A1A1A] text-white px-12 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-[#3A4A3A] transition-all shadow-xl shadow-black/10">
                                <Save size={16} /> Save Formula
                            </button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
}

=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/api";
import { Plus, Trash2, ArrowLeft, Save, Sparkles, Beaker, BarChart3, Layers, ImageIcon } from 'lucide-react';

function AdminAddProducts() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        brand: "", // Added Brand
        category: "cleanser",
        price: "",
        discountPrice: "",
        stock: 0,
        rating: 0,
        reviewCount: 0,
        isFeatured: false,
        isNew: false,
        isBestSeller: false,
        description: "",
        howToUse: ""
    });

    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([""]);
    const [ingredients, setIngredients] = useState([""]);
    const [benefits, setBenefits] = useState([""]);
    const [skinType, setSkinType] = useState([]);
    const [concerns, setConcerns] = useState([]);

    const skinOptions = ["dry", "oily", "combination", "sensitive", "normal"];
    const concernOptions = ["acne", "aging", "pigmentation", "hydration", "dullness"];

    const inputClasses = "w-full bg-[#FAF9F6] border-black/[0.05] border rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#8A9A8A]/50 transition-all placeholder:text-gray-300";
    const labelClasses = "text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A9A8A] mb-2 block";
    const sectionHeader = "flex items-center gap-2 pb-4 mb-6 border-b border-black/[0.03]";

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

    const addField = (setter, state) => setter([...state, ""]);
    const removeField = (index, setter, state) => setter(state.filter((_, i) => i !== index));
    const updateField = (i, value, setter, state) => {
        const copy = [...state];
        copy[i] = value;
        setter(copy);
    };

    const addVariant = () => setVariants([...variants, { size: "", price: "", stock: "" }]);
    const updateVariant = (index, key, value) => {
        const copy = [...variants];
        copy[index][key] = value;
        setVariants(copy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            price: Number(formData.price),
            discountPrice: Number(formData.discountPrice),
            stock: Number(formData.stock),
            rating: Number(formData.rating),
            reviewCount: Number(formData.reviewCount),
            variants: variants.filter(v => v.size),
            images: images.filter(Boolean),
            ingredients: ingredients.filter(Boolean),
            benefits: benefits.filter(Boolean),
            skinType,
            concerns
        };

        try {
            await api.post("/api/products", payload);
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            alert("Failed to add product");
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                
                <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] mb-8 hover:text-[#1A1A1A] transition-colors">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </button>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/[0.03]">
                    <header className="mb-10">
                        <span className="text-[#8A9A8A] uppercase tracking-[0.3em] text-[10px] font-bold">Inventory Control</span>
                        <h1 className="text-3xl font-medium mt-1 tracking-tight">Add New <span className="italic font-light text-[#8A9A8A]">Formula.</span></h1>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        
                        {/* BASIC INFO + BRAND */}
                        <section>
                            <div className={sectionHeader}>
                                <Sparkles size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Core Identity</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-1">
                                    <label className={labelClasses}>Product Name</label>
                                    <input name="name" placeholder="e.g. Squalane Cleanser" className={inputClasses} onChange={handleChange} required />
                                </div>
                                <div className="md:col-span-1">
                                    <label className={labelClasses}>Brand Name</label>
                                    <input name="brand" placeholder="e.g. Coral Skin" className={inputClasses} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClasses}>Category</label>
                                    <select name="category" onChange={handleChange} className={inputClasses}>
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
                                        <label className={labelClasses}>Standard Price (₹)</label>
                                        <input name="price" type="number" className={inputClasses} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Discount Price</label>
                                        <input name="discountPrice" type="number" className={inputClasses} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* STATS: STOCK, RATING, REVIEW COUNT */}
                        <section>
                            <div className={sectionHeader}>
                                <BarChart3 size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Technical Stats</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <label className={labelClasses}>Initial Stock</label>
                                    <input name="stock" type="number" className={inputClasses} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Rating (0-5)</label>
                                    <input name="rating" type="number" step="0.1" placeholder="4.8" className={inputClasses} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Reviews</label>
                                    <input name="reviewCount" type="number" placeholder="24" className={inputClasses} onChange={handleChange} />
                                </div>
                            </div>
                        </section>

                        {/* VARIANTS (SIZE/PRICE/STOCK) */}
                        <section>
                            <div className={sectionHeader}>
                                <Layers size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Size Variants</h2>
                            </div>
                            <div className="space-y-4">
                                {variants.map((v, i) => (
                                    <div key={i} className="flex gap-4 items-end bg-[#FAF9F6]/50 p-4 rounded-2xl border border-black/[0.02]">
                                        <div className="flex-1">
                                            <input placeholder="Size (e.g. 100ml)" className={inputClasses} onChange={(e) => updateVariant(i, "size", e.target.value)} />
                                        </div>
                                        <div className="w-24">
                                            <input type="number" placeholder="Price" className={inputClasses} onChange={(e) => updateVariant(i, "price", e.target.value)} />
                                        </div>
                                        <div className="w-24">
                                            <input type="number" placeholder="Stock" className={inputClasses} onChange={(e) => updateVariant(i, "stock", e.target.value)} />
                                        </div>
                                        <button type="button" onClick={() => removeField(i, setVariants, variants)} className="p-3 text-red-300 hover:text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addVariant} className="text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] flex items-center gap-2">
                                    <Plus size={14} /> Add Volume Option
                                </button>
                            </div>
                        </section>

                        {/* INGREDIENTS */}
                        <section>
                            <div className={sectionHeader}>
                                <Beaker size={16} className="text-[#8A9A8A]" />
                                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Ingredients List</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                {ingredients.map((val, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input value={val} placeholder="e.g. Salicylic Acid 2%" className={inputClasses} onChange={(e) => updateField(i, e.target.value, setIngredients, ingredients)} />
                                        <button type="button" onClick={() => removeField(i, setIngredients, ingredients)} className="p-2 text-red-200 hover:text-red-500"><Trash2 size={14}/></button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => addField(setIngredients, ingredients)} className="text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] flex items-center gap-2 mt-4">
                                <Plus size={14} /> Add Ingredient
                            </button>
                        </section>

                        {/* IMAGES & DESCRIPTIONS */}
                        <section className="space-y-8">
                            <div>
                                <div className={sectionHeader}>
                                    <ImageIcon size={16} className="text-[#8A9A8A]" />
                                    <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Gallery URLs</h2>
                                </div>
                                {images.map((val, i) => (
                                    <div key={i} className="flex gap-2 mb-3">
                                        <input value={val} placeholder="Image Link" className={inputClasses} onChange={(e) => updateField(i, e.target.value, setImages, images)} />
                                        <button type="button" onClick={() => removeField(i, setImages, images)} className="p-3 text-red-300"><Trash2 size={18}/></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addField(setImages, images)} className="text-[10px] uppercase tracking-widest font-bold text-[#8A9A8A] flex items-center gap-2">
                                    <Plus size={14} /> Add Image Slot
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>Story/Description</label>
                                    <textarea name="description" className={`${inputClasses} h-32 resize-none`} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Usage Ritual</label>
                                    <textarea name="howToUse" className={`${inputClasses} h-32 resize-none`} onChange={handleChange} />
                                </div>
                            </div>
                        </section>

                        {/* SUBMIT */}
                        <footer className="pt-8 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex gap-8">
                                {["isFeatured", "isNew", "isBestSeller"].map(tag => (
                                    <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name={tag} className="sr-only peer" onChange={handleChange} />
                                        <div className="w-5 h-5 border-2 border-black/10 rounded-md peer-checked:bg-[#8A9A8A] peer-checked:border-[#8A9A8A] transition-all"></div>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-[#1A1A1A]">{tag.replace("is", "")}</span>
                                    </label>
                                ))}
                            </div>

                            <button className="w-full md:w-auto bg-[#1A1A1A] text-white px-12 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-[#3A4A3A] transition-all shadow-xl shadow-black/10">
                                <Save size={16} /> Save Formula
                            </button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
}

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default AdminAddProducts;