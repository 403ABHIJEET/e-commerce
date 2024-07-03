import React from 'react'
import DashboardNavigation from '@/app/components/dashboard/DashboardNavigation'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white'>
                <nav className='hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
                    <DashboardNavigation />
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='shrink-0 md:hidden' variant='outline' size='icon'>
                            <MenuIcon className='h-5 w-5' />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='flex flex-col items-center'>
                        <DashboardNavigation />
                    </SheetContent>
                </Sheet>
            </header>
            {children}
        </div>
    )
}

export default DashboardLayout
