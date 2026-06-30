// src/components/auth/navbar.tsx
import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import Button2 from '../button2'
import MobileMenu from "./mobile-menu";
import UserMenu from "./user-menu";
import CartIcon from './cart-icon';

const Navbar = async () => {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <nav className='max-w-[1500px] w-full md:px-8 h-16 md:gap-10 flex justify-between items-center py-4 bg-[#FFFFFF] px-4 border border-b-gray-200 fixed top-0 left-0 right-0 mx-auto z-100'>
      
      <a href="/" className='flex gap-2.5 items-baseline'>
        <span className='font-Arial text-[22px] font-light uppercase text-[#0D0D0B] tracking-[2px]'>Tempus</span>
        <span className='inline-block w-px h-3.5 bg-[#9A7428] self-center'></span>
        <span className='font-Arial text-[9px] self-center font-normal uppercase text-[#9A7428] tracking-[0.28rem]'>Est. MMXXIV</span>
      </a>
    
      <ul className='hidden lg:flex items-center gap-9 text-[11px] flex-1 justify-center tracking-[0.14em]'>
        <a href="#collection"><li className='group uppercase text-gray-700 hover:text-black relative cursor-pointer '>Collection
          <div className="absolute left-0 -bottom-1 w-full h-px bg-[#9A7428] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"></div>
        </li></a>
        <a href="#about"><li className='group uppercase text-gray-700 hover:text-black relative cursor-pointer '>About
          <div className="absolute left-0 -bottom-1 w-full h-px bg-[#9A7428] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"></div>
        </li></a>
        <a href="#craft"><li className='group uppercase text-gray-700 hover:text-black relative cursor-pointer '>Craftsmanship
          <div className="absolute left-0 -bottom-1 w-full h-px bg-[#9A7428] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"></div>        
        </li></a>
      </ul>
      
      <ul className='hidden lg:flex space-x-4 list-none items-center'>
        {isLoggedIn ? (
          <>
            <li>
              <CartIcon />
            </li>
            <li>
              <UserMenu
                name={session?.user?.name ?? "User"}
                email={session?.user?.email ?? ""}
              />
            </li>
            <li>
              <Button2
                href='/'
                text="Shop Now"
                className='py-2 px-4 uppercase'
              />
            </li>
          </>
        ) : (
          <ul className='flex gap-4 items-center'>
            <li>
              <Link href='/login' className='text-gray-700 hover:text-black'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>
              </Link>
            </li>
            <li>
              <Link href='/login' className='text-gray-700 hover:text-black text-[11px] tracking-[0.14em] uppercase'>Sign In</Link>
            </li>
            <li>
              <Button2
                href='/login'
                text="Shop Now"
                className='py-2 px-4 uppercase'
              />
            </li>
          </ul>
        )}
      </ul>
      <MobileMenu isLoggedIn={isLoggedIn}/>
    </nav>
  )
}

export default Navbar