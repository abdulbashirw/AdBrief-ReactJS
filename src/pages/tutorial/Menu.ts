import { useState } from 'react'
import { Container, Icon, Rows, Text } from '../../System/Lib/Widgets'
import { useDispatch } from 'react-redux'
import { setActiveMenu } from '../../store/slices/menu.slice'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/store'

export default function Menu() {
  //const [active, setActive] = useState<number>(-1)
  const [hover, setHover] = useState<number>(-1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menus = useAppSelector(state => state.menu.items)
  const activeMenu = useAppSelector(state => state.menu.activeMenu)

  return menus.map((menu, index) => {
    return Container({
      width: 'unset',
      cursor: 'pointer',
      onClick: () => {
        //setActive(index)
        dispatch(setActiveMenu(menu))
        navigate(menu.route)
      },
      onMouseEnter: () => setHover(index),
      onMouseLeave: () => setHover(-1),
      // color: hover == index ? 'theme.hover' : active == index ? 'theme.active' : '',
      child: Rows({
        width: 'unset',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        gap: 10,
        backgroundColor: hover == index ? 'theme.hover' : activeMenu?.title == menu.title ? 'theme.active' : '',
        borderRadius: 5,
        //children: [menu.icon ? menu.icon : SizedBox({ width: 50, height: 50 }), Text(menu.name)],
        children: [
          Icon(menu.icon, {
            color:
              hover == index
                ? 'theme.primary'
                : activeMenu?.title == menu.title
                  ? 'theme.textPrimary'
                  : 'theme.textSecondary',
          }),
          Container({
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            child: Text(menu.title, { size: 14, weight: 'bold' }),
          }),
        ],
      }),
    })
  })
}
