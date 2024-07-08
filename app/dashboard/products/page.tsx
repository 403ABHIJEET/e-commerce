'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Delete, Edit2, MoreHorizontal, PlusCircle, Trash2, UserIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
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
                            <TableRow>
                                <TableCell>
                                    <UserIcon className='w-16 h-16' />
                                </TableCell>
                                <TableCell>Nike air</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>$299.00</TableCell>
                                <TableCell>15/06/2024</TableCell>
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
                                            <DropdownMenuItem>Edit <Edit2 className='w-4 h-4 ml-auto'/></DropdownMenuItem>
                                            <DropdownMenuItem>Delete <Trash2 className='w-4 h-4 ml-auto' /></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default Page
