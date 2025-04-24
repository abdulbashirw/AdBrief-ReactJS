import { toggleTheme } from '../../store/slices/theme.slice'
import {
  Button,
  Center,
  Column,
  Expanded,
  Image,
  Rows,
  SingleChildScrollView,
  SizedBox,
  Space,
  Switch,
  Text,
} from '../../System/Lib/Widgets'
import logo from '../../assets/images/adbrief.png'
import { useLocation, useNavigate } from 'react-router-dom'
import Menu from './Menu'
import { useEffect } from 'react'
import { setActiveMenu } from '@/store/slices/menu.slice'
import { useAppDispatch, useAppSelector } from '@/store'
import { useTheme } from '@/hooks/useTheme'

export default function SideBar() {
  const nav = useNavigate()
  const location = useLocation()
  const Theme = useTheme()
  const dispatch = useAppDispatch()
  const menuItems = useAppSelector(state => state.menu.items)

  const activeMenu = menuItems.find(item => item.route === location.pathname)

  useEffect(() => {
    if (activeMenu) {
      dispatch(setActiveMenu(activeMenu))
    }
  }, [location.pathname])

  return Column({
    children: [
      SizedBox({
        padding: 12,
        child: Center({
          child: Image({
            src: logo,
            width: 200,
            height: 'auto',
          }),
        }),
      }),
      SizedBox({
        padding: 12,
        child: Text('APP', { size: 14, weight: 'bold' }),
      }),
      SizedBox({
        child: Column({
          children: Menu(),
        }),
      }),
      SizedBox({
        paddingTop: 25,
        child: Center({
          child: Button('Back in Chat', {
            icon: 'undo',
            height: 35,
            onClick: () => {
              nav('/')
            },
          }),
        }),
      }),
      SizedBox({
        paddingTop: 25,
        paddingLeft: 12,
        child: Text('Riwayat Chat', { size: 14, weight: 'bold' }),
      }),
      Expanded({
        child: SingleChildScrollView({
          child: Column({
            children: [
              SizedBox({
                padding: 12,
                // child: Column({
                //   children: RiwayatChat(),
                // }),
              }),
            ],
          }),
        }),
      }),
      SizedBox({
        padding: 10,
        child: Column({
          children: [
            Text('Bantuan', { icon: 'plus', size: 10, textAlign: 'center', weight: 'bold' }),
            Space(25),
            Text('Copyright © AdBrief AI by PT. Administrasi Medika', { size: 10, weight: 'bold' }),
          ],
        }),
      }),
      SizedBox({
        height: 35,
        borderTop: '1px solid theme.border',
        paddingLeft: 10,
        child: Rows({
          children: [
            Switch({
              checked: Theme.theme === 'dark',
              label: Theme.theme === 'dark' ? 'Dark Theme' : 'Light Theme',
              onChange: () => dispatch(toggleTheme()),
            }),
            Expanded(),
            // Click({
            //   click: () => {
            //     setWidth(width == 300 ? 60 : 300);
            //   },
            //   width: width !== 300 ? 60 : 30,
            //   height: 30,
            //   radius: 30,
            //   margin: 8,
            //   child: Center({
            //     child: Icon(width !== 300 ? "arrow_circle_right" : "arrow_circle_left")
            //   })
            // })
          ],
        }),
      }),
    ],
  })
}
