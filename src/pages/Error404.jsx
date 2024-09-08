import React from 'react'

export default function Error404() {
  return (
    <>
    <div  className='max-w-screen-xl mx-auto pl-[90px] pr-[22px] mt-20 mb-[144px]'>
           <h3 className='my-20 '><span className='text-Text1'>Home</span> / About</h3>    
            <div className='flex flex-col justify-center items-center gap-10'>
                <h1 className='text-[110px] font-medium '>404 Not Found</h1>
                <p className='mb-10'>Your visited page not found. You may go home page.</p>
              <a href="/"><button className='bg-Secondary2 mt-8  text-Text block  px-12 py-4 text-nowrap rounded outline-none'>Back to home page</button></a> 
            </div>
    </div>
    </>
  )
}
