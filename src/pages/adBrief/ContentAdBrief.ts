import { useSelector } from 'react-redux'
import {
  Center,
  Column,
  Container,
  Expanded,
  Image,
  Row,
  Rows,
  SingleChildScrollView,
  SizedBox,
  Space,
  Text,
} from '../../System/Lib/Widgets'
import { RootState, useAppDispatch, useAppSelector } from '../../store'
import { useTheme } from '@/hooks/useTheme'
import logo from '../../assets/images/adbrief.png'
import logo1 from '../../assets/images/adbrief1.png'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setActiveMenu } from '@/store/slices/menu.slice'

export default function ContentAdBrief() {
  const [hover, setHover] = useState<number>(-1)
  const Theme = useTheme()
  const { colors } = useSelector((state: RootState) => state.theme)

  const nav = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const menuItems = useAppSelector(state => state.menu.items)
  const activeMenu = menuItems.find(item => item.route === location.pathname)
  useEffect(() => {
    if (activeMenu) {
      dispatch(setActiveMenu(activeMenu))
    }
  }, [location.pathname])

  const contentItems = [
    {
      Title: 'Mulai Percakapan Dengan AI',
      Action: () => {
        dispatch(setActiveMenu())
        nav('/dashboard-chat')
      },
    },
    {
      Title: 'Buat Dashboard',
      Action: () => {
        dispatch(setActiveMenu())
        nav('/dashboard')
      },
    },
  ]

  return Column({
    width: '100%',
    theme: colors,
    boxSizing: 'border-box',
    color: 'theme.background',
    child: Column({
      padding: 20,
      child: SingleChildScrollView({
        child: Column({
          children: [
            Row({
              children: [
                Expanded({
                  backgroundColor: Theme.theme === 'dark' ? '#303030' : '#D3D3D3',
                  borderRadius: 10,
                  border: '1px solid theme.border',
                  child: Column({
                    children: [
                      Space(50),
                      Container({
                        padding: 10,

                        center: true,
                        child: Image({
                          src: Theme.theme === 'dark' ? logo1 : logo,
                          width: 346,
                          height: 'auto',
                        }),
                      }),
                      SizedBox({
                        padding: 20,
                        paddingLeft: 250,
                        paddingRight: 250,
                        center: true,
                        textAlign: 'Center',
                        fontSize: '14px',
                        child: Text(
                          'Lorem ipsum dolor sit amet consectetur. Nec non feugiat quis sed mattis proin at pulvinar sed. Massa in egestas sed vitae diam commodo purus. Id in orci eget volutpat elementum tortor sem mi rhoncus. Gravida lectus consequat turpis vel dignissim. Donec id porttitor at pellentesque nullam. Id urna proin quis duis sit. Est urna pellentesque ullamcorper lectus eu dis malesuada. Consequat augue ultrices arcu blandit leo in quam diam amet. Sagittis aenean dignissim est tortor natoque turpis egestas quis fermentum. Diam ultrices et mattis habitant. Sagittis nisi lobortis erat massa non.',
                        ),
                      }),
                      Space(50),
                      Rows({
                        center: true,
                        children: contentItems.flatMap((item, index) => [
                          Container({
                            onMouseEnter: () => setHover(index),
                            onMouseLeave: () => setHover(-1),
                            height: 'auto',
                            padding: 10,
                            paddingLeft: 50,
                            paddingRight: 50,
                            // backgroundColor: 'theme.background',
                            backgroundColor: hover === index ? '#212121' : '#FFFFFF',
                            //color: hover === index ? '#212121' : '#',
                            borderRadius: 10,
                            border: '1px solid theme.border',
                            cursor: 'pointer',
                            child: Text(item.Title, { textColor: hover === index ? '#FFFFFF' : '#212121' }),
                            onClick: item.Action,
                          }),
                          Space(20),
                        ]),
                      }),
                      Space(125),
                      SizedBox({
                        padding: 10,
                        center: true,
                        textAlign: 'Center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        child: Text('Dapatkan berlangganan'),
                      }),
                      SizedBox({
                        padding: 10,
                        center: true,
                        textAlign: 'Center',
                        fontSize: '14px',
                        child: Text(
                          'Lorem ipsum dolor sit amet consectetur. Nec non feugiat quis sed mattis proin at pulvinar sed. Massa in egestas sed',
                        ),
                      }),
                      SizedBox({
                        padding: 20,
                        center: true,
                        child: Center({
                          child: SizedBox({
                            onMouseEnter: () => setHover(2),
                            onMouseLeave: () => setHover(-3),
                            height: 'auto',
                            width: '100',
                            padding: 10,
                            paddingLeft: 50,
                            paddingRight: 50,
                            // backgroundColor: 'theme.background',
                            backgroundColor: hover === 2 ? '#212121' : '#FFFFFF',
                            //color: hover === index ? '#212121' : '#',
                            borderRadius: 10,
                            border: '1px solid theme.border',
                            cursor: 'pointer',
                            child: Text('Mulai Langganan', { textColor: hover === 2 ? '#FFFFFF' : '#212121' }),
                            onClick: () => {
                              dispatch(setActiveMenu())
                              nav('/langganan')
                            },
                          }),
                        }),
                      }),
                      Space(125),
                    ],
                  }),
                }),
              ],
            }),
            Space(30),
          ],
        }),
      }),
    }),
  }).builder()
}
