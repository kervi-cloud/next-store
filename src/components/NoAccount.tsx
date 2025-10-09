'use client'
import Login from '@/components/Login'
import Register from '@/components/Register'
import { NotAccountType } from '@/types/global'
import React, { useState } from 'react'

const NoAccount = () => {
  const [notAccountType, setNotAccountType] = useState<NotAccountType>('login')
  return (
    <div>
      {notAccountType==='login'?<Login setNotAccountType={setNotAccountType} />:<Register setNotAccountType={setNotAccountType} />}
    </div>
  )
}

export default NoAccount