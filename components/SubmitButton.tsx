import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface props {
    text: string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export function SubmitButton({text, variant}: props) {
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