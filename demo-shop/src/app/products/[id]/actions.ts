"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const matchedCartItem = cart.items.find(
    (item) => item.productId == productId,
  );

  if (matchedCartItem) {
    await prisma.cartItem.update({
      where: { id: matchedCartItem.id },
      data: {
        quantity: { increment: 1 },
      },
    });
  } else {
    await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            productId: productId,
            quantity: 1,
        },
    });
  }

  revalidatePath("/product/[id]", "layout");
}
