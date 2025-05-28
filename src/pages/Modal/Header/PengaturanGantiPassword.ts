import { Button, Column, Container, Row, Space, Text, TextField } from '../../../System/Lib/Widgets'
import { useTheme } from '@/hooks/useTheme'

export default function ContentGantiPassword() {
  const Theme = useTheme()
  return Container({
    theme: Theme.colors,
    padding: 10,
    child: Column({
      children: [
        Text('Password Lama', { size: 14 }),
        Space(10),
        TextField({
          placeholder: 'Password ...',
          fullWidth: true,
        }),
        Space(10),
        Text('Konformasi Password', { size: 14 }),
        Space(10),
        TextField({
          placeholder: 'Konfirmasi Password ...',
          fullWidth: true,
        }),
        Space(25),
        Row({
          justifyContent: 'right',
          child: Button('Simpan', {
            padding: 5,
            width: 100,
            backgroundColor: 'theme.background',
            border: '1px solid theme.border',
            fontColor: 'theme.textPrimary',
          }),
        }),
        Space(10),
      ],
    }),
  }).builder()
}
