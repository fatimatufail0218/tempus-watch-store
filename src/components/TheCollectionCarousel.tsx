"use client";
import ProductCard from "./ProductCard";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Product {
  id: number;
  image: string;
  name: string;
  collection: string;
  description: string;
  price: number;
  leftBadge: string | null;
  rightBadge: string | null;
}

interface TheCollectionCarouselProps {
  products: Product[];
  heading?: React.ReactNode;
}

export default function TheCollectionCarousel({
  products,
  heading,
}: TheCollectionCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-7">
        {heading}

        <div className="flex items-center gap-3 shrink-0 self-start md:self-end px-3">
          <button
            aria-label="Previous slide"
            onClick={scrollPrev}
            className="w-12 h-12 border border-black/[0.12] text-[#0D0D0B] flex items-center justify-center hover:bg-[#0D0D0B] hover:text-white hover:border-[#0D0D0B] transition-all duration-300 hover:cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={scrollNext}
            className="w-12 h-12 border border-black/[0.12] text-[#0D0D0B] flex items-center justify-center hover:bg-[#0D0D0B] hover:text-white hover:border-[#0D0D0B] transition-all duration-300 hover:cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden mt-5 w-full min-w-0">
        <div className="flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_33.333%] px-2 md:px-3"
            >
              <ProductCard
                id={product.id}
                image={product.image}
                name={product.name}
                collection={product.collection}
                description={product.description}
                price={product.price}
                leftBadge={product.leftBadge ?? undefined}
                rightBadge={product.rightBadge ?? undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-12 lg:mt-[90px]">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-px transition-all duration-300 cursor-pointer ${
              selectedIndex === index ? "w-12 bg-black" : "w-8 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
}