export type sortType = 'latest' | 'low' | 'high';

export interface productsType{
  id:number,
  name:string,
  price:number,
  description:string,
  image:string,
  variant:string[]
}

export interface carItemList extends productsType{
  quantity:number,
  selectedVariant:string
}
export type NotAccountType = 'login' | 'register'
export interface userType{
  name?:string,
  email:string,
  password:string
}
export interface AddressType{
  id:number,
  name:string,
  city:string,
  address:string,
  phone:string,
  userid:number
}