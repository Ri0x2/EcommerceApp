import React from 'react'

export default function 
() {
  return    (
      <>
        <div className='max-w-screen-xl mx-auto pl-[70px] pr-[90px]'> 
               <h3 className='my-20 '><span className='text-Text1'>Home</span> / Contact</h3> 
               <div className='flex flex-wrap lg:flex-nowrap  lg:gap-[30px] gap-3 mb-[140px] '>
                      <div className='px-9 pt-10 pb-[51px] h-[457px] shadow-md rounded '>
                          <div className='flex gap-4 items-center mb-6'>
                            <img src="/src/assets/icons-phone.png" alt="" />
                            <span>Call To Us</span>
                          </div>
                          <div className='flex flex-col gap-4 text-sm'>
                          <span>We are available 24/7, 7 days a week.</span>
                          <span>Phone: +8801611112222</span>
                          </div>
                      <hr className='text-Text1 mb-8  mt-8' />
                      <div className='flex gap-4 items-center mb-6'>
                            <img src="/src/assets/icons-phone.png" alt="" />
                            <span>Call To Us</span>
                          </div>
                          <div className='flex flex-col gap-4 text-sm'>
                          <span >Fill out our form and we will contact you within 24 hours..</span>
                          <span >Emails: customer@exclusive.com</span>
                          <span>Emails: support@exclusive.com</span>
                          </div>
                      </div>
                      <div className='px-8 py-10  shadow-md rounded'>
                          <div className='flex gap-4 '>
                                          <input type="text" placeholder='Your Name' className=' bg-Text outline-none p-2 rounded' />
                                          <input type="email" placeholder='Your Email' className=' bg-Text outline-none p-2 rounded' />
                                          <input type="tel" placeholder='Your Phone' className=' bg-Text outline-none p-2 rounded' />
                          </div>
                                    <div className="flex items-start">
                                      <textarea
                                        className="w-full  p-2 h-[207px] rounded-lg border-none bg-gray-100 bg-Text mt-4 focus:outline-none placeholder-gray-500 resize-none"
                                        placeholder="Your Message"/> 
                                    </div>
                                    <button className='bg-Secondary2 mt-8  text-Text flex ml-auto px-12 py-4 text-nowrap rounded outline-none'>Send Massage</button>
                      </div>
                      <button></button>
               </div>
        </div>
      </>
  )
}
