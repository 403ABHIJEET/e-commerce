import { EditForm } from "@/components/dashboard/EditForm"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if(!data) {
        return notFound()
    }
    return data
}

export default async function Page({params}: {params: {id: string}}) {
    const data = await getData(params.id)
    return (
        <EditForm data={data} />
    )
}