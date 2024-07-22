import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, MoreHorizontal, PlusCircle, Trash2, User2 } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";
import Image from "next/image";

async function getData() {
    const response = await prisma.banner.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response
}

export default async function Page() {

    const data = await getData()

    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex gap-x-2">
                    <Link href="/dashboard/banner/create">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Add banner</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banner</CardTitle>
                    <CardDescription>Manage your banner</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="w-full">
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-end">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.map((banner) => (
                                    <TableRow key={banner.id}>
                                        <TableCell>
                                            <Image src={banner.image} alt="banner image" height={64} width={64}
                                                className='rounded-md object-cover h-16 w-16' 
                                                />
                                        </TableCell>
                                        <TableCell className="font-medium">{banner.title}</TableCell>
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
                                                        <Link href={`/dashboard/banner/delete/${banner.id}`} 
                                                            className='w-full flex justify-between'
                                                        >
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