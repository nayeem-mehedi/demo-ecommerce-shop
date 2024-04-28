import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

const COOKIE_NAME = "localCartId";

// a custom type for Cart with products (What we are returning from Cart below)
export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {product: true};
}>

// type that has that custom return type + size + total value
export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  // good convention to include the type
  const localCartId = cookies().get(COOKIE_NAME)?.value;

  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId }, //findById
        // include: { items: true } // include the mentioned column (items) which will have all the carditems ids
        include: { items: { include: { product: true } } }, //include the mentioned column -> items and for each item, include -> product (product column in cartitem)
      })
    : null;

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (accTotal, item) => accTotal + item.quantity * item.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  cookies().set(COOKIE_NAME, newCart.id);
  //TODO: encrypt cart id
  //TODO: explore security concerns -> handle

  // manually create an empty Obj of ShoppingCart -> CartWithProducts + items + size + subtotal
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
