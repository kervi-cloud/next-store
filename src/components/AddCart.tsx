"use client"
import { productsType } from '@/types/global'
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { cartStore } from '@/store'
import React, { useState } from 'react'

const AddCart = ({ products }: { products: productsType }) => {
  console.log(products);
  const [selectTag, setSelectTag] = useState<string>("")
  const {cartList,addToCart,isItemInCart,updateQuantity} = cartStore()
  const selectTagHandle = (value: string) => {
    setSelectTag(value)
     
  }
  const addCartHandle = ()=>{
    const index = isItemInCart(products.name,selectTag)    
    if(index>=0){
      updateQuantity(index,cartList[index].quantity+1)
    }else{
      addToCart([{
        ...products,
        selectedVariant: selectTag,
        quantity: 1,
      }])
    }
    setSelectTag("")
  }
  return (
    <div className='w-80 py-12'>
      <h2>{products.name}</h2>
      <ToggleGroup className='justify-start py-6 border-b mb-6' variant="outline" type="single" value={selectTag} onValueChange={selectTagHandle}>
        {products.variant.map((item, i) => <ToggleGroupItem className="px-4" key={i} value={item}>
          {item}
        </ToggleGroupItem>)}
      </ToggleGroup>
      <h3>
        Price
      </h3>
      <div className='text-2xl font-bold text-red-400 mb-6'>
        ${products.price}
      </div>
      <div>
        <Button disabled={!selectTag} variant="outline" onClick={addCartHandle}>Add to cart</Button>
      </div>
    </div>
  )
}

export default AddCart