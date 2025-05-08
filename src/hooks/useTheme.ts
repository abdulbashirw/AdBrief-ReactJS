import { useAppSelector } from '../store'
import { useEffect } from 'react'

export const useTheme = () => {
  const theme = useAppSelector(state => state.theme)
  useEffect(() => {
    localStorage.setItem('theme', theme.theme)
  }, [theme.theme])

  return theme
}
