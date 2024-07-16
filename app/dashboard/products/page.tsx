import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import prisma from '@/lib/db'

async function getData() {
    const data = prisma.product.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return data
}

export default async function Page() {

    const data = await getData()

    return (
        <>
            <div className='flex items-center justify-end'>
                <Button asChild className='flex items-center gap-x-2'>
                    <Link href='/dashboard/products/create' >
                        <PlusCircle className='w-3.5 h-3.5' />
                        <span>Add Product</span>
                    </Link>
                </Button>
            </div>
            <Card className='mt-5'>
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                        Manage your product and view their sales performance
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[100px]'>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className='text-end'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <Image height={64} width={64} src={product.images[0]} alt="Product image" className='rounded-md object-cover h-16 w-16' />
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.status}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{dayjs(product.createdAt).format('MMM D, YYYY')}</TableCell>
                                        <TableCell className='text-end'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size='icon' variant='ghost'>
                                                        <MoreHorizontal className='h-4 w-4' />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='center'>
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Link href={`/dashboard/products/edit/${product.id}`} className='w-full flex justify-between'>
                                                            Edit
                                                            <Edit2 className='w-4 h-4 hidden sm:block' />
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Link href={`/dashboard/products/delete/${product.id}`} className='w-full flex justify-between'>
                                                            Delete <Trash2 className='w-4 h-4 ml-auto hidden sm:block' />
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
