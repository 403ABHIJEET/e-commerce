'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard'
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
  },
  {
    name: 'Products',
    href: '/dashboard/products'
  },
  {
    name: 'Category',
    href: '/dashboard/category'
  }
]

const DashboardNavigation = () => {

  const pathname = usePathname()

  return (
    <>
      {
        links.map((item) => (
          <Link key={item.name} href={item.href} className={cn(
            item.href === pathname ? "text-black" : 
            "text-muted-foreground hover:text-foreground hover:scale-125 transition-all ease-in-out"
          )}>
            {item.name}
          </Link>
        )) 
      }
    </>
  )
}

export default DashboardNavigation
