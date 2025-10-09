'use client'
import { MenuList, Title } from '@/lib/constants'
import { Separator } from "@/components/ui/separator"

import Link from 'next/link'
import React, { Fragment } from 'react'
import { cartStore } from '@/store'
const Header = () => {
  const {cartList} = cartStore()
  return (
    <div className='h-16 px-10 border-b bg-white'>
      <div className='container flex items-center justify-between h-full'>
        <div className='text-2xl'>
          <Link href='/'>{Title}</Link>
        </div>
        <div className='flex justify-end space-x-4 text-sm h-1/3'>
          {MenuList.map((item,i) => (
            <Fragment key={item.text}>
              {i!==0 && <Separator orientation="vertical" />}
              <Link href={item.href}>{item.text}</Link>
            </Fragment>
          ))}
        {cartList.length?`(${cartList.length})`:""}
        </div>
      </div>
    </div>
  )
}

export default Header