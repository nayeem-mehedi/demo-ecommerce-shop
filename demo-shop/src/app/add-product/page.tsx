import FromSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation";

export const metadata = {
    title: "Add Product - Digital Depot"
}

async function addProduct(formData : FormData) {
    "use server";
 
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("image-url")?.toString();
    const price = Number(formData.get("price") || 0);

    // throw Error("bazingaa!");

    if(!name || !description || !imageUrl || !price || price === 0){
        throw Error("Missing required fields");
    }

    await prisma.product.create({
        data: {name, description, imageUrl, price}
    });

    redirect("/");
    
}

export default function AddProductPage() {
    return (
        <>
            <div>
                <h1 className="text-lg mb-3 font-bold">Add Product</h1>
                <form action={addProduct}>
                    <input
                        required
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="input input-bordered mb-3 w-full"
                    />
                    {/* max-w-2xl */}
                    <textarea
                    required
                    name="description"
                    placeholder="Decription"
                    className="textarea textarea-bordered mb-3 w-full"
                    ></textarea>

                    <input
                        required
                        name="image-url"
                        type="url"
                        placeholder="image url"
                        className="input input-bordered mb-3 w-full"
                    />

                    <input
                        required
                        name="price"
                        type="number"
                        placeholder="price"
                        className="input input-bordered mb-3 w-full"
                    />
                    <FromSubmitButton>Add Product</FromSubmitButton>
                </form>
            </div>
        </>
    ) 

}