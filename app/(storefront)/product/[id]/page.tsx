import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/components/storefront/ImageSlider";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db"
import { ShoppingBag, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(productId: string) {
    const data = await prisma.product.findFirst({
        where: {
            id: productId
        },
        select: {
            price: true,
            images: true,
            description: true,
            name: true,
            id: true
        }
    })
    if(!data) {
        return notFound()
    }
    return data
}

export default async function Page({params} : {params: {id: string}}) {

    const data = await getData(params.id)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
                <ImageSlider images={data.images} />
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {data.name}
                    </h1>
                    <p className="text-3xl mt-2 text-gray-900">${data.price}</p>
                    <div className="mt-3 flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-base text-gray-700 mt-6">{data.description}</p>
                    <Button className="w-full mt-5" size="lg">
                        <ShoppingBag className="h-5 w-5 mr-4" />
                        Add Cart
                    </Button>
                </div>
            </div>
            <div className="mt-16">
                <FeaturedProducts />
            </div>
        </>
    )
}