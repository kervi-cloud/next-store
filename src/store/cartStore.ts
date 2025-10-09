import { carItemList, } from '@/types/global'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Actions = {
  cartList: carItemList[],
  addToCart: (cartList: carItemList[]) => void
  isItemInCart: (name: string, selectedVariant: string) => number
  updateQuantity: (index: number, quantity: number) => void
  removeCart:(index:number)=>void
}

const cartStore = create<Actions>()(
  persist(
    (set, get) => ({
      cartList: [],
      addToCart: (cartList) => set(cart => ({ cartList: [...cart.cartList, ...cartList] })),
      isItemInCart: (name, selectedVariant): number => {
        return get().cartList.findIndex((item: carItemList) => item.name === name && item.selectedVariant === selectedVariant)
      },
      updateQuantity: (index, quantity) => set(cart => {
        const newCartList = [...cart.cartList]
        newCartList[index].quantity = quantity
        return { cartList: newCartList }
      }),
      removeCart: (index: number) => set(cart => {
        const newCartList = [...cart.cartList]
        newCartList.splice(index, 1)
        return { cartList: newCartList }
      }),
    })
    ,
    {
      name: "cart-storage",
    }
  )
)
export default cartStore