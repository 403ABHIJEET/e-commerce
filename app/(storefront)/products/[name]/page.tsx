import { ProductCard } from "@/components/storefront/ProductCard"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"

async function getData(category: string) {
    switch(category) {
        case 'all': {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    id: true,
                    images: true,
                    description: true,
                    price: true
                },
                where: {
                    status: "publish"
                }
            })
            return {
                title: "All Product",
                data: data
            }
        }
        case 'men': {
            const data = await prisma.product.findMany({
                where: {
                    status: "publish",
                    category: "men"
                },
                select: {
                    name: true,
                    id: true,
                    images: true,
                    description: true,
                    price: true
                }
            })
            return {
                title: "Product for Men",
                data: data
            }
        }
        case 'women': {
            const data = await prisma.product.findMany({
                where: {
                    status: "publish",
                    category: "women"
                },
                select: {
                    name: true,
                    id: true,
                    images: true,
                    description: true,
                    price: true
                }
            })
            return {
                title: "Product for Women",
                data: data
            }
        }
        case 'kids': {
            const data = await prisma.product.findMany({
                where: {
                    status: "publish",
                    category: "kids"
                },
                select: {
                    name: true,
                    id: true,
                    images: true,
                    description: true,
                    price: true
                }
            })
            return {
                title: "Product for Kids",
                data: data
            }
        }
        default: {
            return notFound()
        }
    }
}

export default async function Page({params}: {params: {name: string}}) {
    const {title, data} = await getData(params.name)
    return (
        <section>
            <h1 className="font-semibold text-3xl my-5">{title}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {
                    data.map((item, idx) => (
                        <ProductCard key={idx} item={item} />
                    ))
                }
            </div>
        </section>
    )
}