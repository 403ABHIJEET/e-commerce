import React from 'react'
import DashboardNavigation from '@/components/dashboard/DashboardNavigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { UserDropdown } from '@/components/storefront/UserDropdown'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user) {
        return redirect('/')
    }

    return (
        <div className='flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white'>
                <nav className='hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:text-lg lg:gap-6'>
                    <DashboardNavigation />
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='shrink-0 md:hidden' variant='outline' size='icon'>
                            <MenuIcon className='h-5 w-5' />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left'>
                        <nav className='grid gap-6 text-lg font-medium mt-5'>
                            <DashboardNavigation />
                        </nav>
                    </SheetContent>
                </Sheet>
                <UserDropdown
                    name={user.given_name as string}
                    email={user.email as string}
                    image={user.picture ?? `https://avatar.vercel.sh/rauchg/${user.given_name}`}  
                />
            </header>
            <main className='my-5'>{children}</main>
        </div>
    )
}
