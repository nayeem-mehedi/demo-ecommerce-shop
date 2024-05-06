import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";
import { isNew } from "@/lib/db/timeUtil";

interface ProductCardPorps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardPorps) {
  let numOfNewDays = 7;
  //TODO: add support for sale, clearance, flash_sale, free_shipping, free_gifts
  //TODO: in main product page categories, keywords, bundle support (deal and suggestion)

  return (
    <Link href={`/products/${product.id}`}>
      {/* <div className="card w-96 bg-base-100 shadow-xl"> */}
      {/* <div className="card w-full bg-base-100 shadow-md transition-shadow hover:shadow-xl"> */}
      <div className="card w-full shadow-md transition-shadow hover:shadow-xl product-card">
        {/* <div className="glass"> */}
        <figure>
          <Image
            src={product.imageUrl}
            alt={`image of ${product.name}`}
            width={800}
            height={400}
            className="h-48 object-cover"
          />
          {/* <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            /> */}
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name}
          </h2>
          {isNew(product.createdAt, numOfNewDays) && <div className="badge badge-secondary">NEW!</div>}
          {/* <p>{product.description}</p> */}
          <div className="justify-between">
            <div className="">
              <PriceTag price={product.price} />
            </div>
            {/* <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </Link>
  );
}
