'use server'
import db from "@/lib/db";
import { AddressType } from "@/types/global";
import { revalidatePath } from "next/cache";


export async function addAddressAction(obj: Omit<AddressType, 'id'>) {
  const { name, city, address, phone,userid } = obj;
  await db('INSERT INTO addresses (name, city, address, phone, userid) VALUES ($1, $2, $3, $4, $5)', [name, city, address, phone, userid])
  revalidatePath('/account')
  return {
    status: 200,
    body: 'add address success'
  }
}
export async function getAddressesAction( userid: number ) {
  const result = await db('SELECT * FROM addresses WHERE userid = $1', [userid]) as AddressType[]
  return {
    status: 200,
    body: 'addresses success',
    data: result
  }
}
export async function removeAddressAction(id:string){
  await db('DELETE FROM addresses WHERE id = $1', [id])
  revalidatePath('/account')
  return {
    status: 200,
    body: 'remove address success'
  }
}