import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'phosphor-react';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert

function Cards({ product = {}, onAddToWishlist, updateCartCount }) {
  const { id, image, title, price } = product;
  const navigate = useNavigate();

  if (!product || !id) return null;

  // Generate random ratings and reviews
  const rating = (Math.random() * 4 + 1).toFixed(1);
  const numRatings = Math.floor(Math.random() * 1000) + 100;
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;

  // Function to handle adding to cart
  const handleAddToCart = () => { 
    if (localStorage.getItem('isSignedIn') !== 'true') {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to add items to your cart.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/SignUp.jsx'); 
      });
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = existingCart.find(item => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;  
      Swal.fire({
        title: 'Updated Cart',
        text: `${title} quantity updated.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      existingCart.push({ ...product, quantity: 1 });
      Swal.fire({
        title: 'Added to Cart',
        text: `${title} has been added to your cart.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/cart.jsx'); 

    if (updateCartCount) {
      updateCartCount();
    }
  };

  // Function to handle viewing the product details
  const handleViewProduct = () => {

    if (localStorage.getItem('isSignedIn') !== 'true') {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to view products details.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/SignUp.jsx'); 
      });
      return;
    }
    navigate(`/product/${id}`, { state: { product } });
  };

  return (
    <div className="min-w-[268px] h-[248px] p-2 group relative">
      <div className="bg-Secondary lg:w-full w-[60%] h-[80%] flex justify-center rounded items-center relative overflow-hidden">
        {/* Product image */}
        <img src={image} alt={title} className="h-32 object-contain" />
        <div className="absolute top-2 right-2 flex-col flex gap-2">
          {/* Add to wishlist */}
          <div className='bg-Text rounded-full p-1 cursor-pointer' onClick={() => onAddToWishlist(product)}>
            <Heart size={24} className='text-Text2 hover:text-red-500 transition-colors duration-300' />
          </div>
          {/* View product */}
          <div className='bg-Text rounded-full p-1 cursor-pointer' onClick={handleViewProduct}>
            <Eye size={24} className='text-Text2 hover:text-blue-500 transition-colors duration-300' />
          </div>
        </div>

        {/* Add to Cart Button (shows on hover) */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 font-medium bg-Text2 text-Text py-2 opacity-0 translate-y-full transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Cart
        </button>
      </div>

      {/* Product details */}
      <div className="mt-2">
        <h4 className="font-bold lg:text-lg text-sm truncate">{title}</h4>
        <span className="block text-Secondary2 font-medium">${price}</span>

        {/* Rating and Reviews */}
        <div className='flex items-center'>
          {Array.from({ length: filledStars }).map((_, index) => (
            <FaStar key={index} className="text-star" />
          ))}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <FaStar key={index + filledStars} className="text-Text1" />
          ))}
          <span className='font-semibold text-Text1 ml-2'> ({numRatings})</span>
        </div>
      </div>
    </div>
  );
}

export default Cards;
