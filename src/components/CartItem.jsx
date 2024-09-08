import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function CartItem({ product, onUpdateQuantity, onDeleteItem }) {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  const truncateTitle = (title, maxWords) => {
    const words = title.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return title;
  };

  const itemTotal = (product.price * product.quantity).toFixed(2);

  return (
    <div className='flex flex-wrap pl-2 pr-[9rem] py-4 bg-gray-100 rounded-md group justify-between items-center shadow-md relative'>
      <div className='flex items-center gap-5'>
        <img src={product.image} alt={product.title} className="w-20" />
        <span>{truncateTitle(product.title, 2)}</span>
        <button
          className='absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={() => onDeleteItem(product.id)}
        >
          <div className='bg-Secondary2 rounded-[50%] text-base text-Text py-[1px] px-2 font-bold'>
            <FontAwesomeIcon icon={faX} />
          </div>
        </button>
      </div>
      <span>${product.price.toFixed(2)}</span>
      <input
        type="number"
        value={product.quantity}
        onChange={handleQuantityChange}
        className='w-[5%] ml-1 p-[5px] border-Text1 border-[1px] outline-none rounded text-center'
      />
      <span className='ml-10'>${itemTotal}</span>
    </div>
  );
}
