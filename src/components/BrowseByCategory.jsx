import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';

export default function BrowseByCategory() {
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const categoriesRef = useRef(null);

  const categories = [
    { src: "/src/assets/Category-CellPhone.png", label: "Phones" },
    { src: "/src/assets/Category-Computer.png", label: "Computers" },
    { src: "/src/assets/Category-smartwatch.png", label: "SmartWatch" },
    { src: "/src/assets/Category-camera.png", label: "Camera" },
    { src: "/src/assets/Category-Headphone.png", label: "HeadPhones" },
    { src: "/src/assets/Category-Gamepad.png", label: "Gamepad" },
  ];

  const handleLeftClick = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? categories.length - 1 : prevIndex - 1;
      categoriesRef.current.scrollLeft -= categoriesRef.current.children[0].clientWidth + 16; 
      return newIndex;
    });
  };

  const handleRightClick = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % categories.length;
      categoriesRef.current.scrollLeft += categoriesRef.current.children[0].clientWidth + 16;
      return newIndex;
    });
  };

  
  return (
    <section className='mb-[70px]'>
      <div className='flex items-center'>
        <div className="h-[40px] w-[20px] bg-Secondary2 mr-2 rounded"></div>
        <span className='text-Secondary2 font-semibold'>Categories</span>
      </div>
      <div className='flex justify-between items-center mb-11'>
        <h2 className='font-bold lg:text-3xl text-lg'>Browse By Category</h2>
        <div className='ml-auto text-Text2 gap-2 flex'>
          <button onClick={handleLeftClick} className='bg-Secondary rounded-[50%] p-3'>
            <ArrowLeft size={32} />
          </button>
          <button onClick={handleRightClick} className='bg-Secondary rounded-[50%] p-3'>
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
      <div className='flex overflow-x-auto scrollbar-hide py-4 my-8' ref={categoriesRef}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`border group border-Text1 rounded transition-all p-4 flex flex-col justify-center items-center px-10 w-1/6 ${selectedIndex === index ? 'bg-Secondary2' : 'bg-transparent'} hover:bg-Secondary2`}
            style={{ marginRight: '16px' }} 
          >
            <img
              className={` min-w-[65px] transition-all group-hover:filter group-hover:invert ${selectedIndex === index ? 'filter invert' : ''}`}
              src={category.src}
              alt={category.label}
            />
            <span
              className={`transition-all group-hover:text-Text ${selectedIndex === index ? 'text-Text' : ''}`}
              style={{ marginTop: '8px' }}
            >
              {category.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
