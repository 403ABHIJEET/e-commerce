import Link from 'next/link'
import React from 'react'

const DashboardNavigation = () => {

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

  return (
    <>
      {
        links.map((item) => (
          <Link key={item.name} href={item.href}>
            {item.name}
          </Link>
        )) 
      }
    </>
  )
}

export default DashboardNavigation
