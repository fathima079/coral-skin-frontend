import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Filter, ChevronDown } from 'lucide-react';

function ProductList({ products = [] }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-fit px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto mb-12">
        <h2 className="text-4xl font-bold">SHOP ALL</h2>
        <p>{products.length} Products</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} onClick={() => handleClick(p._id)}>
            <img src={p.images?.[0]} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.discountPrice || p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;