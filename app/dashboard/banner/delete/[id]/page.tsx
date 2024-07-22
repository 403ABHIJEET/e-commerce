'use client'
import { deleteBanner } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page({params}: {params: {id: string}}) {
    return (
        <div className="h-[80vh] flex w-full items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Are you absolutely sure?</CardTitle>
                    <CardDescription>
                        This action cannot be undone. Are you sure you want to delete this item?
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" >
                        <Link href={`/dashboard/products`}>
                            Cancel
                        </Link>
                    </Button>
                    <form action={deleteBanner}>
                        <input type="hidden" name="bannerId" value={params.id} />
                        <SubmitButton text="Delete product" variant="destructive" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}