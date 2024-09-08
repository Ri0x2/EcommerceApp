import React, { useState, useContext } from 'react';
import { CaretRight } from 'phosphor-react';
import FlashSales from '/src/components/FlashSales.jsx';
import BestSelling from '/src/components/BestSelling.jsx';
import ExploreOurProducts from '/src/components/ExploreOurProducts.jsx';
import BrowseByCategory from '/src/components/BrowseByCategory.jsx';
import ScrollToTop from '/src/components/ScrollToTop.jsx';
import { ProductsContext } from '../components/productsProvider';
import Swal from 'sweetalert2';

function Home() {
  const { products } = useContext(ProductsContext);
  

  return (
    <>
  
      
      <div className='container max-w-screen-xl mx-auto px-[70px]'>
        <ScrollToTop />
        <section className='pt-10 flex justify-between flex-wrap '>
          <ul className='gap-4 flex flex-col'>
            <li className='flex gap-10'>Woman’s Fashion <span className=' font-[700]'><CaretRight size={20} /></span></li>
            <li className='flex gap-16'>Men’s Fashion <span className=' font-[700]'><CaretRight size={20} /></span></li>
            <li>Electronics</li>
            <li>Home & Lifestyle</li>
            <li>Medicine</li>
            <li>Sports & Outdoor</li>
            <li>Baby’s & Toys</li>
            <li>Groceries & Pets</li>
            <li>Health & Beauty</li>
          </ul>
          <div className="border-solid border-Secondary border-[1px] h-[384px] relative -top-10"></div>
          <img className='w-[892px] h-[344px]' src="/src/assets/Frame 560.png" alt="" />
        </section>

        {/* Pass addToCart and addToWishlist to components where products can be added */}
        <FlashSales products={products}  />
        <hr className='text-Secondary mb-20' />
        <BrowseByCategory />
        <hr className='text-Secondary' />
        <BestSelling products={products}  />

        <section className='mt-32 mb-16'>
          <img src="/src/assets/Frame 600.png" alt="" />
        </section>
        <ExploreOurProducts products={products} />

        {/* Other sections */}
        <section className='mb-36'>
          <div className='flex justify-center items-center'>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between lg:gap-[120px] gap-[40px]'>
                <div className='text-center flex flex-col justify-center items-center gap-4'>
                  <img className='size-[70px]' src="/src/assets/Servicesvan.png" alt="" />
                  <div className='flex flex-col gap-1'>
                    <h3 className='lg:text-[20px] text-sm font-semibold'>FREE AND FAST DELIVERY</h3>
                    <span className='text-[14px] font-medium'>Free delivery for all orders over $140</span>
                  </div>
                </div>
                <div className='text-center flex flex-col justify-center items-center gap-4'>
                  <img className='size-[70px]' src="/src/assets/Services.png" alt="" />
                  <div className='flex flex-col gap-1'>
                    <h3 className='lg:text-[20px] text-sm font-semibold'>24/7 CUSTOMER SERVICE</h3>
                    <span className='text-[14px] font-medium'>Friendly 24/7 customer support</span>
                  </div>
                </div>
                <div className='text-center flex flex-col justify-center items-center gap-4'>
                  <img className='size-[70px]' src="/src/assets/Servicesfdasf.png" alt="" />
                  <div className='flex flex-col gap-1'>
                    <h3 className='lg:text-[20px] text-sm font-semibold'>MONEY BACK GUARANTEE</h3>
                    <span className='text-[14px] font-medium'>We return money within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
