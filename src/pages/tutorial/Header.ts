import {
  Click,
  Expanded,
  Icon,
  IconMui,
  Rows,
  SizedBox,
  Space,
  Menu,
  Text,
  MenuItem,
  ListItemText,
  Divider,
  Switch,
  Column,
} from '../../System/Lib/Widgets'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useTheme } from '../../hooks/useTheme'
import { toggleTheme } from '../../store/slices/theme.slice'
import { useDispatch } from 'react-redux'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'

export default function Header() {
  const dispatch = useDispatch()
  const Theme = useTheme()
  const menuItems = [
    { label: 'Single', icon: IconMui(SettingsRoundedIcon) },
    {
      label: Theme.mode === 'dark' ? 'Mode Dark' : 'Mode Light',
      icon: Theme.mode === 'dark' ? IconMui(DarkModeRoundedIcon) : IconMui(LightModeRoundedIcon),
      iconAction: Switch({
        checked: Theme.mode === 'dark',
        onChange: () => dispatch(toggleTheme()),
      }),
    },
    { label: 'Hubungi Kami ', icon: IconMui(CallRoundedIcon) },
    { label: 'Keluar', icon: IconMui(LogoutRoundedIcon) },
  ]

  const notificationItems = [
    {
      label: 'Notifikasi 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      label: 'Notifikasi 2',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      label: 'Notifikasi 3',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ]

  return Rows({
    children: [
      SizedBox({
        padding: 10,
        child: Icon('menu'),
      }),
      Expanded(),
      SizedBox({
        padding: 10,
        child: Rows({
          center: true,
          children: [
            // Icon(IconMui(NotificationsRoundedIcon)),
            Click({
              click: (e: any) => {
                const menu = Menu(e, {
                  children: notificationItems.map((item: any) => {
                    if (item === 'divider') {
                      return Divider({ width: 100 })
                    }
                    return MenuItem({
                      onClick: () => menu.unMounting(),
                      child: ListItemText({
                        width: 'auto',
                        child: Rows({
                          children: [
                            Column({
                              children: [
                                Text(item.label, { size: 14, weight: 'bold' }),
                                Text(item.content, {
                                  size: 12,
                                  width: 350,
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  whiteSpace: 'wrap',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    })
                  }),
                })
              },
              //child: Center({ child: IconMui(MoreVertIcon) })
              child: Rows({
                children: [
                  SizedBox({
                    child: Rows({
                      center: true,
                      children: [IconMui(NotificationsRoundedIcon)],
                    }),
                  }),
                ],
              }),
            }),
            Space(5),
            Click({
              click: (e: any) => {
                const menu = Menu(e, {
                  children: menuItems.map((item: any) => {
                    if (item === 'divider') {
                      return Divider({ width: 100 })
                    }
                    return MenuItem({
                      onClick: () => menu.unMounting(),
                      child: ListItemText({
                        child: Rows({
                          children: [
                            item.icon,
                            Space(10),
                            Text(item.label),
                            item.iconAction ? SizedBox({ width: 30, child: item.iconAction }) : SizedBox({ width: 30 }),
                          ],
                        }),
                      }),
                    })
                  }),
                })
              },
              //child: Center({ child: IconMui(MoreVertIcon) })
              child: Rows({
                children: [
                  SizedBox({
                    padding: 10,
                    borderRadius: 10,
                    width: 100,
                    border: '1px solid theme.border',
                    child: Rows({
                      center: true,
                      children: [Icon('home'), Space(5), Text('Dummy', { size: 14, weight: 'bold' })],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  })
}
