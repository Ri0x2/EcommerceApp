import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cards from '../components/Cards';
import Swal from 'sweetalert2';

export default function BestSelling({ products = [] }) {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleView = () => {
    setShowAll(!showAll);
  };

  const handleAddToWishlist = (product) => {
    if (localStorage.getItem('isSignedIn') !== 'true') {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to add items to your wishlist.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/SignUp.jsx');
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

  const displayedProducts = showAll ? products : products.slice(4, 8);

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <section className='mt-16'>
        <div className='flex items-center'>
          <div className="h-[40px] w-[20px] bg-Secondary2 mr-2 rounded"></div>
          <span className='text-Secondary2'>This Month</span>
        </div>
        <div className='flex gap-[87px] items-center justify-between mt-10 mb-10'>
          <h2 className='font-bold text-3xl'>Best Selling Products</h2>
          <button className='bg-Secondary2 text-Text px-12 py-4 rounded outline-none'>View All Products</button>
        </div>
        <p>No products available.</p>
      </section>
    );
  }

  return (
    <section className='mt-16'>
      <div className='flex items-center'>
        <div className="h-[40px] w-[20px] bg-Secondary2 mr-2 rounded"></div>
        <span className='text-Secondary2 font-semibold'>This Month</span>
      </div>

      <div className='flex gap-[87px] justify-between items-center flex-wrap'>
        <h2 className='font-bold lg:text-3xl text-lg'>Best Selling Products</h2>
        <button
          onClick={toggleView}
          className='bg-Secondary2 text-Text px-12 py-4 rounded outline-none'
        >
          {showAll ? 'View Less' : 'View All'}
        </button>
      </div>

      <div
        className={`${
          showAll ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'flex gap-4'
        } w-full py-4 my-8 scrollbar-hide flex-wrap  lg:flex-nowrap overflow-x-scroll`}
      >
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className={`${
              showAll ? 'h-[300px] w-full' : 'h-[300px] min-w-[250px]'
            }`}
          >
            <Cards product={product} onAddToWishlist={handleAddToWishlist} />
          </div>
        ))}
      </div>
    </section>
  );
}
