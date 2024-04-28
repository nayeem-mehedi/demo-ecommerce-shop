"use client";

import { incrementProductQuantity } from "@/app/products/[id]/actions";
import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  let [isPending, startTransition] = useTransition();
  let [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          startTransition(async () => {
            setSuccess(false);
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to Cart
        <svg
          className="h-5 w-5"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
        >
          <rect fill="none" height="256" width="256" />
          <path
            d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <circle
            cx="80"
            cy="204"
            fill="none"
            r="20"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <circle
            cx="184"
            cy="204"
            fill="none"
            r="20"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <path
            d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </button>
      {isPending && <span className="loading loading-dots loading-md"></span>}
      {!isPending && success && (<span className="text-success">Product Added to Cart</span>)}
    </div>
  );
}
