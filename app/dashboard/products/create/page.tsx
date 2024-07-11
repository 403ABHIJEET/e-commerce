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
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useFormState } from 'react-dom'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { productSchema } from '@/lib/zodSchemas'

const Page = () => {
    const [ lastResult, action] = useFormState(createProduct, undefined)
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {schema: productSchema})
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })
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
                            <Switch />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='draft'>Draft</SelectItem>
                                    <SelectItem value='publish'>Publish</SelectItem>
                                    <SelectItem value='archived'>Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Images</Label>
                            <UploadDropzone endpoint='imageUploader' 
                                onClientUploadComplete={(res) => {
                                    alert("Finished uploading")
                                }}
                                onUploadError={() => {
                                    alert("Error uploading")
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>
                        Create Product
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default Page
