import prisma from "@/lib/db"
import { ProductCard } from "./ProductCard"

async function getData() {
    const data = await prisma.product.findMany({
        where: {
            status: "publish"
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return data
}

export async function FeaturedProducts() {

    const data = await getData()

    return (
        <>
            <h2 className="text-2xl ">Featured Items</h2>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    data.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))
                }
            </div>
        </>
    )
}