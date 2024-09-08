import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, MagnifyingGlass, List } from 'phosphor-react';
import { useCartWishlist } from './CartWishlistContext';
import Swal from 'sweetalert2';

export default function MainNavbar() {
  const { cart, wishlist } = useCartWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isSignedIn') === 'true');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  const getLinkClassName = (path) => {
    const isActive = location.pathname === path || location.pathname === `${path}.jsx` || (path === '/' && location.pathname === '/');
    return `text-Text2 ${isActive ? 'border-b-2 border-red-500' : 'hover:border-b-2 hover:border-red-500 '} transtion-all transition-colors duration-300`;
  };

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    localStorage.setItem('isSignedIn', 'false');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleUnauthorizedClick = (redirectTo) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: 'Please log in to access this feature.',
        confirmButtonText: 'Login',
      }).then(() => {
        navigate('/SignUp.jsx');
      });
    } else {
      navigate(redirectTo);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1109) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className='max-w-screen-xl container mx-auto px-4 md:px-[70px] pt-[35px] pb-[16px] flex justify-between items-center'>
        <a href="/"> <h1 className='text-[27px] font-bold text-Text2'>Exclusive</h1> </a>
        
        {/* Desktop Menu */}
        <div className='hidden md:block'>
          <ul className='flex lg:gap-16 gap-4'>
            <li><Link to='/' className={getLinkClassName('/')}>Home</Link></li>
            <li><Link to='/Contact.jsx' className={getLinkClassName('/Contact')}>Contact</Link></li>
            <li><Link to='/About.jsx' className={getLinkClassName('/About')}>About</Link></li>
            <li><Link to='/SignUp.jsx' className={getLinkClassName('/SignUp')}>Sign Up</Link></li>
          </ul>
        </div>
        
        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button onClick={handleMobileMenuToggle} className='text-Text2'>
            <List size={30} />
          </button>
        </div>

        <div className='flex gap-6 items-center'>
          <div className='relative hidden lg:flex items-center'>
            <input className='bg-Secondary text-[12px] font-semibold py-[10px] pl-5 pr-[70px] outline-none rounded' type="text" placeholder='What are you looking for?' />
            <MagnifyingGlass size={24} className='absolute cursor-pointer right-4' />
          </div>
          <div className='relative flex items-center cursor-pointer' onClick={() => handleUnauthorizedClick('/Wishlist.jsx')}>
            <Heart size={25} />
            {wishlistCount > 0 && (
              <div className='bg-Secondary2 text-Text absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                <span>{wishlistCount}</span>
              </div>
            )}
          </div>
          <div className='relative flex items-center cursor-pointer' onClick={() => handleUnauthorizedClick('/Cart.jsx')}>
            <ShoppingCart size={30} />
            {cartCount > 0 && (
              <div className='bg-Secondary2 text-Text absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                <span>{cartCount}</span>
              </div>
            )}
          </div>
          {isLoggedIn && (
            <div className='relative'>
              <img
                src="/src/assets/user22.png"
                alt="User Profile"
                onClick={handleDropdownToggle}
                className='cursor-pointer'
              />
              <div 
                className={`absolute right-0 mt-2 bg-Secondary rounded shadow-lg w-[224px] overflow-hidden transition-all duration-300 ease-in-out ${
                  isDropdownOpen ? 'max-h-[208px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className='flex flex-col'>
                  <li><Link to='MyAccount.jsx' className='flex items-center gap-4 px-4 py-2 text-sm hover:bg-gray-100'><img src="/src/assets/user33.png" alt="" /> Manage My Account</Link></li>
                  <li><Link to='' className='flex items-center gap-4 px-4 py-2 text-sm hover:bg-gray-100'><img src="/src/assets/icon-mallbag.png" alt="" /> My Orders</Link></li>
                  <li><Link to='' className='flex items-center gap-4 px-4 py-2 text-sm hover:bg-gray-100'><img src="/src/assets/icon-cancel22.png" alt="" /> My Cancellations</Link></li>
                  <li><Link to='' className='flex items-center gap-4 px-4 py-2 text-sm hover:bg-gray-100'><img src="/src/assets/Icon-Reviews22.png" alt="" /> My Reviews</Link></li>
                  <li><button onClick={handleLogout} className='flex items-center gap-4 w-full px-4 py-2 text-sm text-left hover:bg-gray-100'><img src="/src/assets/Icon-logout22.png" alt="" /> Logout</button></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-Secondary2 text-Text py-4'>
          <ul className='flex flex-col items-center gap-4'>
            <li><Link to='/' className={getLinkClassName('/')}>Home</Link></li>
            <li><Link to='/Contact.jsx' className={getLinkClassName('/Contact')}>Contact</Link></li>
            <li><Link to='/About.jsx' className={getLinkClassName('/About')}>About</Link></li>
            <li><Link to='/SignUp.jsx' className={getLinkClassName('/SignUp')}>Sign Up</Link></li>
          </ul>
        </div>
      )}

      <hr className='text-[#00000038]' />
    </>
  );
}