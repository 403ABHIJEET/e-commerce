'use client'
import { createBanner } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { bannerSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

export default function Page() {

    const [image, setImage] = useState<string | undefined>(undefined)
    const [lastResult, action] = useFormState(createBanner, undefined)

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bannerSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action} >
            <div className="flex items-center gap-x-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/banner`}>
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banner Details</CardTitle>
                    <CardDescription>You can create your banner right here</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                name={fields.title.name} key={fields.image.key}
                                defaultValue={fields.title.initialValue}
                                type="text" placeholder="Card title for banner"
                            />
                            <p className="text-red-500">{fields.title.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Image</Label>
                            <input 
                                type="hidden"
                                key={fields.image.key}
                                name={fields.image.name}
                                defaultValue={fields.image.initialValue} 
                                value={image}
                            />
                            {
                                image !== undefined ?
                                (
                                    <Image src={image} 
                                        alt="Banner image" 
                                        height={200} width={200} 
                                        className="w-[200px] h-[200px] object-cover rounded-lg border" 
                                    />
                                ) :
                                (
                                    <UploadDropzone onClientUploadComplete={(res) => {
                                            setImage(res[0].url)
                                        }}
                                        onUploadError={() => {
                                            alert('Something went wrong')
                                        }}
                                        endpoint="bannerImageUploader"
                                    />
                                )
                            }
                            <p className="text-red-500">{fields.image.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Create Banner" />
                </CardFooter>
            </Card>
        </form>
    )
}