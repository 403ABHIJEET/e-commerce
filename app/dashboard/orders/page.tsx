import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const Page = () => {
    return (
        <>
            <Card>
                <CardHeader className='px-7'>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Recent orders from your store!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className=''>
                                <TableHead>Customer</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className='text-right'>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableCell>
                                <p className='font-medium'>Abhijeet Kumar</p>
                                <p className='hidden md:flex text-sm text-muted-foreground'>test@test.com</p>
                            </TableCell>
                            <TableCell>Sale</TableCell>
                            <TableCell>Successful</TableCell>
                            <TableCell>24-06-2024</TableCell>
                            <TableCell className='text-right'>$250.00</TableCell>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default Page
