import React, { useState } from 'react';
import { Heart } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#E07575');
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const navigate = useNavigate(); // Hook for navigation

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToWishlist = () => {
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
        title: 'Added to Wishlist',
        text: `${title} has been added to your wishlist!`,
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

  const handleAddToCart = () => {
    if (quantity <= 0) {
      Swal.fire({
        title: 'Invalid Quantity',
        text: 'Please select a quantity.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const { id, title, image, price } = product;
    console.log('Product:', { id, title, image, price, quantity }); // Debug: Check product details and quantity
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Current Cart:', cart); // Debug: Check current cart content
  
    const existingProductIndex = cart.findIndex(item => item.id === id);
  
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ id, title, image, price, quantity });
    }
  
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      const updatedCart = JSON.parse(localStorage.getItem('cart')); // Debug: Check updated cart content
      console.log('Updated Cart:', updatedCart);
  
      Swal.fire({
        title: 'Added to Cart',
        text: `${title} has been added to your cart!`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  };
  
  
  if (!product) return <p>Loading...</p>;

  const { image, title, price } = product;
  const reviews = Math.floor(Math.random() * 1000) + 100;
  const colors = ['#E07575', '#A0BCE0'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div>
      <div className='flex gap-[70px] mb-[140px]'>
        <div className='flex gap-[30px]'>
          <div className='flex flex-col justify-between'>
            {Array(4).fill(image).map((img, index) => (
              <div key={index} className='bg-Secondary rounded px-4 py-6'>
                <img src={img} alt={title} className='w-32 h-[6.7rem] object-fill min-w-20' />
              </div>
            ))}
          </div>
          <div className='bg-Secondary px-[27px] pt-[154px] pb-[131px] w-[500px]'>
            <img src={image} alt={title} className='w-[546px] h-[315px] min-w-56 object-fill' />
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-4 mb-6'>
            <h2 className='text-2xl'>{title}</h2>
            <div className='flex'>
              <img src='/src/assets/Four Star.png' alt='Rating' />
              <span className='text-Text1 ml-2 mr-4'>({reviews} Reviews) |</span>
              <span className='text-Button1'>In stock</span>
            </div>
            <span className='text-2xl'>${price}</span>
          </div>
          <p className='text-sm mb-6'>
            PlayStation 5 Controller Skin High quality vinyl with air
            <br /> channel adhesive for easy bubble free install & mess
            <br /> free removal Pressure sensitive.
          </p>
          <hr />
          <div className='flex items-center space-x-4 mt-6'>
            <span className='text-black text-xl'>Colours:</span>
            <div className='flex gap-2'>
              {colors.map((color, index) => (
                <span
                  key={index}
                  className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${selectedColor === color ? 'ring-2 ring-Text2' : ''}`}
                  style={{ borderColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className='w-4 h-4 rounded-full'
                    style={{ backgroundColor: color }}
                  ></span>
                </span>
              ))}
            </div>
          </div>
          <div className='flex gap-6 items-center my-6'>
            <span>Size:</span>
            <div className='flex gap-4'>
              {sizes.map((size, index) => (
                <div
                  key={index}
                  className={`border rounded border-text1 px-2 py-1 text-center min-w-[35px] cursor-pointer ${selectedSize === size ? 'selected-size' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center border rounded'>
              <button onClick={handleDecrease} className='border-r py-1 px-3 text-3xl hover:bg-Secondary2 transition-all hover:text-Text'>
                -
              </button>
              <span className='p-1 px-[24px] text-xl'>{quantity}</span>
              <button onClick={handleIncrease} className='border-l py-1 px-3 text-3xl hover:bg-Secondary2 transition-all hover:text-Text'>
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className='bg-Secondary2 text-Text block ml-4 mr-[19px] px-12 py-[10px] text-nowrap rounded outline-none'>
              Buy Now
            </button>
            <div className='border rounded p-[8px]'>
              <button onClick={handleAddToWishlist}><Heart size={25} /></button>
            </div>
          </div>
          <div className='border rounded mt-10'>
            <div className='flex items-center gap-4 px-4 py-[29px] border-b'>
              <img src='/src/assets/icon-delivery.png' alt='Delivery' />
              <div className='flex flex-col gap-1'>
                <span className='font-medium mb-3'>Free Delivery</span>
                <p className='text-xs underline'>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className='flex items-center gap-4 px-4 py-[29px]'>
              <img src='/src/assets/icon-return.png' alt='Return' />
              <div className='flex flex-col gap-1'>
                <span className='font-medium'>Return Delivery</span>
                <p className='text-xs underline'>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
