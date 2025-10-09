import { sortType } from '@/types/global'
import { create } from 'zustand'

type Actions = {
  sortValue: sortType
  setSortValue: (sortValue: sortType) => void
}

const sortStore = create< Actions>((set) => ({
  sortValue: "latest",
  setSortValue: (sortValue: sortType) => set({ sortValue }),
}))
export default sortStore