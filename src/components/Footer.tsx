import { NavList, Title } from '@/lib/constants'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import React, { Fragment } from 'react'

const Footer = () => {
  return (
    <div className='border-t mt-6'>
      <div className='container py-3 flex justify-between'>
        <div className='text-2xl'>
          <Link href='/'>{Title}</Link>
        </div>
        <div className='flex gap-10'>
          {NavList.map((item, i) => {
            return <Fragment key={item.title}>
              {i !== 0 && <Separator orientation="vertical" />}
              <div>
                <span>{item.title}</span>
                <ul className='m-4 space-y-3'>
                  {item.list.map(v => {
                    return <li key={v}>{v}</li>
                  })}
                </ul>
              </div>
            </Fragment>
          })}
        </div>
      </div>
    </div>
  )
}

export default Footer