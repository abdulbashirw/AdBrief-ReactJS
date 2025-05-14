import { useSelector } from 'react-redux'
import {
  Column,
  Container,
  Expanded,
  Row,
  Rows,
  SingleChildScrollView,
  SizedBox,
  Space,
  Text,
} from '../../System/Lib/Widgets'
import { RootState } from '../../store'
import { useTheme } from '@/hooks/useTheme'
import ContentBasic from './Basic'
import ContentHealthBenefit from './HealthBenefit'
import ContentBusiness from './Business'
import ContentUltimate from './Ultimate'
import { useState } from 'react'

const contentItems = [
  {
    contentSub: ContentBasic(),
  },
  {
    contentSub: ContentHealthBenefit(),
  },
  {
    contentSub: ContentBusiness(),
  },
  {
    contentSub: ContentUltimate(),
  },
]

export default function ContentLangganan() {
  const [hover, setHover] = useState<number>(-1)
  const Theme = useTheme()
  const { colors } = useSelector((state: RootState) => state.theme)

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
                  backgroundColor: Theme.theme === 'dark' ? 'theme.background' : '#D3D3D3',
                  borderRadius: 10,
                  //border: '1px solid theme.border',
                  child: Column({
                    children: [
                      SizedBox({
                        padding: 20,
                        fontSize: '32px',
                        fontWeight: 'bold',
                        child: Text('Upgrade Plan'),
                      }),
                      SizedBox({
                        paddingLeft: 20,
                        fontSize: '16px',
                        child: Text('Tingkatkan batas pemakaian AdBrief AI Anda'),
                      }),
                      Space(50),
                      Rows({
                        children: contentItems.flatMap((item, index) => [
                          Space(20),
                          Expanded({
                            onMouseEnter: () => setHover(index),
                            onMouseLeave: () => setHover(-1),
                            child: Container({
                              height: 'auto',
                              padding: 10,
                              backgroundColor: hover === index ? '#303030' : 'theme.background',
                              borderRadius: 10,
                              border: '1px solid theme.border',
                              child: item.contentSub,
                            }),
                          }),
                          Space(20),
                        ]),
                      }),
                      Space(50),
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
