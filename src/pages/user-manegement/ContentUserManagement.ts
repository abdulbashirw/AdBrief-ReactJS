import { useSelector } from 'react-redux'
import { Column, Expanded, Space, Text } from '../../System/Lib/Widgets'
import { RootState, useAppSelector } from '../../store'
import RoleUser from './role-user'

export default function ContentUserManagement() {
  const { colors } = useSelector((state: RootState) => state.theme)
  const menu = useAppSelector(state => state.menu.activeMenu)

  //const refTable = useRef<any>(null)
  //const tableUserManagemment = generateTable('user-management', refTable, tableData)

  return Column({
    width: '100%',
    theme: colors,
    boxSizing: 'border-box',
    color: 'theme.background',
    child: Column({
      padding: 20,
      children: [
        menu ? Text(menu.title, { size: 30 }) : null,
        Space(20),
        Expanded({
          child: RoleUser(),
        }),
      ],
    }),
  }).builder()
}
