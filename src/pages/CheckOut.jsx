import React, { useEffect, useState } from 'react';
import CheckOutItem from '../components/CheckOutItem'; // Updated import statement
import { useNavigate } from 'react-router-dom';
import  '../index.css';
import Swal from 'sweetalert2';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCartItems);
  }, []); 

  const handlePlaceOrder = () => {
    // Clear cart items from localStorage
    localStorage.removeItem('cart');
    setCart([]);
    
    Swal.fire({
      title: 'Order placed successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/'); 
    });
  };
  

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  return (
    <div className='max-w-screen-xl mx-auto pl-[90px] pr-[22px] mt-20 mb-[144px]'>
      <h3 className='mb-20 text-Text1'>
        Account / My Account / Product / View Cart / <span className='text-Text2'>Checkout</span>
      </h3>
      <h2 className='text-4xl font-medium mb-12'>Billing Details</h2>
      <div className='flex gap-44'>
        <div className='w-[40%]'>
          {/* Billing Details Form */}
          <div className='flex flex-col mb-8'>
            <label htmlFor="firstName" className='text-Text1'>
              First Name <span className='text-Button2'>*</span>
            </label>
            <input type="text" className='bg-Text outline-none p-2 rounded' id="firstName" />
          </div>

          <div className='flex flex-col mb-8'>
            <label htmlFor="CompanyName" className='text-Text1'>
              Company Name <span className='text-Button2'>*</span>
            </label>
            <input type="text" className='bg-Text outline-none p-2 rounded' id="CompanyName" />
          </div>

          <div className='flex flex-col mb-8'>
            <label htmlFor="StreetAddress" className='text-Text1'>
              Street Address <span className='text-Button2'>*</span>
            </label>
            <input type="email" className='bg-Text outline-none p-2 rounded' id="StreetAddress" />
          </div>

          <div className='flex flex-col mb-8'>
            <label htmlFor="address" className='text-Text1'>
            Apartment, floor, etc. (optional) <span className='text-Button2'>*</span>
            </label>
            <input type="text" className='bg-Text outline-none p-2 rounded' id="address" />
          </div>

          <div className='flex flex-col mb-8'>
            <label htmlFor="city" className='text-Text1'>
            Town/City <span className='text-Button2'>*</span>
            </label>
            <input type="text" className='bg-Text outline-none p-2 rounded' id="city" />
          </div>

          <div className='flex flex-col mb-8'>
            <label htmlFor="PhoneNumber" className='text-Text1'>
            Phone Number <span className='text-Button2'>*</span>
            </label>
            <input type="text" className='bg-Text outline-none p-2 rounded' id="PhoneNumber" />
          </div>

          <div className='flex flex-col mb-8'>
            <label htmlFor="EmailAddress" className='text-Text1'>
            Email Address <span className='text-Button2'>*</span>
            </label>
            <input type="email" className='bg-Text outline-none p-2 rounded' id="EmailAddress" />
          </div>

          <div className='flex gap-4  mb-8'>
            <input type="checkbox" className='bg-Text outline-none p-4 rounded accent-Secondary2' id="info" />
            <label htmlFor="info" className='text-Text2'>
            Save this information for faster check-out next time 
            </label>
          </div>

          {/* Additional fields as needed */}
        </div>

        <div className='pt-7 pr-7'>
          {/* Cart Items Section */}
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <CheckOutItem key={item.id} item={item} />
              ))}
              <div className='mt-[39px] w-[470px]'>
                <div className='py-8'>
                  <div className='flex justify-between items-center mb-4 mt-4'>
                    <span>Subtotal: </span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className='flex justify-between items-center mb-4 mt-4'>
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <hr />
                  <div className='flex justify-between items-center mb-4 mt-4'>
                    <span>Total: </span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Options */}
                <ul className='flex flex-col gap-[34px]'>
                  <div className='flex justify-between'>
                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="Bank"
                        className="form-radio h-5 w-5 text-black border-2 border-gray-500 focus:ring-2 focus:ring-gray-500 rounded-full"
                      />
                      <span className="text-gray-800">Bank</span>
                    </label>
                    <div className='flex gap-[10px]'>
                      <img src="/src/assets/Bkash.png" alt="Bkash" />
                      <img src="/src/assets/Visa.png" alt="Visa" />
                      <img src="/src/assets/Mastercard.png" alt="Mastercard" />
                      <img src="/src/assets/image 33.png" alt="Other" />
                    </div>
                  </div>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="Cash on delivery"
                      className="form-radio h-5 w-5 text-black border-2 border-gray-500 focus:ring-2 focus:ring-gray-500 rounded-full"
                    />
                    <span className="text-gray-800">Cash on delivery</span>
                  </label>
                </ul>

                {/* Coupon Code */}
                <div className='flex items-center gap-4 mt-8'>
                  <input
                    className='border-[1px] rounded max-w-[300px] border-Primary1 py-4 pl-6 pr-[164px] outline-none'
                    type="text"
                    placeholder='Coupon Code'
                  />
                  <button className='bg-Secondary2 text-Text inline-flex self-center px-12 py-4 text-nowrap rounded outline-none'>
                    Apply Coupon
                  </button>
                </div>

                {/* Place Order Button */}
                <button
                  className='bg-Secondary2 mt-8 text-Text block px-12 py-4 text-nowrap rounded outline-none'
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}
