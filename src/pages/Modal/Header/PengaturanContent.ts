import { Button, Column, Container, Image, Row, Rows, Space, Text, TextField } from '../../../System/Lib/Widgets'
import { useTheme } from '@/hooks/useTheme'
import user from '../../../assets/images/user.png'
import logo from '../../../assets/images/adbrief.png'
import logo1 from '../../../assets/images/adbrief1.png'

export default function ContentSetting() {
  const Theme = useTheme()
  return Container({
    theme: Theme.colors,
    padding: 10,
    child: Column({
      children: [
        Rows({
          center: true,
          child: Image({
            src: user,
            padding: 10,
            border: '1px solid theme.border',
            borderRadius: '50%', // bikin lingkaran
            width: 120, // pastikan square
            height: 120,
            objectFit: 'contain',
            objectPosition: 'center',
          }),
        }),
        Space(10),
        Text('Logo', { size: 14 }),
        Space(10),
        Image({
          src: Theme.theme === 'dark' ? logo1 : logo,
          width: 200,
          height: 'auto',
        }),
        Text('Nama', { size: 14 }),
        Space(10),
        TextField({
          placeholder: 'Nama ...',
          fullWidth: true,
        }),
        Space(10),
        Text('Email', { size: 14 }),
        Space(10),
        TextField({
          placeholder: 'Email ...',
          fullWidth: true,
        }),
        Space(10),
        Text('Kode Payor', { size: 14 }),
        Space(10),
        TextField({
          placeholder: 'Kode Payor ...',
          fullWidth: true,
        }),
        Space(10),
        Text('Nama Payor', { size: 14 }),
        Space(10),
        TextField({
          placeholder: 'Nama Payor ...',
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
