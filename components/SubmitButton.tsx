import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton({text}: {text: string}) {
    const { pending } = useFormStatus()
    return (
        <>
            {
                pending ?
                (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait! 
                    </Button>
                ) :
                (
                    <Button type="submit">
                        {text}
                    </Button>
                )
            }
        </>
    )
}