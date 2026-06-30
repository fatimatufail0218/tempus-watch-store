import Navbar from "@/components/auth/navbar";
import Button2 from "@/components/button2";
import MarqueeText from "@/components/marquee";
import ProductCard from "@/components/ProductCard";
import TheCollectionCarousel from "@/components/TheCollectionCarousel";
import Footer from "@/components/footer";
import Image from "next/image";
import { getAllProducts } from "@/lib/queries/products";


export default async function Home() {
     const products = await getAllProducts();
  
  return (
    
    <>
    <section id="hero" className="min-h-screen max-w-[1500px] mx-auto">
      <div className="flex flex-col lg:flex-row">

        <div className="w-full lg:w-[48%] px-6 md:px-10 lg:px-8 m-auto pt-[86px] lg:pt-18 lg:pb-0">
          <h1 className="flex flex-col text-[42px] md:text-[56px] xl:text-[70px] text-black leading-none">
            Time, Worn
            <span className="text-[#9A7428] italic">With Intent.</span>
          </h1>
          <p className="text-[15px] font-light leading-1.8 text-[#7A7670] mb-10 max-w-[380px]">
            Curated timepieces for those who understand that a watch is not merely an instrument — it is a declaration of who you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a href="#collection">
              <button className="uppercase text-[10px] font-medium leading-tight border bg-black hover:bg-[#1b1b1b] text-white py-4 px-8 tracking-widest">
                Explore Collection
              </button>
            </a>
            <a href="/about">
              <button className="uppercase text-[10px] font-medium leading-tight border border-gray-300 hover:border-gray-400 text-black py-4 px-8 tracking-widest">
                Our Story
              </button>
            </a>
          </div>
          <div className="relative w-full max-w-[380px] h-[50px] mt-10 hidden md:block">
              <div className="absolute left-1 bottom-0 w-px h-[50px] bg-gradient-to-b from-gray-300 to-white" />
              <div className="absolute left-0 bottom-[25px] h-px w-[380px] bg-gradient-to-r from-gray-300 to-white -translate-x-1" />
          </div>

          <div className="mt-5 flex flex-wrap gap-8 md:gap-10">
            <div>
              <h1 className="font-medium text-black text-[40px]">
                500+
              </h1>
              <p className="font-normal text-gray-500 text-[10px] uppercase tracking-widest">
                Timepieces
              </p>
            </div>
            <div>
              <h1 className="font-medium text-black text-[40px]">
                12K+
              </h1>
              <p className="font-normal text-gray-500 text-[10px] uppercase tracking-widest">
                Customers
              </p>
            </div>
            <div>
              <h1 className="font-medium text-black text-[40px]">
                4.9&#9733;
              </h1>
              <p className="font-normal text-gray-500 text-[10px] uppercase tracking-widest">
                avg Ratings
              </p>
            </div>
          </div>



        </div>

        <div className="w-full lg:w-[52%] relative min-w-0 overflow-hidden ">
          <img
            src="hero1.webp"
            className="block w-full h-[500px] md:h-[700px] lg:h-screen object-cover"
          />
            <div className="absolute  inset-0 bg-[#0d0d0b80]"></div>
            <div className="absolute inset-0 flex">
              <div className="absolute h-full w-[0.5px] ml-10 bg-[#9A7428] "></div>
              <div className="absolute inset-0 flex flex-col justify-end items-end pr-6 md:pr-10 pb-12 md:pb-20 text-right">
                <h5 className="uppercase text-gray-400 text-[11px] tracking-[0.14em]">starting from</h5>
                <h1 className="text-white text-[42px] md:text-[60px] xl:text-[70px] font-normal">
                  $189
                  <div className="ml-auto mt-1 h-px w-12 bg-[#9A7428]"></div>
                </h1>
              </div>
              
          </div>

        </div>
      </div>

    </section>


    <section id="marquee">
      <MarqueeText />
    </section>




  <section id="collection" className="bg-[#FAFAF7] py-16 px-6 lg:px-12 justify-between">
  <div className="max-w-xl ">  
  <div className="flex mt-10 items-center gap-2">
    <div className="h-px w-5 bg-[#9A7428]"></div>
    <h1 className="font-normal text-[11px] text-[#9A7428] uppercase tracking-[3px]">
      our collection
    </h1>
  </div>

  <h1 className="font-normal text-[36px] md:text-[42px] xl:text-[50px] py-4">Featured <span className="italic text-[#9A7428]">Timepieces</span></h1>
  <p className="font-light text-gray-500 text-[15px] max-w-[450px] w-full">
    A curated selection of our most distinguished watches — each one crafted for those who measure time with intention.
  </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        image={product.image}
        name={product.name}
        collection={product.collection}
        price={product.price}
        leftBadge={product.leftBadge}
        
      />
    ))}
  </div>
