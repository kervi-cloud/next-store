'use server'
import db from "@/lib/db";
import { productsType } from "@/types/global";


export async function getProductsActions() {
  const result = await db('SELECT * from products') as productsType[]
  return {
    code: 200,
    data: result
  }
}

export async function getProductsDetail(id:string){
  const  result = await db('SELECT * from products where id = $1',[id]) as productsType[]
  return {
    code:200,
    data:result[0] || {}
  }
}