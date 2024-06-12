import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { userId } = auth()
        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        const body = await request.json()
        const { name } = body
        if(!name) {
            return new NextResponse("Name is required", {status: 400})
        }
        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })
        return NextResponse.json({
            store,
            message: "Store-model created successfull"
        }, {status: 200})
    } catch (error) {
        console.log('[STORES_POST]', error)
        return new NextResponse("Internal Error", {status: 500})
    }
}