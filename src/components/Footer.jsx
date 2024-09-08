import React from 'react'

export default function Footer() {
  return (
    <>
    <footer className=' bg-Text2 '>
      <div className='pt-20 px-[90px] flex justify-between flex-wrap pb-[60px]'>
        <div className='text-Text flex flex-col gap-4'>
          <div className='flex flex-col gap-6'>
          <h3 className='text-2xl font-bold'>Exclusive</h3>
          <span className='text-xl font-medium'>Subscribe</span>
          <span>Get 10% off your first order</span>
          </div>
          <input type="email" className=' bg-Text2 border-[1px] rounded-sm py-3 px-4 ' placeholder='Enter your email'/>
        </div>
        <div className='text-Text flex flex-col gap-4 '>
          <div className='flex flex-col gap-6'>
          <h3 className='text-2xl font-bold'>Support</h3>
          <div className='flex flex-col gap-4'>
          <span className=''>111 Bijoy sarani, Dhaka, <br />  DH 1515, Bangladesh.</span>
          <span>exclusive@gmail.com</span>
          <span>+88015-88888-9999</span>
          </div>
          </div>
        </div>
        <div className='text-Text flex flex-col gap-4'>
          <div className='flex flex-col gap-6'>
          <h3 className='text-2xl font-bold'>Account</h3>
          <ul className='flex flex-col gap-4'>
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
          </div>
         
        </div>
        <div className='text-Text flex flex-col gap-4'>
          <div className='flex flex-col gap-6'>
          <h3 className='text-2xl font-bold'>Quick Link</h3>
          <ul className='flex flex-col gap-4'>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
          </div>
         
        </div>
       
        <div className='text-Text flex flex-col gap-4'>
          <div className='flex flex-col gap-6'>
          <h3 className='text-2xl font-bold'>Download App</h3>
          <span className='text-Text1 text-xs'>Save $3 with App New User Only</span>
          </div>
          <div className='flex gap-[11px]'>
            <img src="/src/assets/Qrcode 1.png" alt="" />
            <div className='flex flex-col gap-3'>
              <img src="/src/assets/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.png" alt="" />
              <img src="/src/assets/AppStore.png" alt="" />
            </div>
          </div>
          <ul className='flex gap-7 mt-7 '>
            <li><a href="#"><img src="/src/assets/facebook.png" alt="" /></a></li>
            <li><a href="#"><img src="/src/assets/twitter.png" alt="" /></a></li>
            <li><a href="#"><img src="/src/assets/Group.png" alt="" /></a></li>
            <li><a href="#"><img src="/src/assets/linkedin.png" alt="" /></a></li>
           
          </ul>
        </div>
       

      </div>
      <hr className='text-[#141414]' />
      <p className='text-[#3d3d3d] mt-4 text-center pb-6'>&copy; Copyright Rimel 2022. All right reserved</p>
    </footer>
    </>
  )
}
