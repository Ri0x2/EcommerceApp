import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

export default function WishlistCard({ product, onRemoveFromWishlist }) {
  const { image, title, price } = product;

  const handleRemove = () => {
    onRemoveFromWishlist(product);
  };

  return (
    <div className="min-w-[268px] max-w-[300px] h-[248px] p-2">
      <div className="bg-Secondary w-full h-[80%] flex justify-center items-center relative">
        <img
          src={image} 
          alt={title} 
          className="h-32 object-contain"
        />
        <div className="absolute top-2 right-2 flex-col flex gap-2">
          <div className='bg-Text rounded-full p-2 cursor-pointer ' onClick={handleRemove}>
            <FaRegTrashAlt />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h4 className="font-bold text-lg truncate">{title}</h4>
        <span className="block text-Secondary2 font-medium">${price}</span>
      </div>
    </div>
  );
}