</section>



  <section id="craft" className="bg-[#FFFFFF] py-16 px-6 lg:px-9">
  <TheCollectionCarousel
    products={products}
    heading={
      <div className="max-w-xl px-3">
        <div className="flex mt-10 items-center gap-2">
          <div className="h-px w-5 bg-[#9A7428]"></div>
          <h1 className="font-normal text-[11px] text-[#9A7428] uppercase tracking-[3px]">
            Handpicked For You
          </h1>
        </div>
        <h1 className="font-normal text-[36px] md:text-[42px] xl:text-[50px] py-4">
          The <span className="italic text-[#9A7428]">Collection</span>
        </h1>
        <p className="font-light text-gray-500 text-[15px] max-w-[460px] w-full">
          Discover our curated selection of exceptional timepieces — each one chosen for its craftsmanship, heritage, and timeless design.
        </p>
      </div>
    }
  />
</section>

{/* --------------------------------our philosophy section------------------------ */}

<section id="about" className="items-center m-auto py-16 md:py-20 max-w-[95%] px-6 flex flex-col gap-16 md:gap-20">
  <div className="max-w-[560px] m-auto flex flex-col items-center justify-center gap-2">
    <div className="flex items-center gap-4 ">
    <div className="h-px w-6 bg-[#9A7428]"></div>
    <h1 className="text-[10px] uppercase text-[#9A7428] tracking-[3px]">Our Philosophy</h1>
    <div className="h-px w-6 bg-[#9A7428]"></div>
  </div>
  <h1 className="font-normal text-[34px] md:text-[42px] xl:text-[50px] py-4 text-center leading-none">Driven by <span className="italic text-[#9A7428]">Craft,</span> <br />
    Built to Last.</h1>

  <p className="font-light text-gray-500 text-[12px] md:text-[15px] max-w-[460px] text-center">
    We believe a watch is more than an instrument — it's a declaration of who you are.<br />That's why every piece in our collection is chosen with intention.
  </p> 
  </div>


  <div className="flex flex-col lg:flex-row gap-12 lg:gap-15 items-center">
    <img
      src="/philosophy.jpg"
      alt=""
      className="w-full lg:w-[48%] h-[500px] md:h-[650px] lg:min-h-[700px] object-cover"
    />

    <div className="w-full lg:w-[52%] flex flex-col gap-10 md:gap-12">
      <div className="flex items-start gap-5">
        <svg width="50" height="50" className="-mt-2 shrink transition-all duration-300 hover:scale-105 hover:-translate-y-1 -translate-y-1.5 md:translate-y-0" viewBox="0 0 24 24" fill="none" stroke="#9A7428" strokeWidth="1.2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <div className="flex flex-col gap-3">
          <h1 className="text-[16px] md:text-[20px] text-black font-light">
            Precision Engineering
          </h1>
          <p className="text-[11.5px] text-[#858586] font-light">
            Every timepiece is selected for mechanical integrity. We partner with manufacturers who uphold Swiss and Japanese horological excellence.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-5">
        <svg width="50" height="50" className="-mt-2 shrink transition-all duration-300 hover:scale-105 hover:-translate-y-1 -translate-y-1.5 md:translate-y-0" viewBox="0 0 24 24" fill="none" stroke="#9A7428" strokeWidth="1.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>  
          <div className="flex flex-col gap-3">
          <h1 className="text-[16px] md:text-[20px] text-black font-light">
            Curated Selection
          </h1>
          <p className="text-[11.5px] text-[#858586] font-light">
            Each watch passes rigorous evaluation — materials, finishing, movement accuracy, and enduring design are all carefully assessed.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <svg width="50" height="50" className="-mt-2 shrink transition-all duration-300 hover:scale-105 hover:-translate-y-1 -translate-y-1.5 md:translate-y-0" viewBox="0 0 24 24" fill="none" stroke="#9A7428" strokeWidth="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>       
         <div className="flex flex-col gap-2">
          <h1 className="text-[16px] md:text-[20px] text-black font-light">
            Backed by Confidence
          </h1>
          <p className="text-[11.5px] text-[#858586] font-light">
            2-year warranty, 30-day returns, and dedicated support. When you invest in Tempus, the relationship doesn't end at checkout.
          </p>
        </div>
      </div>
    </div>
  </div>
  

  <div className="border-t border-black/[0.08] pt-12 w-full">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
    <div className="flex flex-col items-center text-center gap-4 py-4">
      <span className="text-[#9A7428]"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      </span>
      <p className="font-sans text-[10px] text-[#7A7670] tracking-[0.22em] uppercase font-medium">2-Year Warranty</p>
      </div>
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <span className="text-[#9A7428]"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
        </span>
        <p className="font-sans text-[10px] text-[#7A7670] tracking-[0.22em] uppercase font-medium">30-Day Returns</p>
        </div>
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <span className="text-[#9A7428]"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </span>
          <p className="font-sans text-[10px] text-[#7A7670] tracking-[0.22em] uppercase font-medium">Free Global Shipping</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <span className="text-[#9A7428]"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span>
            <p className="font-sans text-[10px] text-[#7A7670] tracking-[0.22em] uppercase font-medium">Swiss Movements</p>
            </div>
            </div>
            </div>
</section>






    </>
  );
}
