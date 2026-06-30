"use client";

import { useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  orderId: string;
  createdAt: Date;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: string;
  paymentMethod: string | null;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  items: OrderItem[];
}

interface OrderCardProps {
  order: Order;
}

const STAGES = ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];

export default function OrderCard({ order }: OrderCardProps) {
  const [open, setOpen] = useState(false);

  const currentStageIndex = STAGES.indexOf(order.status);
  const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);

  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="border border-gray-200">
      {/* Header row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex flex-wrap items-center justify-between gap-4 p-6 text-left"
      >
        <div>
          <p className="uppercase text-[10px] tracking-[0.15em] text-gray-400">
            Order ID
          </p>
          <p className="text-[14px] mt-1">{order.orderId}</p>
        </div>

        <div>
          <p className="uppercase text-[10px] tracking-[0.15em] text-gray-400">
            Placed
          </p>
          <p className="text-[14px] mt-1">{formattedDate}</p>
        </div>

        <div>
          <p className="uppercase text-[10px] tracking-[0.15em] text-gray-400">
            Items
          </p>
          <p className="text-[14px] mt-1">{totalItems} watches</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="uppercase text-[10px] tracking-[0.15em] text-gray-400">
              Total
            </p>
            <p className="text-[16px] mt-1">${order.total}</p>
          </div>

          <span className="border border-gray-300 px-4 py-2 text-[10px] uppercase tracking-[0.15em]">
            {order.status}
          </span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-200 p-6">
          {/* Status stepper */}
          <div className="flex items-center mb-12 px-2">
            {STAGES.map((stage, index) => (
              <div key={stage} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      index <= currentStageIndex
                        ? "bg-black"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`uppercase text-[9px] tracking-[0.1em] whitespace-nowrap ${
                      index <= currentStageIndex
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {stage}
                  </span>
                </div>
                {index < STAGES.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 ${
                      index < currentStageIndex
                        ? "bg-black"
                        : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            {/* Items ordered */}
            <div>
              <p className="uppercase text-[11px] tracking-[0.15em] text-gray-400 mb-4">
                Items Ordered
              </p>

              <div className="flex flex-col gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-[#FAFAF7] p-4"
                  >
                    <div className="w-16 h-16 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <p className="text-[15px]">{item.name}</p>
                      <p className="text-[12px] text-gray-500 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-[14px] self-center">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment + shipping */}
            <div className="flex flex-col gap-6">
              <div className="border border-gray-200 p-6">
                <p className="uppercase text-[11px] tracking-[0.15em] text-gray-400 mb-4">
                  Payment
                </p>
                <div className="flex justify-between text-[13px] text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>${order.subtotal}</span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-600 mb-2">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : `$${order.shipping}`}</span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-600 mb-4">
                  <span>Tax</span>
                  <span>${order.tax}</span>
                </div>
                <div className="w-full h-px bg-gray-200 mb-4"></div>
                <div className="flex justify-between text-[15px] font-medium mb-3">
                  <span>Total</span>
                  <span>${order.total}</span>
                </div>
                {order.paymentMethod && (
                  <p className="text-[12px] text-gray-500">
                    Paid with {order.paymentMethod}
                  </p>
                )}
              </div>

              <div className="border border-gray-200 p-6">
                <p className="uppercase text-[11px] tracking-[0.15em] text-gray-400 mb-4">
                  Shipping To
                </p>
                <p className="text-[13px] text-gray-700 leading-relaxed">
                  {order.firstName} {order.lastName}
                  <br />
                  {order.address}
                  <br />
                  {order.city}, {order.state} {order.zipCode}
                  <br />
                  {order.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}