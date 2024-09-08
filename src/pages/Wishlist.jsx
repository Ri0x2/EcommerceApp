import React, { useContext, useEffect, useState } from 'react';
import WishlistCard from '/src/components/WishlistCard.jsx'; 
import { ProductsContext } from '../components/productsProvider';
import Cards from '../components/Cards';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Wishlist() {
  const { products } = useContext(ProductsContext);
  const [wishlist, setWishlist] = useState([]);
  const [showMore, setShowMore] = useState(false); // Controls toggle for showing more products
  const navigate = useNavigate();

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (storedWishlist && Array.isArray(storedWishlist)) {
      setWishlist(storedWishlist);
    }
  }, []);

  // Add item to wishlist
  const handleAddToWishlist = (productToAdd) => {
    const isAlreadyInWishlist = wishlist.some(product => product.id === productToAdd.id);
    
    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...wishlist, productToAdd];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Already in Wishlist!',
        text: 'This product is already in your wishlist.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = (productToRemove) => {
    const updatedWishlist = wishlist.filter(product => product.id !== productToRemove.id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Move all items to cart
  const handleMoveAllToBag = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...storedCart, ...wishlist.map(item => ({
      ...item, 
      quantity: item.quantity || 1 
    }))];
  
    // Remove moved items from wishlist
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    localStorage.removeItem('wishlist');
    setWishlist([]);
  
    navigate('/cart.jsx'); 
  };

  // Toggle the "See All" button to show more products or hide
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className='max-w-screen-xl mx-auto px-[70px] mt-20 mb-[144px]'>
      {/* Wishlist Section */}
      <div>
        <div className='flex justify-between items-center'>
          <h2>Wishlist ({wishlist.length})</h2>
          <button
            className='border-[1px] rounded py-4 px-12  hover:bg-Secondary2 hover:text-Text transition-all '
            onClick={handleMoveAllToBag}
          >
            Move All To Bag
          </button>
        </div>
        
        <div className='grid grid-cols-4 gap-8 mt-8'>
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
              <WishlistCard 
                product={product} 
                key={product.id} 
                onRemoveFromWishlist={handleRemoveFromWishlist} 
              />
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      </div>

      {/* Just For You Section */}
      <div className='mt-[88px]'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className="h-[40px] w-[20px] bg-Secondary2 mr-2 rounded"></div>
            <span className='text-Text2'>Just For You</span>
          </div>
          <button className='border-[1px] rounded py-4 px-12  hover:bg-Secondary2 hover:text-Text transition-all' onClick={toggleShowMore}>
            {showMore ? 'Hide' : 'See All'}
          </button>
        </div>

        {/* Grid of Products */}
        <div className='grid grid-cols-4 gap-8 mt-8'>
          {/* Initially show the first 4 products */}
          {products.slice(0, 4).map((product) => (
            <Cards 
              product={product} 
              key={product.id} 
              onAddToWishlist={handleAddToWishlist} 
            />
          ))}

          {/* Show 4 more products if "See All" is clicked */}
          {showMore && (
            <>
              {products.slice(4, 8).map((product) => (
                <Cards 
                  product={product} 
                  key={product.id} 
                  onAddToWishlist={handleAddToWishlist} 
                />
              ))}
            </>
          )}
        </div>  
      </div>
    </div>
  );
}

export default Wishlist;
