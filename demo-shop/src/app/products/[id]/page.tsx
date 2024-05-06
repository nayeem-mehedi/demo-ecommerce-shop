import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma"
import Image from "next/image";
import { notFound } from "next/navigation"
import { Metadata } from "next";
import { cache } from "react";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
    params: {
        id: string,
    }
}

// preparing a cache for React server component
// https://react.dev/reference/react/cache
// https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components
const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({where: {id}})

    if(!product) {
        notFound();
    }

    return product;
})

export async function generateMetadata(
    {params: {id}} : ProductPageProps
): Promise<Metadata> {
    
    const product = await getProduct(id);

    return {
        title: product.name + " - Digital Depot",
        description: product.description,
        openGraph: {
            images: [{url: product.imageUrl}], // can add more images
        },
    };
}

export default async function ProductPage(
    {params: {id}} : ProductPageProps
) {
    let numOfNewDays = 7;

    const product = await getProduct(id);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />
            <div>
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4"/>
                <p className="py-6">{product.description}</p>
                <AddToCartButton productId={product.id} />
            </div>
        </div>
    )
}