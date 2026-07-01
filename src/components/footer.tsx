import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const Footer = () => {
  return (
    <div className='max-w-screen w-full mx-auto'>
    <div className='w-full bg-black flex flex-col sm:flex-row px-6 py-10 gap-8 sm:gap-10 lg:gap-20 sm:items-center sm:justify-between'>
        <div className='bg-black w-full sm:w-[60%]'>

        <div className="flex items-center gap-4 ">
            <div className="h-px w-6 bg-[#9A7428]"></div>
            <h1 className="text-[10px] uppercase text-[#9A7428] tracking-[3px]">Our Philosophy</h1>
        </div>
        <h1 className="text-[26px] sm:text-[28px] md:text-[32px] lg:text-[36px] py-3 text-white font-light">The Tempus <span className="italic text-[#9A7428]">Dispatch.</span></h1>

        <p className="text-[13px] font-light text-gray-500">
            New arrivals, horological notes, and exclusive access.
        </p>
    </div>
    <div className="flex flex-col sm:flex-row w-full sm:w-[40%] gap-3 sm:gap-0">
    <Input
      type="email"
      placeholder="Your email address"
      className="w-full sm:max-w-[320px] h-11 bg-transparent border-px border-[#868685] text-white placeholder:text-gray-500 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
    />
    <Button
      className="h-11 px-8 border border-[#868685] rounded-none bg-[#868685] hover:bg-black text-black hover:text-[#868685] uppercase tracking-[2px] text-[11px] w-full sm:w-auto"
    >
      Subscribe
    </Button>
  </div>
    </div>
        
    
    <div className='w-full px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white border border-bottom-[#868685]'>
        <div className='border-r border-[#868685]/30 px-6 py-8 flex flex-col gap-5'>
            <a href="/" className='flex gap-2.5 items-baseline'>
                <span className='font-Arial text-[22px] font-light uppercase text-[#0D0D0B] tracking-[2px]'>Tempus</span>
                <span className='inline-block w-px h-3.5 bg-[#9A7428] self-center'></span>
                <span className='font-Arial text-[9px] self-center font-normal uppercase text-[#9A7428] tracking-[0.28rem]'>Est. MMXXIV</span>
            </a>
            <p className='py-2 pr-3 text-[13px] text-[#7A7670]'>
                Precision timepieces, carefully curated. Where every second is made to matter.
            </p>

            <div className="flex items-center gap-5">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Tempus on Instagram" className="text-[#7A7670] hover:text-[#0D0D0B] transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Tempus on X / Twitter" className="text-[#7A7670] hover:text-[#0D0D0B] transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Tempus on Pinterest" className="text-[#7A7670] hover:text-[#0D0D0B] transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"></path><line x1="10" y1="14" x2="9" y2="20"></line>
                </svg>
                </a>
                </div>
        </div>
        <div className='border-r border-[#868685]/30 px-6 py-8'>
            <h2 className='uppercase font-medium text-[#5f5f5f] text-[10px] tracking-[2px] pb-4 border-b border-[#868685]/30'>
                shop
            </h2>
            <ul className='flex flex-col mt-5 gap-4 text-[13px]'>
                <li className=' text-gray-700 hover:text-black'>New Arrivals</li>
                <li className=' text-gray-700 hover:text-black'>Best Sellers</li>
                <li className=' text-gray-700 hover:text-black'>Prestige Series</li>
                <li className=' text-gray-700 hover:text-black'>Sport Series</li>
                <li className=' text-gray-700 hover:text-black'>Classic Series</li>
            </ul>
        </div>
        <div className='border-r border-[#868685]/30 px-6 py-8'>
            <h2 className='uppercase font-medium text-[#5f5f5f] text-[10px] tracking-[2px] pb-4 border-b border-[#868685]/30'>
                company
            </h2>
            <ul className='flex flex-col mt-5 gap-4 text-[13px]'>
                <li className=' text-gray-700 hover:text-black'>About Us</li>
                <li className=' text-gray-700 hover:text-black'>Sustainability</li>
                <li className=' text-gray-700 hover:text-black'>Craftsmanship</li>
                <li className=' text-gray-700 hover:text-black'>Press</li>
            </ul>
        </div>
        <div className='px-6 py-8'>
            <h2 className='uppercase font-medium text-[#5f5f5f] text-[10px] tracking-[2px] pb-4 border-b border-[#868685]/30'>
                support
            </h2>
            <ul className='flex flex-col mt-5 gap-4 text-[13px]'>
                <li className=' text-gray-700 hover:text-black'>FAQ</li>
                <li className=' text-gray-700 hover:text-black'>Shipping Policy</li>
                <li className=' text-gray-700 hover:text-black'>Returns & Warranty</li>
                <li className=' text-gray-700 hover:text-black'>Contact Us</li>
                <li className=' text-gray-700 hover:text-black'>Size Guide</li>
            </ul>
        </div>
    </div>



    <div className='w-full bg-white flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between p-6'>
        <div>
            <p className=' text-gray-700 text-[12px]'>© 2026 Tempus Watches. All rights reserved.</p>
        </div>
        <div className='flex flex-wrap gap-4 text-gray-700 text-[12px]'>
            <span>
                Privacy Policy
            </span>
            <span>
                Terms of Service
            </span>
            <span>
                Cookie Policy
            </span>
        </div>
    </div>


    </div>
  )
}

export default Footer