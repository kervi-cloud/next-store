import React from 'react'
import { getProductsActions, getProductsDetail } from '@/actions/products'
import Image from 'next/image'
import AddCart from '@/components/AddCart'
export async function generateStaticParams() {
  const result = await getProductsActions()
  return result.data.map(product => ({
    id: product.id + ''
  }))
}

const Page = async ({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params
  const {data} = await getProductsDetail(id)
  
  return (
    <div className='flex container py-6'>
      <div className='w-64'>
        <h3 className='font-sans font-bold leading-10 text-3xl my-8'>{data.name}</h3>
        <p className='leading-10'>{data.description}</p>
      </div>
      <div className='h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative'>
        <Image src={data.image} alt={data.name} fill priority sizes="300" style={{objectFit: 'cover'}} />
      </div>
      <AddCart products={data}/>
    </div>
  )
}

export default Page