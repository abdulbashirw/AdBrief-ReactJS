import { useSelector } from 'react-redux'
import {
  Button,
  Column,
  Container,
  Expanded,
  IconMui,
  Image,
  LayoutBuilder,
  Row,
  SingleChildScrollView,
  SizedBox,
  Space,
  Text,
  Widget,
} from '../../System/Lib/Widgets'
import { RootState } from '../../store'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import chart2 from '../../assets/images/chart 2.png'
import { useTheme } from '@/hooks/useTheme'
import { useState } from 'react'
import TambahContentDasboard from './TambahContentDashboard'

const descDaboardTamplateItems = [
  {
    title: 'Halaman Kosong',
  },
  {
    title: '',
  },
  {
    title: '',
  },
]
const descRiwayatItems = [
  {
    title: 'Halaman Kosong',
    content: 'Content 1',
  },
  {
    title: '',
    content: 'Content 2',
  },
  {
    title: '',
    content: 'Conetent 3 :',
  },
  {
    title: '',
    content: 'Conetent 4 :',
  },
  {
    title: '',
    content: 'Conetent 5 :',
  },
  {
    title: '',
    content: 'Conetent 6 :',
  },
]

export default function ContentDasboard() {
  const Theme = useTheme()
  const { colors } = useSelector((state: RootState) => state.theme)
  const [maxItems, setMaxItems] = useState(3)
  const [TambahDashboard, setTambahDashboard] = useState(false)

  return Column({
    width: '100%',
    // theme: colors,
    boxSizing: 'border-box',
    color: 'theme.background',
    children: [
      TambahDashboard
        ? Widget(TambahContentDasboard, { setTambahDashboard } as any)
        : Column({
            padding: 20,
            theme: colors,
            child: SingleChildScrollView({
              child: Expanded({
                backgroundColor: Theme.theme === 'dark' ? '#303030' : '#D3D3D3',
                padding: 25,
                borderRadius: 10,
                border: '1px solid theme.border',
                child: Column({
                  children: [
                    // menu ? Text(menu.title, { size: 30 }) : null,
                    // Space(50),
                    Text('Buat Dashboard Baru', {
                      size: 20,
                      fontWeight: 'bold',
                    }),
                    Space(20),
                    Row({
                      children: [
                        Expanded({
                          //backgroundColor: 'theme.background',
                          borderRadius: 10,
                          //border: '1px solid theme.border',
                          child: Column({
                            children: [
                              Expanded({
                                child: SizedBox({
                                  padding: 5,
                                  backgroundColor: 'theme.background',
                                  borderRadius: 10,
                                  border: '1px solid theme.border',
                                  center: true,
                                  onClick: () => setTambahDashboard(true),
                                  child: IconMui(AddRoundedIcon, { size: 50 }),
                                }),
                              }),
                              Container({
                                width: '100%',
                                height: 25,
                                padding: 10,
                                child: Column({
                                  children: [
                                    Text('Halaman Baru', {
                                      size: 14,
                                      weight: 'bold',
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                        }),
                        Space(20),
                        ...descDaboardTamplateItems.map(
                          item =>
                            Expanded({
                              //backgroundColor: 'theme.background',
                              borderRadius: 10,
                              //border: '1px solid theme.border',
                              child: Column({
                                children: [
                                  Expanded({
                                    child: SizedBox({
                                      padding: 5,
                                      backgroundColor: 'theme.background',
                                      borderRadius: 10,
                                      border: '1px solid theme.border',
                                      center: true,
                                      child: Image({
                                        src: chart2,
                                        flex: 1,
                                        borderRadius: 10,
                                        backgroundColor: 'theme.background',
                                        border: '1px solid theme.border',
                                      }),
                                    }),
                                  }),
                                  SizedBox({
                                    width: '100%',
                                    height: 25,
                                    padding: 10,
                                    child: Column({
                                      children: [
                                        Text(item.title, {
                                          size: 14,
                                          weight: 'bold',
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          Space(20),
                        ),
                      ],
                    }),
                    Space(50),
                    Row({
                      children: [
                        Text('Riwayat Dashboard', {
                          size: 20,
                          fontWeight: 'bold',
                        }),
                        Expanded(),
                        Container({
                          height: 'auto',
                          padding: 8,
                          paddingLeft: 25,
                          paddingRight: 25,
                          //backgroundColor: 'theme.background',
                          borderRadius: 10,
                          border: '1px solid theme.border',
                          cursor: 'pointer',
                          onClick: () => setMaxItems(prevState => (prevState === 3 ? descRiwayatItems.length : 3)),
                          child: Text('Lihat Semua'),
                        }),
                      ],
                    }),

                    Space(20),
                    Widget(() =>
                      LayoutBuilder({
                        builder: ({ width }) =>
                          Row({
                            flexWrap: 'wrap',
                            gap: 10,
                            children: [
                              ...descRiwayatItems.slice(0, maxItems).map(item => historyContent({ item, width })),
                            ],
                          }),
                      }).builder(),
                    ),
                    Space(50),
                    Row({
                      justifyContent: 'right',
                      children: [
                        Button('Kembali', {
                          padding: 10,
                          width: 100,
                        }),
                        Space(20),
                        Button('Batal', {
                          padding: 10,
                          width: 100,
                        }),
                      ],
                    }),
                    Space(50),
                  ],
                }),
              }),
            }),
          }),
    ],
  }).builder()
}

const historyContent = ({ item, width }: { item: any; width: number }) => {
  const { colors } = useTheme()
  return Container({
    theme: colors,
    borderRadius: 10,
    width: width / 3 - (10 * 2) / 3,
    child: Column({
      children: [
        Expanded({
          child: SizedBox({
            padding: 5,
            backgroundColor: 'theme.background',
            borderRadius: 10,
            border: '1px solid theme.border',
            center: true,
            child: Image({
              src: chart2,
              flex: 1,
              borderRadius: 10,
              backgroundColor: 'theme.background',
              border: '1px solid theme.border',
            }),
          }),
        }),
        Container({
          width: '100%',
          height: 25,
          padding: 10,
          child: Column({
            children: [Text(item.title, { size: 14, weight: 'bold' }), Text(item.content, { size: 14 })],
          }),
        }),
      ],
    }),
  }).builder()
}
