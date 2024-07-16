'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "@/lib/zodSchemas";
import prisma from "@/lib/db";

export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user)  {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: productSchema
    })

    if(submission.status !== "success") {
        return submission.reply()
    }

    const flattenUrl = submission.value.images.flatMap((urlString) => {
        return urlString.split(',').map((url) => url.trim())
    })

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            price: submission.value.price,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured ?? false,
            status: submission.value.status,
            images: flattenUrl
        }
    })

    redirect("/dashboard/products")
}

export async function editProduct(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user)  {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: productSchema
    })

    if(submission.status !== "success") {
        return submission.reply()
    }

    const flattenUrl = submission.value.images.flatMap((urlString) => {
        return urlString.split(',').map((url) => url.trim())
    })

    const productId = formData.get("productId") as string
    await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: submission.value.name,
            description: submission.value.description,
            price: submission.value.price,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured ?? false,
            status: submission.value.status,
            images: flattenUrl
        }
    })

    redirect("/dashboard/products")
}

export async function deleteProduct(formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user)  {
        return redirect("/")
    }

    const productId = formData.get("productId") as string

    await prisma.product.delete({
        where: {
            id: productId
        }
    })

    redirect("/dashboard/products")
}