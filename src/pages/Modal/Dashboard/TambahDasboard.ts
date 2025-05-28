import { useSelector } from 'react-redux'
import {
  Button,
  Column,
  Expanded,
  IconMui,
  Row,
  Rows,
  SizedBox,
  Space,
  Text,
  TextField,
  Widget,
} from '../../../System/Lib/Widgets'
import { RootState } from '../../../store'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ContentDasboardChat from '@/pages/dashboard-chat/ContentDashboardChat'

export default function ContentTambahDasboard({ modal }) {
  const { colors } = useSelector((state: RootState) => state.theme)

  return Column({
    width: '100%',
    theme: colors,
    boxSizing: 'border-box',
    color: 'theme.background',
    child: Column({
      padding: 20,
      children: [
        SizedBox({
          child: Rows({
            children: [
              Text('Tambah Dashboard', { size: 20 }),
              Expanded({}),
              IconMui(CloseRoundedIcon, {
                size: 20,
                onClick: () => {
                  modal?.unMounting()
                },
              }),
            ],
          }),
        }),
        Space(10),
        SizedBox({
          height: 5,
          borderTop: '1px solid theme.border',
        }),
        Space(10),
        Expanded({
          child: Column({
            // center: true,
            children: [
              Text('Judul Dashboard', { size: 16 }),
              Space(10),
              TextField({
                placeholder: 'Input Judul Dasboard ...',
                fullWidth: true,
              }),
              Space(10),
              Text('Buat Grafik', { size: 16 }),
              Space(10),
              SizedBox({
                border: '2px solid theme.border',
                borderRadius: 10,
                height: 500,
                child: Widget(ContentDasboardChat),
              }),
              Space(10),
            ],
          }),
        }),
        Row({
          justifyContent: 'right',
          child: Button('Simpan', {
            padding: 10,
            width: 100,
            backgroundColor: 'theme.background',
            border: '1px solid theme.border',
            fontColor: 'theme.textPrimary',
          }),
        }),
      ],
    }),
  }).builder()
}
