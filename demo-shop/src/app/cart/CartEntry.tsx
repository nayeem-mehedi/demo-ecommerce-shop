"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/db/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
    const [isPending, startTransition] = useTransition();


  const quantityOptions: JSX.Element[] = [];

  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div>
            <span className="font-bold">Price: </span>
            <span>{formatPrice(product.price, "en-CA")}</span>
          </div>
          <div className="my-1 flex items-center gap-2">
            <span className="font-bold">Quantity: </span>
            <select
              className="select select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => await setProductQuantity(product.id, newQuantity));
              }}
            >
                <option value={0} key={0}>0 (remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">Total: </span>
            <span>{formatPrice(quantity * product.price, "en-CA")}</span>
            {isPending && <span className="loading loading-dots loading-md"></span>}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
