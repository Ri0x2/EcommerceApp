import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'phosphor-react'; 
import { FaHeart, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2'; 

function Cards({ product = {}, onAddToWishlist, updateCartCount }) {
  const { id, image, title, price } = product;
  const navigate = useNavigate();

  if (!product || !id) return null;

  // Randomly decide if this product has a discount (50% chance)
  const hasDiscount = Math.random() > 0.5;
  // Generate random discount percentage between 5% and 30%
  const discountPercentage = hasDiscount ? Math.floor(Math.random() * 26) + 5 : 0;
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = (price - discountAmount).toFixed(2);

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
        text: 'Please log in to view product details.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/SignUp.jsx'); 
      });
      return;
    }
    navigate(`/product/${id}`, { state: { product } });
  };

  // Retrieve wishlist from localStorage
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  // Check if the product is already in the wishlist
  const isInWishlist = wishlist.some(item => item.id === id);

  return (
    <div className="min-w-[268px] h-[248px] p-2 group relative">
      <div className="bg-Secondary lg:w-full w-[60%] h-[80%] flex justify-center rounded items-center relative overflow-hidden">
        {/* Conditionally display Discount Label */}
        {hasDiscount && (
          <div className="absolute top-2 bg-Secondary2 left-2  text-Text px-2 py-1 text-xs rounded">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Product image */}
        <img src={image} alt={title} className="h-32 object-contain" />
        <div className="absolute top-2 right-2 flex-col flex gap-2">
          {/* Add to wishlist */}
          <div className='bg-Text rounded-full p-1 cursor-pointer' onClick={() => onAddToWishlist(product)}>
            {isInWishlist ? (
              <FaHeart size={24} color="red" className='transition-colors duration-300' /> // Red heart if in wishlist
            ) : (
              <Heart size={24} className='text-Text2 hover:text-red-500 transition-colors duration-300' /> // Default heart if not in wishlist
            )}
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
        
        {/* Conditionally show original and discounted price */}
        {hasDiscount ? (
          <>
          <div className='flex gap-4'>
            <span className="block text-Secondary2 font-bold">${discountedPrice}</span>
            <span className="block text-Text1 font-medium line-through">${price}</span>
          </div>
          </>
        ) : (
          <span className="block text-Secondary2 font-medium">${price}</span>
        )}

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
