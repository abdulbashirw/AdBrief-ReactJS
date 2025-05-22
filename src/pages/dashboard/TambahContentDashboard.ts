import { useSelector } from 'react-redux'
import {
  Button,
  Column,
  Container,
  Expanded,
  IconMui,
  Image,
  LayoutBuilder,
  Modal,
  Positioned,
  Row,
  Rows,
  SingleChildScrollView,
  SizedBox,
  Space,
  Text,
  Widget,
} from '@/System/Lib/Widgets.ts'
import { RootState } from '@/store'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useTheme } from '@/hooks/useTheme'

import chart2 from '../../assets/images/chart 2.png'
import ContentJudulDasboard from '../Modal/Dashboard/JudulDasboard'
import ContentTambahDasboard from '../Modal/Dashboard/TambahDasboard'
import ContentImportDasboard from '../Modal/Dashboard/ImportDasboard'

const descDasboardItems = [
  {
    title: 'Halaman Kosong',
    content: 'Content 1',
  },
  {
    title: 'Halaman',
    content: 'Content 2',
  },
]

export default function TambahContentDasboard({ setTambahDashboard }) {
  const Theme = useTheme()
  const { colors } = useSelector((state: RootState) => state.theme)

  function modal(Content: () => typeof Widget) {
    const modal = Modal({
      theme: Theme.colors,
      backdropFilter: 'blur(2px)',
      child: Positioned({
        backgroundColor: 'theme.backgroundPaper',

        radius: 10,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 700,
        height: 'auto',
        child: Content,
      }),
    })
    return modal
  }

  return Column({
    padding: 20,
    theme: colors,
    children: [
      Row({
        children: [
          Button('Fullscreen', {
            padding: 5,
            icon: 'fullscreen',
            backgroundColor: 'theme.background',
            border: '1px solid theme.border',
            fontColor: 'theme.textPrimary',
            onClick: () => {},
          }),
          Space(10),
          Button('Import', {
            padding: 5,
            icon: 'logout',
            backgroundColor: 'theme.background',
            border: '1px solid theme.border',
            fontColor: 'theme.textPrimary',
            onClick: () => {
              modal(ContentImportDasboard)
            },
          }),
          Expanded({
            child: Rows({
              onClick: () => {
                modal(ContentJudulDasboard)
              },
              center: true,
              children: [
                Text('Judul Dashboard', { size: 22, weight: 'bold', cursor: 'pointer' }),
                Space(5),
                IconMui(BorderColorIcon),
              ],
            }),
          }),
          Space(10),
          Button('Atur Tamplate', {
            padding: 5,
            icon: 'grid_view',
            backgroundColor: 'theme.background',
            border: '1px solid theme.border',
            fontColor: 'theme.textPrimary',
            onClick: () => {},
          }),
        ],
      }),
      Space(20),
      Container({
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
                Text('Buat Dashboard Baru', { size: 20, fontWeight: 'bold' }),
                SizedBox({
                  height: 20,
                  borderColor: Theme.theme,
                  border: '1px',
                }),
                Space(20),
                Row({
                  children: [
                    SizedBox({
                      //backgroundColor: 'theme.background',
                      borderRadius: 10,
                      //border: '1px solid theme.border',
                      child: Column({
                        children: [
                          Expanded({
                            child: SizedBox({
                              padding: 50,
                              paddingLeft: 100,
                              paddingRight: 100,
                              backgroundColor: 'theme.background',
                              borderRadius: 10,
                              border: '1px solid theme.border',
                              center: true,
                              onClick: () => {
                                modal(ContentTambahDasboard)
                              },
                              child: IconMui(AddRoundedIcon, { size: 50 }),
                            }),
                          }),
                        ],
                      }),
                    }),
                    Space(20),
                    Widget(() =>
                      LayoutBuilder({
                        builder: ({ width }) =>
                          Row({
                            flexWrap: 'wrap',
                            gap: 10,
                            children: [...descDasboardItems.slice(0, 3).map(item => historyContent({ item, width }))],
                          }),
                      }).builder(),
                    ),
                  ],
                }),
                Space(50),
                Button('Kembali', {
                  padding: 10,
                  icon: 'undo',
                  width: 100,
                  backgroundColor: 'theme.background',
                  border: '1px solid theme.border',
                  fontColor: 'theme.textPrimary',
                  onClick: () => setTambahDashboard(false),
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
        Container({
          width: '100%',
          center: true,
          height: 25,
          padding: 10,
          child: Text(item.title, { size: 14, weight: 'bold' }),
        }),
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
      ],
    }),
  }).builder()
}
