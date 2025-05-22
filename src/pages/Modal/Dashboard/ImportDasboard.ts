import { useSelector } from 'react-redux'
import {
  Button,
  Column,
  Container,
  Expanded,
  IconButton,
  IconMui,
  ListItemText,
  MenuItem,
  Row,
  Rows,
  Select,
  SizedBox,
  Space,
  Text,
  TextField,
} from '../../../System/Lib/Widgets'
import { RootState } from '../../../store'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

const totalRowPages = [
  {
    value: '1',
  },
  {
    value: '5',
  },
  {
    value: '20',
  },
  {
    value: '50',
  },
]

export default function ContentImportDasboard() {
  const { colors } = useSelector((state: RootState) => state.theme)
  //const dispatch = useDispatch()
  const [countRow, setCountRow] = useState(3)
  const [sercGrafik, setSercGrafik] = useState('')
  const [showSercGrafik, setShowSercGrafik] = useState(false)

  const sercGrafikComponent = TextField({
    value: sercGrafik,
    placeholder: 'Masukkan Serc Grafik Anda',
    required: true,
    endAdornment: IconButton(SearchIcon, {
      size: 20,
      onClick: () => setShowSercGrafik(!showSercGrafik),
    }),
    onChange: (e: any) => setSercGrafik(e.target.value),
  })

  const handleChangeCountRow = (e: any) => {
    const value = e.target.value

    setCountRow(value)
    // dispatch(
    //   getListAllDataHC4UThunk({
    //     token,
    //     countRow: value,
    //     search,
    //     page: data?.pagination.page.toString(),
    //   }),
    // )
  }

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
              Text('Import Dashboard', { size: 20 }),
              Expanded({}),
              IconMui(CloseRoundedIcon, {
                size: 20,
                onClick: () => {},
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
            children: [
              Space(10),
              Container({ child: sercGrafikComponent }),
              Space(30),
              Text('Daftar Grafik Tersimpan', { size: 16 }),
              Space(20),
              Select({
                fullWidth: true,
                borderRadius: '10px',
                sx: {
                  fieldset: {
                    border: '1px solid theme.border',
                  },
                  backgroundColor: 'theme.backgroundpaper',
                },
                value: countRow,
                onChange: handleChangeCountRow,
                children: [
                  ...totalRowPages.map(currency => {
                    return MenuItem({
                      key: currency.value,
                      value: currency.value,
                      color: 'theme.textPrimary',
                      child: ListItemText({
                        child: Text(currency.value, {
                          fontSize: 14,
                          color: 'theme.textPrimary',
                          fontWeight: 400,
                        }),
                      }),
                    })
                  }),
                ],
              }),
            ],
          }),
        }),
        Space(25),
        Row({
          justifyContent: 'right',
          child: Button('Simpan', {
            justifyContent: 'right',
            padding: 10,
            width: 'auto',
            backgroundColor: 'theme.backgroundPaper',
            border: '1px solid theme.border',
            fontColor: 'theme.textPrimary',
            onClick: () => {},
          }),
        }),
      ],
    }),
  }).builder()
}
