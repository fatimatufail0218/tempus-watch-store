"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  collection?: string | null;
  description?: string | null;
  price: number;
  leftBadge?: string | null;
  rightBadge?: string | null;
}

const ProductCard = ({
  id,
  image,
  name,
  collection,
  description,
  price,
  leftBadge,
  rightBadge,
}: ProductCardProps) => {
  const { items, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);
  
  const isInCart = items.some((item) => item.id === id);

  return (
    <div className=" w-full w-[415px] bg-white mt-15 flex flex-col">
      <div className="relative group overflow-hidden">
        <Link href={`/products/${id}`}>
          <img
            src={image}
            className="w-full h-[511px] object-cover transition-transform duration-500 group-hover:scale-105"
            alt={name}
          />
        </Link>

        {leftBadge && (
          <div className="absolute top-4 left-4">
            <p className="bg-black text-white px-3 py-2 text-[9px] uppercase">
              {leftBadge}
            </p>
          </div>
        )}

        {rightBadge && (
          <div className="absolute top-4 right-4">
            <p className="bg-gray-200 text-[#868685] px-3 py-2 text-[9px] uppercase">
              {rightBadge}
            </p>
          </div>
        )}

        {/* Wishlist toggle */}
        <button
            onClick={(e) => {
                e.preventDefault();
                toggleWishlist({ id, name, image, price, collection });
            }}
            className="absolute bottom-4 right-4 group-hover:bottom-[52px] w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-all duration-300 z-10 cursor-pointer"
            aria-label="Toggle wishlist"
            >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={inWishlist ? "#9A7428" : "none"}
                stroke={inWishlist ? "#9A7428" : "currentColor"}
                strokeWidth="1.5"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            </button>

        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-all duration-300">
          <Link href={`/products/${id}`}>
            <button className="w-full bg-black text-white py-3 uppercase text-[10px] tracking-[0.2em] cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <p className="text-[10px] font-normal tracking-[0.25em] mt-4 text-[#9A7428] uppercase">
          {collection}
        </p>

        <h1 className="text-[20px] font-light text-black hover:text-[#9A7428] mt-2">
          {name}
        </h1>

        {description && (
          <p className="font-light text-[13px] text-gray-600 my-3">
            {description}
          </p>
        )}

        <p className="font-light text-[13px] text-gray-600 my-3">${price}</p>
      </div>

      <button
        onClick={() => addToCart({ id, name, image, price, collection })}
        disabled={isInCart}
        className={`text-[11px] tracking-[0.14em] transition-colors duration-300 py-3 w-full uppercase flex items-center justify-center gap-2 cursor-pointer ${
          isInCart
            ? "bg-black text-white border border-black cursor-default"
            : "border border-black text-black hover:bg-black hover:text-white"
        }`}
      >
        {isInCart ? (
          <>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            In Cart
          </>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
};

export default ProductCard;