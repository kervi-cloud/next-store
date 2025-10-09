"use client"
import { ProductsTitle } from '@/lib/constants'
import { sortStore } from '@/store'
import { productsType } from '@/types/global'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface propsType{
  products:productsType[]
}
export const Products = (props:propsType) => {
  const {products} = props
  const {sortValue }= sortStore()
  const router = useRouter()
  if(sortValue!=='latest'){
     products.sort((a,b)=>sortValue==='low'?a.price-b.price:b.price-a.price)
  }
  function handleClick(id:number){
    console.log(id);
    router.push(`/detail/${id}`)
  }
  
  return (
    <div className='flex-1'>
      <h2 className='text-4xl mb-8'>{ProductsTitle}</h2>
       <div className="grid grid-cols-3 gap-4">
        {products.map((product: productsType) => (
          <div key={product.id} className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 transition duration-300 ease-in-out cursor-pointer" onClick={() => handleClick(product.id)}>
            <Image src={product.image} alt={product.name} width={300} height={300} priority />
            <div className="flex items-center justify-between mt-4">
              <h3 className="flex-2xl text-slate-700">{product.name}</h3>
              <p className="text-lg font-bold text-red-400">${product.price}</p>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}
