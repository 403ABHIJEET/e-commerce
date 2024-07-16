'use client'
import { createProduct } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { UploadDropzone } from '@/lib/uploadthing'
import { ChevronLeft, DivideIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { productSchema } from '@/lib/zodSchemas'
import Image from 'next/image'
import { categories } from '@/lib/categories'
import { SubmitButton } from '@/components/SubmitButton'

const Page = () => {
    const [images, setImages] = useState<string[]>([])
    const [lastResult, action] = useFormState(createProduct, undefined)
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: productSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    const handleDelete = (idx: number) => {
        setImages(images.filter((_, i) => i !== idx))
    }

    return (
        <form action={action} id={form.id} onSubmit={form.onSubmit}>
            <div className="flex items-center gap-4">
                <Button variant='outline' size='icon' asChild>
                    <Link href='/dashboard/products'>
                        <ChevronLeft className='w-4 h-4' />
                    </Link>
                </Button>
                <h1 className='text-xl font-semibold tracking-tight'>New Product</h1>
            </div>
            <Card className='mt-5'>
                <CardHeader>
                    <CardTitle>Product Datails</CardTitle>
                    <CardDescription>In this form you can create your product</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <Label>Name</Label>
                            <Input
                                type='text'
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={fields.name.initialValue}
                                className='w-full'
                                placeholder='Product name'
                            />
                            <p className='text-red-500'>{fields.name.errors}</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Description</Label>
                            <Textarea
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={fields.description.initialValue}
                                placeholder='Write your description right here...'
                            />
                            <p className='text-red-500'>{fields.description.errors}</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Price</Label>
                            <Input
                                type='number'
                                key={fields.price.key}
                                name={fields.price.name}
                                defaultValue={fields.price.initialValue}
                                className='w-full'
                                placeholder='$55'
                            />
                            <p className='text-red-500'>{fields.price.errors}</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Featured Product</Label>
                            <Switch
                                key={fields.isFeatured.key}
                                name={fields.isFeatured.name}
                                defaultValue={fields.isFeatured.initialValue}
                            />
                            <p className='text-red-500'>{fields.isFeatured.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select key={fields.status.key} name={fields.status.name} defaultValue={fields.status.initialValue}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='draft'>Draft</SelectItem>
                                    <SelectItem value='publish'>Publish</SelectItem>
                                    <SelectItem value='archived'>Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className='text-red-500'>{fields.status.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Category</Label>
                            <Select key={fields.category.key} name={fields.category.name} defaultValue={fields.category.initialValue}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        categories.map((item) => (
                                            <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <p className='text-red-500'>{fields.category.errors}</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Images</Label>
                            <input
                                type='hidden'
                                key={fields.images.key}
                                name={fields.images.name}
                                value={images}
                                defaultValue={fields.images.initialValue as any}
                            />
                            {
                                images.length > 0 ?
                                    (
                                        <div className='flex gap-5'>
                                            {
                                                images.map((image, index) => (
                                                    <div key={index} className='relative w-[100px] h-[100px]'>
                                                        <Image
                                                            height={100}
                                                            width={100}
                                                            src={image}
                                                            alt='Product Image'
                                                            className='w-full h-full object-cover rounded-lg border'
                                                        />
                                                        <Button
                                                            type='button'
                                                            onClick={() => handleDelete(index)}
                                                            className='absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white h-7 w-7 hover:bg-red-900'>
                                                            <XIcon className='w-3 h-3' />
                                                        </Button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) :
                                    (
                                        <UploadDropzone endpoint='imageUploader'
                                            onClientUploadComplete={(res) => {
                                                setImages(res.map((r) => r.url))
                                            }}
                                            onUploadError={() => {
                                                alert("Error uploading")
                                            }}
                                        />
                                    )
                            }
                            <p className='text-red-500'>{fields.images.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Create Product" />
                </CardFooter>
            </Card>
        </form>
    )
}

export default Page
