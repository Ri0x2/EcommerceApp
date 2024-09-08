import React, { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleUpdateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDeleteItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className='max-w-screen-xl mx-auto px-[70px] py-20'>
      <h3 className='mb-6 text-lg'><a href="/">Home</a> / Cart</h3>
      {cart.length > 0 ? (
        <>
          <div className='flex flex-col gap-6'>
            <ul className='flex flex-wrap px-2 py-4 bg-gray-100 rounded-md justify-between shadow-md'>
              <li className='flex-1 font-semibold text-center'>Product</li>
              <li className='flex-1 font-semibold text-center'>Price</li>
              <li className='flex-1 font-semibold text-center'>Quantity</li>
              <li className='flex-1 font-semibold text-center'>Subtotal</li>
            </ul>
            {cart.map((item, index) => (
              <CartItem
                key={index}
                product={item}
                onUpdateQuantity={handleUpdateQuantity}
                onDeleteItem={handleDeleteItem}
              />
            ))}
          </div>
          <div className='flex flex-wrap justify-between gap-6 mt-6'>
            <Link to="/" className='border-[1px] border-Text1 rounded py-4 px-12 hover:bg-Secondary2 hover:text-Text transition-all hover:border-none'>
              Return To Shop
            </Link>
            <button className='border-[1px] border-Text1 rounded py-4 px-12 hover:bg-Secondary2 hover:text-Text transition-all hover:border-none'>
              Update Cart
            </button>
          </div>
          <div className='flex flex-col mt-20 lg:flex-row lg:justify-between'>
            <div className='flex items-center mb-auto gap-4'>
              <input className='border-[1px] rounded border-Primary1 py-3 pl-6 text-left outline-none w-[300px]' type="text" placeholder='Coupon Code' />
              <button className='bg-Secondary2 text-Text px-12 py-3 rounded outline-none hover:bg-HoverButton transition-all'>Apply Coupon</button>
            </div>
            <div className='w-full lg:w-[470px]'>
              <div className='border-[1px] rounded py-4 px-6 bg-gray-100'>
                <h4 className='text-lg font-medium mb-4'>Cart Total</h4>
                <div className='flex justify-between mb-4'>
                  <span>Subtotal:</span><span>${calculateTotal().toFixed(2)}</span>
                </div>
                <hr />
                <div className='flex justify-between mb-4 mt-4'>
                  <span>Shipping:</span><span>Free</span>
                </div>
                <hr />
                <div className='flex justify-between mb-4 mt-4'>
                  <span>Total:</span><span>${calculateTotal().toFixed(2)}</span>
                </div>
                <Link to='/CheckOut.jsx'>
                  <button className='bg-Secondary2 text-Text px-4 py-2 rounded outline-none w-1/2 flex mx-auto justify-center hover:bg-HoverButton transition-all'>
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
