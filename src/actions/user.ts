'use server'
import db from "@/lib/db";
import { userType } from "@/types/global";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
const SECRET_KEY = 'DUYI-SECRET-KEY'

export async function loginApi(email: string, password: string) {
  const result = await db('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
  const cookie = await cookies()

  if (result.length === 0) {
    return {
      code: 400,
      data: {}
    }
  } else {
    const token = jwt.sign({ email, name: result[0].name, userid: result[0].id }, SECRET_KEY, {
      expiresIn: '1h'
    })
    cookie.set({
      name: 'token',
      value: token,
      path: '/',
      maxAge: 60 * 60 * 24 * 30  // 30 days
    })
    return {
      code: 200,
      data: result[0] || {}
    }
  }
}
export async function logoutAction() {
  const cookie = await cookies()
  cookie.delete('token')
  return {
    status: 200,
    body: 'logout success'
  }
}
export async function registerApi(obj: userType) {
  const { email, password, name } = obj
  const res = await db('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)', [email, password, name])
  if (res) {
    return {
      code: 200,
      data: {}
    }
  } else {
    return {
      code: 400,
      data: {}
    }
  }
}

export async function authAction() {
  const cookie = await cookies();
  const token = cookie.get('token')
  if (token) {
    const result = jwt.verify(token.value, SECRET_KEY) as JwtPayload
    return {
      status: 200,
      data: result
    }
  } else {
    return {
      status: 400,
      data: {}
    }
  }


}