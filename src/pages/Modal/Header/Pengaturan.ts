import { useSelector } from 'react-redux'
import {
  Button,
  Column,
  Container,
  Expanded,
  IconMui,
  Rows,
  SizedBox,
  Space,
  Text,
  Widget,
} from '../../../System/Lib/Widgets'
import { RootState } from '../../../store'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useState } from 'react'
import ContentSetting from './PengaturanContent'
import ContentGantiPassword from './PengaturanGantiPassword'

export default function ContentPengaturan({ modal }) {
  const { colors } = useSelector((state: RootState) => state.theme)

  const [selectedTab, setSelectedTab] = useState(1) // default tab aktif

  const PengaturanNavItems = [
    { index: 1, title: 'Pengaturan', icon: 'settings' },
    { index: 2, title: 'User', icon: 'lock' },
  ]

  const TabViews = {
    1: () => Widget(ContentSetting),
    2: () => Widget(ContentGantiPassword),
  }
  return Column({
    width: '100%',
    theme: colors,
    boxSizing: 'border-box',
    color: 'theme.background',
    child: Column({
      padding: 20,
      children: [
        SizedBox({
          child: Rows({
            children: [
              Text('Pengaturan', { size: 20 }),
              Expanded({}),
              IconMui(CloseRoundedIcon, {
                size: 20,
                onClick: () => {
                  modal?.unMounting()
                },
              }),
            ],
          }),
        }),
        // Space(10),

        Space(25),
        SizedBox({
          height: 5,
          borderTop: '2px solid theme.border',
        }),
        Expanded({
          child: Rows({
            //center: true,
            borderRadius: 10,
            //border: '2px solid theme.border',
            children: [
              Container({
                child: Column({
                  padding: 10,
                  flexWrap: 'wrap',
                  gap: 10,
                  children: PengaturanNavItems.map(item => {
                    const isActive = selectedTab === item.index
                    return Button(item.title, {
                      padding: 10,
                      icon: item.icon,
                      justifyContent: 'left',
                      borderRadius: 10,
                      backgroundColor: isActive ? 'theme.primary' : 'theme.background',
                      fontColor: isActive ? 'theme.onPrimary' : 'theme.textPrimary',
                      onClick: () => setSelectedTab(item.index),
                    })
                  }),
                }),
              }),
              SizedBox({
                minHeight: '100px',
                borderLeft: '2px solid theme.border',
              }),
              Expanded({
                child: Container({
                  padding: 10,
                  child: TabViews[selectedTab](),
                }),
              }),
            ],
          }),
        }),
      ],
    }),
  }).builder()
}
