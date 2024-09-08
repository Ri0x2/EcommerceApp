import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import Cards from '../components/Cards';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function FlashSales({ products }) {
  const scrollContainerRef = useRef(null);
  const [showGrid, setShowGrid] = useState(false); 
  const navigate = useNavigate(); // Hook for navigation

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, 
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, 
        behavior: 'smooth',
      });
    }
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const handleAddToWishlist = (product) => {
    if (localStorage.getItem('isSignedIn') !== 'true') {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to add items to your wishlist.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/SignUp.jsx'); // Redirect to Sign Up
      });
      return;
    }

    const { id, title, image, price } = product;
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const isProductInWishlist = wishlist.some(item => item.id === id);

    if (!isProductInWishlist) {
      wishlist.push({ id, title, image, price });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      Swal.fire({
        title: 'Added to Wishlist!',
        text: `${title} has been added to your wishlist.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Already in Wishlist',
        text: `${title} is already in your wishlist.`,
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <section className='mt-16 flex flex-col'>
      <div className='flex items-center'>
        <div className='h-[40px] w-[20px] bg-Secondary2 mr-2 rounded'></div>
        <span className='text-Secondary2 font-semibold'>Today's</span>
      </div>
      <div className='flex gap-[87px] flex-wrap items-center'>
        <h2 className='font-bold lg:text-3xl text-lg'>Flash Sales</h2>
        <div className='ml-auto text-Text2 gap-2 flex'>
          <button className='bg-Secondary rounded-[50%] p-3' onClick={scrollLeft}>
            <ArrowLeft size={32} />
          </button>
          <button className='bg-Secondary rounded-[50%] p-3' onClick={scrollRight}>
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
      <div
        className={`${
          showGrid ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8' : 'flex overflow-x-auto overflow-y-hidden scrollbar-hide'
        } py-8 my-8`} 
        ref={scrollContainerRef}
      >
        {products.map((product) => (
          <Cards product={product} key={product.id} onAddToWishlist={handleAddToWishlist} />
        ))}
      </div>
      <button
        onClick={toggleGrid}
        className='bg-Secondary2 mb-16 text-Text inline-flex self-center mt-14 px-12 py-4 rounded outline-none'
      >
        {showGrid ? 'View Less Products' : 'View All Products'}
      </button>
    </section>
  );
}
