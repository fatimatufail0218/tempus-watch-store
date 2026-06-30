"use client";

import Marquee from "react-fast-marquee";

export default function MarqueeText() {
  return (
    <div className=" overflow-hidden bg-black">

      {/* Top Marquee */}
      <Marquee speed={40} direction="left">
        <div className="flex items-center bg-black text-[#9A7428] py-4 gap-6 text-[11px] uppercase tracking-[0.25em] border-b-[1px] border-b-[#806022] font-bold">
          <span>●</span>
          <span>2-Year warranty</span>
          <span>●</span>
          <span>sapphire crystal glass</span>
          <span>●</span>
          <span>30-day returns</span>
          <span>●</span>
          <span>exhibition caseback</span>
          <span>●</span>
          <span>authenticity guaranteed</span>
          <span>●</span>
          <span>premium packaging</span>
          <span>●</span>
          <span>free worldwide shipping</span>
          <span>●</span>
          <span>swiss automatic movement</span>
          <br />
        </div>
      </Marquee>

      {/* Bottom Marquee */}
      <Marquee
        speed={40}
        direction="right"
        className=""
      >
        <div className="flex bg-black text-gray-500 items-center py-4 gap-6 text-[11px] font-bold uppercase tracking-[0.25em]">
          <span>●</span>
          <span>In house servicing</span>
          <span>●</span>
          <span>stainless steel case</span>
          <span>●</span>
          <span>Luminous hands</span>
          <span>●</span>
          <span>scratch resistant</span>
          <span>●</span>
          <span>ISO certified</span>
          <span>●</span>
          <span>lifetime support</span>
          <span>●</span>
          <span>precision engineered</span>
          <span>●</span>
          <span>water resistant to 100m</span>
          <br />
        
        </div>
      </Marquee>

    </div>
  );
}