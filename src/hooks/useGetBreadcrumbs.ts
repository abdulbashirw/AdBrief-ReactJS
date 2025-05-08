import { MenuItem } from '@/store/slices/menu.slice'
import { useAppSelector } from '@/store'
import { useMemo } from 'react'

function findBreadcrumbs(items: MenuItem[], fullPath: string, basePath = ''): MenuItem[] | null {
  for (const item of items) {
    const currentPath = `${basePath}${item.route}`
    if (currentPath === fullPath) return [item]

    if (item.children) {
      const childPath = findBreadcrumbs(item.children, fullPath, currentPath)
      if (childPath) return [item, ...childPath]
    }
  }

  return null
}

export function useGetBreadcrumbs(route: string): MenuItem[] | null {
  const menuItems = useAppSelector(state => state.menu.items)

  const breadcrumbs = useMemo(() => {
    return findBreadcrumbs(menuItems, route)
  }, [menuItems, route])

  return breadcrumbs
}
