"use client"
import React from 'react'
import { CartTitle } from '@/lib/constants'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cartStore } from '@/store'
function Cart({status}:{status:number}) {
  const {cartList,updateQuantity,removeCart} = cartStore()
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1)


  const handleClick=(index:number)=>{
    removeCart(index)
  }
  const handleValueChange=(value:string,index:number)=>{
    updateQuantity(index,Number(value))
  }
  
  return (
    <div className='container'>
      {cartList.length ? (
        <div className="py-24 px-2 flex">
          <div className="flex-1 mr-14">
            <h2 className="text-2xl font-bold mb-6">{CartTitle}</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartList.map((cartItem, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center">
                        <Image
                          src={cartItem.image}
                          alt={cartItem.name}
                          width={64}
                          height={64}
                          priority
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'cover',
                          }}
                        />
                        <div className="ml-4 space-y-3">
                          <p className="text-sm font-medium">{cartItem.name}</p>
                          <p className="text-xs text-gray-400">{cartItem.selectedVariant}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Trash2
                          className="mr-1"
                          color="gray"
                          cursor="pointer"
                          onClick={() => handleClick(i)}
                        />
                        <Select value={cartItem.quantity.toString()} onValueChange={(value: string) => handleValueChange(value, i)}>
                          <SelectTrigger className="w-14">
                            <SelectValue placeholder="Select Quantity" />
                          </SelectTrigger>
                          <SelectContent>
                            {quantityOptions.map((quantity, i) => (
                              <SelectItem key={i} value={quantity.toString()}>
                                {quantity}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>${cartItem.price}</TableCell>
                    <TableCell className="text-right">${cartItem.price * cartItem.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-56">
            <h2 className="font-sans font-medium flex flex-row text-2xl mb-6">
              Total
            </h2>
            <p className="text-2xl font-bold text-red-400 mb-6">${cartList.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity , 0).toFixed(2)}</p>
            {status === 200 ? (
              <Link href="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            ) : (
              <>
                <Link href="/account">
                  <Button className="w-full">Login</Button>
                </Link>
                <p className="text-sm text-slate-500 text-center mt-1">
                  You need to login to checkout
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
      <div>empty cart</div>
      )}
    </div>
  )
}

export default Cart