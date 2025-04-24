import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Column, Container, Expanded, Root, Rows, Widget } from '../System/Lib/Widgets'
import SideBar from '../pages/tutorial/SideBar'
import { Outlet } from 'react-router-dom'
import SideBarChat from '../pages/tutorial/SideBarChat'
import Header from '../pages/tutorial/Header'
//import Header from '../pages/tutorial/Header'

export default function AdBriefLayout() {
  const { colors } = useSelector((state: RootState) => state.theme)

  return Root({
    theme: colors,
    child: Container({
      color: 'theme.background',
      child: Rows({
        children: [
          Container({
            width: 250,
            borderRight: '1px solid theme.border',
            child: SideBar(),
          }),
          Expanded({
            // border: "1px solid theme.border",
            child: Column({
              children: [
                Container({
                  height: 50,
                  color: 'theme.background',
                  border: '1px solid theme.border',
                  child: Header(),
                }),
                Expanded({
                  child: Rows({
                    children: [
                      Expanded({ child: Widget(Outlet) }),
                      Container({
                        width: 350,
                        borderLeft: '1px solid theme.border',
                        child: SideBarChat(),
                      }),
                    ],
                  }),
                }),
                Container({
                  height: 35,
                  color: 'theme.background',
                  borderTop: '1px solid theme.border',
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  }).builder()
}
