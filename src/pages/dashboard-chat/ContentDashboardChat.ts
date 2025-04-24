import { useSelector } from 'react-redux'
import { Column, Expanded, Space, Text, Widget } from '../../System/Lib/Widgets'
import { RootState, useAppSelector } from '../../store'
import TestAdbrif from '../adBrief/TestAdbrif'

export default function ContentDasboardChat() {
  const { colors } = useSelector((state: RootState) => state.theme)
  const menu = useAppSelector(state => state.menu.activeMenu)

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
          child: Widget(TestAdbrif),
        }),
      ],
    }),
  }).builder()
}
