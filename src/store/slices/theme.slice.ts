import { createSlice } from '@reduxjs/toolkit'
import { lightTheme, darkTheme } from '../../assets/themes'
import { ThemeType } from '../../assets/themes/themeTypes'

export interface ThemeState {
  theme: 'light' | 'dark'
  colors: ThemeType
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme === 'dark' ? 'dark' : 'light'
  }
  return 'light'
}

const localTheme = getInitialTheme()

const initialState: ThemeState = {
  theme: getInitialTheme(),
  colors: localTheme === 'light' ? lightTheme : darkTheme,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.theme === 'light') {
        state.theme = 'dark'
        state.colors = darkTheme
      } else {
        state.theme = 'light'
        state.colors = lightTheme
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      state.colors = action.payload === 'light' ? lightTheme : darkTheme
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
