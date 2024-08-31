'use client'
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, ShoppingBag } from "lucide-react";

interface props {
    text: string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export function SubmitButton({ text, variant }: props) {
    const vari = variant ?? "default";
    const { pending } = useFormStatus()
    return (
        <>
            {
                pending ?
                    (
                        <Button disabled variant={variant}>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait!
                        </Button>
                    ) :
                    (
                        <Button type="submit" variant={variant}>
                            {text}
                        </Button>
                    )
            }
        </>
    )
}

export function ShoppingBagButton() {
    const { pending } = useFormStatus()

    return (
        <>
            {
                pending ? (
                    <Button disabled size="lg" className="w-full mt-5">
                        <Loader2 className="mr-4 w-5 h-5 animate-spin"/> Please Wait
                    </Button>
                ): (
                    <Button size="lg" className="w-full mt-5" type="submit">
                        <ShoppingBag className="mr-4 w-5 h-5"/> Add to Cart
                    </Button>
                )
            }
        </>
    )
}

export function DeleteButton() {
    const {pending} = useFormStatus()

    return (
        <>
            {
                pending ? (
                    <Button className="font-medium text-end text-primary bg-transparent hover:bg-transparent">
                        Removing...
                    </Button>
                ) : (
                    <Button type="submit" className="font-medium text-end text-primary bg-transparent hover:text-white">
                        Delete
                    </Button>
                )
            }
        </>
    )
}