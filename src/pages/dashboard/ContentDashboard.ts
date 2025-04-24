import { useSelector } from 'react-redux'
import { Column, Container, Expanded, Image, Row, SingleChildScrollView, Space, Text } from '../../System/Lib/Widgets'
import { RootState, useAppSelector } from '../../store'
import chart2 from '../../assets/images/chart 2.png'
import chart3 from '../../assets/images/chart 3.png'
import chart4 from '../../assets/images/chart 4.png'

export default function ContentDasboard() {
  const { colors } = useSelector((state: RootState) => state.theme)
  const menu = useAppSelector(state => state.menu.activeMenu)

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
            menu ? Text(menu.title, { size: 30 }) : null,
            Space(20),
            Row({
              children: [
                Expanded({
                  backgroundColor: 'red',
                  borderRadius: 10,
                  border: '1px solid theme.border',
                  child: Column({
                    children: [
                      Row({
                        child: Container({
                          width: '100%',
                          height: 25,
                          padding: 10,
                          backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          child: Text('Header 1', { size: 20, weight: 'bold' }),
                        }),
                      }),
                      Expanded({
                        child: Container({
                          width: '100%',
                          height: 'auto',
                          padding: 10,
                          backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          // child: Image({
                          //   src: chart1,
                          //   width: '100%',
                          //   height: 'auto',
                          //   borderRadius: 10,
                          //   backgroundColor: 'theme.background',
                          //   border: '1px solid theme.border',
                          // }),
                        }),
                      }),
                    ],
                  }),
                }),
                Space(20),
                Expanded({
                  backgroundColor: 'red',
                  borderRadius: 10,
                  border: '1px solid theme.border',
                  child: Column({
                    children: [
                      Row({
                        child: Container({
                          width: '100%',
                          height: 25,
                          padding: 10,
                          backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          child: Text('Header 2', { size: 20, weight: 'bold' }),
                        }),
                      }),
                      Expanded({
                        child: Container({
                          width: '100%',
                          height: 'auto',
                          padding: 10,
                          backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          child: Image({
                            src: chart2,
                            width: '100%',
                            height: 'auto',
                            borderRadius: 10,
                            backgroundColor: 'theme.background',
                            border: '1px solid theme.border',
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
            Space(30),
            Row({
              children: [
                Expanded({
                  backgroundColor: 'red',
                  borderRadius: 10,
                  border: '1px solid theme.border',
                  child: Column({
                    children: [
                      Row({
                        child: Container({
                          width: '100%',
                          height: 25,
                          padding: 10,
                          backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          child: Text('Header 3', { size: 20, weight: 'bold' }),
                        }),
                      }),
                      Expanded({
                        child: Container({
                          width: '100%',
                          height: 'auto',
                          padding: 10,
                          backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          child: Image({
                            src: chart3,
                            width: '100%',
                            height: 'auto',
                            borderRadius: 10,
                            backgroundColor: 'theme.background',
                            border: '1px solid theme.border',
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
                Space(20),
                Expanded({
                  backgroundColor: 'red',
                  borderRadius: 10,
                  border: '1px solid theme.border',
                  child: Column({
                    children: [
                      Row({
                        child: Container({
                          width: '100%',
                          height: 25,
                          padding: 10,
                          backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          child: Text('Header 4', { size: 20, weight: 'bold' }),
                        }),
                      }),
                      Expanded({
                        child: Container({
                          width: '100%',
                          height: 'auto',
                          padding: 10,
                          backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          child: Image({
                            src: chart4,
                            width: '100%',
                            height: 'auto',
                            borderRadius: 10,
                            backgroundColor: 'theme.background',
                            border: '1px solid theme.border',
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
            Space(20),
          ],
        }),
      }),
    }),
  }).builder()
}
