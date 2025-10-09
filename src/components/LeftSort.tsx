"use client"
import { SortList, SortTitle } from '@/lib/constants'
import React from 'react'

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { sortType } from '@/types/global'
import { sortStore } from '@/store'

const LeftSort = () => {
  const {setSortValue} =  sortStore()
  const toggleHanlde = (key: sortType) => {
    setSortValue(key)
  }
  return (
    <div className='w-64 py-4'>
      <h3 className='m-3 text-xl'>{SortTitle}</h3>
      <ToggleGroup defaultValue={SortList[0].value} className="flex-col gap-3 pr-5" type="single" onValueChange={toggleHanlde}>
        {SortList.map(item => {
          return <ToggleGroupItem key={item.value} value={item.value} aria-label="Toggle bold">
            {item.text}
          </ToggleGroupItem>
        })}
      </ToggleGroup>
    </div>
  )
}

export default LeftSort