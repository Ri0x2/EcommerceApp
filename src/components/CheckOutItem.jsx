import React from 'react';


const truncateToTwoWords = (text) => {
  const words = text.split(' ');
  if (words.length > 2) {
    return `${words[0]} ${words[1]}`;
  }
  return text;
};

export default function CheckOutItem({ item }) {
  return (
    <div className='flex items-center mb-7'>
      <div className='flex  gap-6 items-center'>
        <img className='w-8' src={item.image} alt={item.title} /> 
        <span>{truncateToTwoWords(item.title)}</span> 
      </div>
      <div className='ml-auto' >${item.price.toFixed(2)}</div> 
    </div>
  );
}
