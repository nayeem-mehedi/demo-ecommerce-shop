import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const COOKIE_LOCAL_CART = "localCartId";

// a custom type for Cart with products (What we are returning from Cart below)
export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

// type that has that custom return type + size + total value
export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    // good convention to include the type
    const localCartId = cookies().get(COOKIE_LOCAL_CART)?.value;

    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId }, //findById
          // include: { items: true } // include the mentioned column (items) which will have all the carditems ids
          include: { items: { include: { product: true } } }, //include the mentioned column -> items and for each item, include -> product (product column in cartitem)
        })
      : null;
  }

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
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    cookies().set(COOKIE_LOCAL_CART, newCart.id);
    //TODO: encrypt cart id
    //TODO: explore security concerns -> handle
  }

  // manually create an empty Obj of ShoppingCart -> CartWithProducts + items + size + subtotal
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function mergeAnonymousCartIntoUserCart(userId: string) {
  console.log("MERGER CART called on login");


  // get the local cart ID from cookie
  const localCartId = cookies().get(COOKIE_LOCAL_CART)?.value;

  // get the local cart from DB
  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true },
      })
    : null;

  if (!localCart) return;

  // get user cart from DB
  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      // when there are items in the user cart in DB
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

    // delete all existing user cart items thata are  in DB
      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      // create new user cart items in DB
      await tx.cartItem.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      // when there is no item in the user cart in DB

      // nested create -> create the main entry with all the dependent entries
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    // delete the (cookied) local cart entry from DB
    await tx.cart.delete({
      where: {id: localCart.id}
    })

    //delete cookie
    cookies().set(COOKIE_LOCAL_CART, "");

  });
}

function mergeCartItems(...cartItems: CartItem[][]): CartItem[] {
  return cartItems.reduce((initList, items) => {
    items.forEach((item) => {
      const existingItem = initList.find((i) => i.productId === item.productId);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        initList.push(item);
      }
    });

    return initList;
  }, [] as CartItem[]);
}
