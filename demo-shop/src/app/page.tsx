import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  searchParams: {page: string}
}

export default async function Home({searchParams: {page = "1"}} : HomeProps) {
  const currPage = parseInt(page)
  const pageSize = 3
  const totalItemCount = await prisma.product.count();

  //TODO: carousal items 
  const heroItemCount = 1

  const totalPages = Math.ceil(totalItemCount/pageSize);
  
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <>
      {/* Add carousal here for slected products */}
      <div className="flex flex-col items-center">
        <div className="product-card hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row ">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link
                href={"/products/" + products[0].id}
                className="btn btn-primary"
              >
                See More
              </Link>
            </div>
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <PaginationBar currentPage={currPage} totalPages={totalPages} />
      </div>
    </>
  );
}
