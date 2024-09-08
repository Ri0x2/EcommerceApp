import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for Cart and Wishlist
const CartWishlistContext = createContext();

export const CartWishlistProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cart);

    // Load wishlist items from localStorage
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(wishlistItems);
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const addToWishlist = (item) => {
    setWishlist(prevWishlist => {
      const updatedWishlist = [...prevWishlist, item];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prevWishlist => {
      const updatedWishlist = prevWishlist.filter(item => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  return (
    <CartWishlistContext.Provider 
      value={{ 
        cart, 
        wishlist, 
        addToCart, 
        removeFromCart, 
        addToWishlist, 
        removeFromWishlist 
      }}>
      {children}
    </CartWishlistContext.Provider>
  );
};

// Custom hook to use CartWishlistContext
export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  
  // Ensure context is not undefined
  if (context === undefined) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  
  return context;
};
