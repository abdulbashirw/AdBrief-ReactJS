import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MenuItem {
  title: string
  icon: string
  route: string
  children?: MenuItem[]
}

interface MenuState {
  items: MenuItem[]
  activeMenu?: MenuItem
}

const initialState: MenuState = {
  items: [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      title: 'Dashboard Chat',
      icon: 'dashboard',
      route: '/dashboard-chat',
    },
    {
      title: 'User Management',
      icon: 'people',
      route: '/user-management',
    },
  ],
  activeMenu: undefined,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload)
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.route !== action.payload)
    },
    setActiveMenu: (state, action: PayloadAction<MenuItem | undefined>) => {
      state.activeMenu = action.payload
    },
  },
})

export const { setMenu, setActiveMenu, addMenuItem, removeMenuItem } = menuSlice.actions
export default menuSlice.reducer
