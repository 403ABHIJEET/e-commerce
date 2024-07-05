import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { UploadDropzone } from '@/lib/uploadthing'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <form action="">
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
                            <Input type='text' className='w-full' placeholder='Product name' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Description</Label>
                            <Textarea placeholder='Write your description right here...'/>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Price</Label>
                            <Input type='number' className='w-full' placeholder='$55' />
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
                            <UploadDropzone endpoint='imageUploader' />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}

export default Page
