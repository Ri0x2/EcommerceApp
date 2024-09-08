import React from 'react'
import { CaretDown } from 'phosphor-react'

export default function Header() {
  return (
    <header className="bg-Text2 text-Text  ">
    <div className="max-w-screen-xl mx-auto pr-[70px]  py-[15px] flex  items-center ">

      <div className="flex-grow  text-sm pl-8 text-center">
        <span>Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%!</span>
        <a href="#" className="text-white font-bold text-[15px]  underline ml-2">ShopNow</a>
      </div>
  
    
      <div className="relative">
        <button className="text-sm focus:outline-none flex  text-[16px] ">
          English <span className='ml-[10px] font-[700]'> <CaretDown size={20} /></span> 
        </button>
      </div>
    </div>
  </header>
  
  )
}
