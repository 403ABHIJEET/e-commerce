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
    name: 'Banner Picture',
    href: '/dashboard/banner'
  }
]

const DashboardNavigation = () => {

  const pathname = usePathname()
  let activePath = "/dashboard/"
  let idx = activePath.length;
  while (idx < pathname.length && pathname[idx] != '/') {
    activePath += pathname[idx]
    idx++;
  }
  return (
    <>
      {
        links.map((item) => (
          <Link key={item.name} href={item.href} className={cn("text-center",
            item.href === activePath ? "text-black" :
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
