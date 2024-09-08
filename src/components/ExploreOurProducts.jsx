import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import Cards from '../components/Cards';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function ExploreOurProducts({ products = [] }) {
  const [showAll, setShowAll] = useState(false); // State to toggle between showing all products or default view
  const scrollContainerRef = useRef(null);
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

  const toggleShowAll = () => {
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
    <section className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-[40px] w-[20px] bg-Secondary2 mr-2 rounded"></div>
          <span className="text-Secondary2 font-semibold text-xl">Our Products</span>
        </div>
      </div>
      <div className='flex justify-between flex-wrap'>
        <h2 className="font-bold lg:text-3xl text-lg">Explore Our Products</h2>
        {!showAll && (
          <div className="flex gap-2">
            <button onClick={scrollLeft} className="bg-Secondary rounded-full p-3">
              <ArrowLeft size={32} />
            </button>
            <button onClick={scrollRight} className="bg-Secondary rounded-full p-3">
              <ArrowRight size={32} />
            </button>
          </div>
        )}
      </div>
      <div className="relative">
        <div
          className={`flex ${showAll ? 'flex-col overflow-hidden' : 'flex-col overflow-x-auto'} scrollbar-hide py-4 my-8`}
          ref={scrollContainerRef}
        >
          {!showAll ? (
            <div className="flex flex-col space-y-4">
              <div className="flex">
                {products.slice(8, 14).map((product) => (
                  <div key={product.id} className="h-[300px] min-w-[200px] max-w-[286px] flex-shrink-0 rounded-md">
                    <Cards product={product} onAddToWishlist={handleAddToWishlist} />
                  </div>
                ))}
              </div>
              <div className="flex">
                {products.slice(14, 20).map((product) => (
                  <div key={product.id} className="h-[300px] min-w-[200px] max-w-[286px] flex-shrink-0 rounded-md">
                    <Cards product={product} onAddToWishlist={handleAddToWishlist} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="h-[300px] w-full max-w-[286px] mx-auto flex-shrink-0 rounded-md">
                      <Cards product={product} onAddToWishlist={handleAddToWishlist} />
                    </div>
      ))}
    </div>
          )}
        </div>
      </div>
      <button
        onClick={toggleShowAll}
        className="bg-Secondary2 mb-16 text-Text inline-flex self-center mt-14 px-12 py-4 rounded outline-none"
      >
        {showAll ? 'View Less Products' : 'View All Products'}
      </button>
    </section>
  );
}
