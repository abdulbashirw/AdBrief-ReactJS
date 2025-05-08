import { useSelector } from 'react-redux'
import {
  Button,
  Center,
  Column,
  Container,
  Expanded,
  IconMui,
  Row,
  Rows,
  SingleChildScrollView,
  SizedBox,
  Space,
  Text,
} from '@/System/Lib/Widgets.ts'
import { RootState } from '@/store'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useTheme } from '@/hooks/useTheme'

export default function TambahContentDasboard({ setTambahDashboard }) {
  const Theme = useTheme()
  const { colors } = useSelector((state: RootState) => state.theme)

  return Column({
    padding: 20,
    theme: colors,
    children: [
      Row({
        children: [
          SizedBox({
            padding: 5,
            borderRadius: 10,
            width: 100,
            border: '1px solid theme.border',
            child: Rows({
              center: true,
              children: [IconMui(FullscreenRoundedIcon), Space(5), Text('Fullscreen', { size: 14, weight: 'bold' })],
            }),
          }),
          Space(10),
          Space(10),
          SizedBox({
            padding: 5,
            borderRadius: 10,
            width: 100,
            border: '1px solid theme.border',
            child: Rows({
              center: true,
              children: [IconMui(LogoutRoundedIcon), Space(5), Text('Import', { size: 14, weight: 'bold' })],
            }),
          }),
          Expanded({
            child: Center({
              child: Text('Judul Dashboard'),
            }),
          }),
          Text('Judul'),
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
                  ],
                }),
                Space(50),
                Button('Kembali', {
                  padding: 10,
                  width: 100,
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
