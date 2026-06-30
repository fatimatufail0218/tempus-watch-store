"use client";

import Link from "next/link";
import { useState } from "react";
import { logoutUser } from "@/action/user";

interface UserMenuProps {
  name: string;
  email: string;
}

export default function UserMenu({ name, email }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-label="User menu"
        className="text-[#3A3830] hover:text-[#0D0D0B] transition-colors duration-200"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="hover:cursor-pointer hover:text-gray-400"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>

      {/* Invisible bridge taake mouse-gap se onMouseLeave na ho */}
      {open && <div className="absolute right-0 top-full h-3 w-56"></div>}

      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] w-56 bg-white border border-gray-200 shadow-lg z-50">
          <div className="px-5 py-4">
            <p className="text-[14px] text-black">{name}</p>
            <p className="text-[12px] text-gray-500 mt-0.5">{email}</p>
          </div>

          <Link
            href="/private/wishlist"
            className="block px-5 py-2 text-[10px] uppercase tracking-[0.14em] text-black hover:bg-gray-50 transition border-t border-gray-100"
          >
            Wishlist
          </Link>

          <Link
            href="/private/orders"
            className="block px-5 py-2 text-[10px] uppercase tracking-[0.14em] text-black hover:bg-gray-50 transition border-t border-gray-100"
          >
            My Orders
          </Link>

          <form action={logoutUser} className="border-t border-gray-100">
            <button
              type="submit"
              className="w-full text-left px-5 py-2 text-[9px] uppercase tracking-[0.14em] text-red-500 hover:bg-gray-50 transition"
            >
              Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}