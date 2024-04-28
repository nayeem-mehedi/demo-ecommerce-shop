"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/db/format";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
    function closeDropdown(){
        const elem = document.activeElement as HTMLElement
        if(elem) {
            elem.blur();
        }
    }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        <div className="indicator">
          <svg
            className="h-5 w-5"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
          >
            <rect fill="none" height="256" width="256" />
            <path
              d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <circle
              cx="80"
              cy="204"
              fill="none"
              r="20"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <circle
              cx="184"
              cy="204"
              fill="none"
              r="20"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <path
              d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
          <span className="badge indicator-item badge-xs indicator-bottom">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div 
      tabIndex={0}
      className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30">
        <div className="card-body">
            <span className="text-lg font-bold">{cart?.size || 0} Item(s)</span>
            <span className="text-info">
                Subtotal: {formatPrice(cart?.subtotal || 0, "en-CA")}
            </span>
            <div className="card-actions">
                <Link
                href="/cart"
                className="btn btn-primary btn-block"
                onClick={closeDropdown}
                >
                    View Cart
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
