import { useSelector } from 'react-redux'
import { Column, Expanded, IconMui, Rows, SizedBox, Space, Text, TextField } from '../../../System/Lib/Widgets'
import { RootState } from '../../../store'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

export default function ContentJudulDasboard() {
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
              Text('Judul Dashboard', { size: 20 }),
              Expanded({}),
              IconMui(CloseRoundedIcon, {
                size: 20,
                onClick: () => ({}),
              }),
            ],
          }),
        }),
        Space(10),
        SizedBox({
          height: 5,
          borderTop: '1px solid theme.border',
        }),
        Space(25),
        Expanded({
          child: Column({
            center: true,
            children: [
              Text('Judul Dashboard', { size: 16 }),
              Space(10),
              TextField({
                placeholder: 'Input Judul Dasboard ...',
                fullWidth: true,
              }),
            ],
          }),
        }),
        Space(25),
      ],
    }),
  }).builder()
}
