"use client";

import Link from "next/link";
import { useState } from "react";
import Button2 from "../button2";
import { logoutUser } from "@/action/user";
import CartIcon from "./cart-icon";

interface MobileMenuProps {
  isLoggedIn: boolean;
}

export default function MobileMenu({ isLoggedIn }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar Icons */}
      <div className="lg:hidden flex items-center gap-4">
        
          <CartIcon />
        

        <button onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
          {open ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="3" y1="7" x2="21" y2="7"></line>
              <line x1="3" y1="12" x2="15" y2="12"></line>
              <line x1="3" y1="17" x2="21" y2="17"></line>
            </svg>
          )}
        </button>
      </div>

      {/* FULLSCREEN MENU */}
      {open && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-[999] border-t border-gray-200 shadow-lg overflow-y-auto">
          <div className="pt-10">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-6 py-5 border-b uppercase tracking-[0.2em] text-[12px]"
            >
              Collection
            </Link>

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="block px-6 py-5 border-b uppercase tracking-[0.2em] text-[12px]"
            >
              About
            </Link>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-6 py-5 border-b uppercase tracking-[0.2em] text-[12px]"
            >
              Craftsmanship
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/private/wishlist"
                  onClick={() => setOpen(false)}
                  className="block px-6 py-5 border-b uppercase tracking-[0.2em] text-[12px]"
                >
                  Wishlist
                </Link>

                <Link
                  href="/private/orders"
                  onClick={() => setOpen(false)}
                  className="block px-6 py-5 border-b uppercase tracking-[0.2em] text-[12px]"
                >
                  My Orders
                </Link>

                <form action={logoutUser} className="border-b">
                  <button
                    type="submit"
                    onClick={() => setOpen(false)}
                    className="w-full text-left px-6 py-5 uppercase tracking-[0.2em] text-[12px]"
                  >
                    Logout
                  </button>
                </form>

                <div className="p-6">
                  <Button2
                    href="/"
                    text="Shop Now"
                    className="w-full py-3 uppercase"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="border-b py-8 px-6 flex flex-col gap-6">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="uppercase tracking-[0.2em] text-[12px]"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="uppercase tracking-[0.2em] text-[12px]"
                  >
                    Create Account
                  </Link>
                </div>

                <div className="p-6">
                  <Button2
                    href="/login"
                    text="Shop Now"
                    className="w-full py-3 uppercase"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}