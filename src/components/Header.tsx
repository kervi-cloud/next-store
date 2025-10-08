import { MenuList, Title } from '@/lib/constants'
import { Separator } from "@/components/ui/separator"

import Link from 'next/link'
import React, { Fragment } from 'react'

const Header = () => {
  return (
    <div className='h-16 px-10 border-b bg-white'>
      <div className='container flex items-center justify-between h-full'>
        <div className='text-2xl'>
          <Link href='/'>{Title}</Link>
        </div>
        <div className='flex justify-end space-x-4 text-sm h-1/3'>
          {MenuList.map((item,i) => (
            <Fragment>
              {i!==0 && <Separator orientation="vertical" />}
              <Link key={item.href} href={item.href}>{item.text}</Link>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header