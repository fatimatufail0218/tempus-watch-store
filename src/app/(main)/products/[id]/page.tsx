import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/queries/products";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const product = await getProductById(Number(id));

  if (!product) {
    return notFound();
  }

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20 overflow-x-hidden">
      <p className="uppercase text-[10px] tracking-[0.14em] text-gray-400 mt-5 mb-5">
        Home / Collection /{" "}
        <span className="text-black font-light text-[10px]">
          {product.name}
        </span>
      </p>

      <hr />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 mt-20 mb-10">
        <div className="min-w-0 relative w-full max-w-[555px] mx-auto h-[380px] sm:h-[460px] md:h-[540px] lg:h-[624px] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover block"
          />
          <div className="absolute top-4 left-4 ">
            <span className="bg-black text-white px-4 py-2 text-[9px] uppercase tracking-[0.14em]">
              {product.leftBadge}
            </span>
            </div>
            <WishlistButton
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              collection={product.collection}
            />
          
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between">
            <p className="uppercase tracking-[0.25em] text-[10px] font-normal text-[#9A7428]">
              {product.collection}
            </p>

            <span className="border border-gray-300 px-4 py-2 text-[9px] uppercase tracking-[0.2em]">
              {product.rightBadge}
            </span>
          </div>

          <h1 className="text-[48px] font-light mt-5 leading-none">
            {product.name}
          </h1>

          <p className="text-[18px] mt-5 text-[#868685]">${product.price}</p>

          <div className="w-full h-px bg-gray-200 my-10"></div>

          <p className="text-gray-500 text-[14px] ">{product.description}</p>

          <div className="grid grid-cols-2 gap-y-5 mt-12">
            <div>
              <h4 className="uppercase text-[9px] font-bold tracking-[0.25em] text-[#868685]">
                Movement
              </h4>
              <p className="mt-1 text-[13px]">{product.movement}</p>
            </div>

            <div>
              <h4 className="uppercase text-[9px] font-bold tracking-[0.25em] text-[#868685]">
                Case Size
              </h4>
              <p className="mt-1 text-[13px]">{product.caseSize}</p>
            </div>

            <div>
              <h4 className="uppercase text-[9px] font-bold tracking-[0.25em] text-[#868685]">
                Water Resistance
              </h4>
              <p className="mt-1 text-[13px]">{product.waterResistance}</p>
            </div>

            <div>
              <h4 className="uppercase text-[9px] font-bold tracking-[0.25em] text-[#868685]">
                Crystal
              </h4>
              <p className="mt-1 text-[13px]">{product.crystal}</p>
            </div>

            <div>
              <h4 className="uppercase text-[9px] font-bold tracking-[0.25em] text-[#868685]">
                Strap
              </h4>
              <p className="mt-1 text-[13px]">{product.strap}</p>
            </div>

            <div>
              <h4 className="uppercase text-[9px] font-bold tracking-[0.25em] text-[#868685]">
                Warranty
              </h4>
              <p className="mt-1 text-[13px]">{product.warranty}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <AddToCartButton
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              collection={product.collection}
            />

            <Link href="/">
              <button className="w-full py-4 border border-[#868685] uppercase tracking-[0.25em] text-[10px] hover:bg-black hover:text-white transition">
                ← Continue Shopping
              </button>
            </Link>

            <div className="mt-12 pt-10 border-t border-black/[0.08] grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-3">
                <span className="text-[#9A7428]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </span>
                <span className="font-sans text-[9px] text-[#7A7670] tracking-[0.22em] uppercase font-medium">
                  2-Year Warranty
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <span className="text-[#9A7428]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                </span>
                <span className="font-sans text-[9px] text-[#7A7670] tracking-[0.22em] uppercase font-medium">
                  30-Day Returns
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <span className="text-[#9A7428]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </span>
                <span className="font-sans text-[9px] text-[#7A7670] tracking-[0.22em] uppercase font-medium">
                  Free Shipping
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>

    </section>
  );
}