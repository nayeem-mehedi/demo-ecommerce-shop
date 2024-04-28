"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const matchedCartItem = cart.items.find(
    (item) => item.productId == productId,
  );

  if(quantity === 0){
    if(matchedCartItem){
        await prisma.cartItem.delete({
            where: {id: matchedCartItem.id}
        })
    }
  } else {
    if(matchedCartItem){
        await prisma.cartItem.update({
            where: {id: matchedCartItem.id},
            data: {quantity: quantity}
        })
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: productId,
                quantity: quantity,
            },
        });
    }
  }

  revalidatePath("/cart", "page");
}
