import { useSelector } from 'react-redux'
import {
  Button,
  Column,
  Container,
  Expanded,
  IconButton,
  IconMui,
  Row,
  Rows,
  SingleChildScrollView,
  SizedBox,
  Space,
  Text,
  TextField,
} from '../../../System/Lib/Widgets'
import { RootState } from '../../../store'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

const descItems = [
  {
    content: 'General Overview',
  },
  {
    content: 'Transaction Overview',
  },
  {
    content: 'Diseases Overview',
  },
  {
    content: 'General Overview',
  },
  {
    content: 'Transaction Overview',
  },
  {
    content: 'Diseases Overview',
  },
  {
    content: 'Transaction Overview',
  },
  {
    content: 'Diseases Overview',
  },
  {
    content: 'Transaction Overview',
  },
  {
    content: 'Diseases Overview',
  },
  {
    content: 'General Overview',
  },
  {
    content: 'Transaction Overview',
  },
  {
    content: 'Diseases Overview',
  },
]

export default function ContentImportDasboard({ modal }) {
  const { colors } = useSelector((state: RootState) => state.theme)
  //const dispatch = useDispatch()
  const [sercGrafik, setSercGrafik] = useState('')
  const [showSercGrafik, setShowSercGrafik] = useState(false)
  const [hover, setHover] = useState<number>(-1)

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

  // useEffect(() => {
  //   console.log(modal)
  // }, [modal])

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
        Space(25),
        Expanded({
          child: Column({
            children: [
              Space(10),
              Container({ child: sercGrafikComponent }),
              Space(30),
              Text('Daftar Grafik Tersimpan', { size: 16 }),
              Space(20),
              SizedBox({
                height: '200px',
                width: '99%',
                borderRadius: 10,
                border: '1px solid theme.border',
                child: SingleChildScrollView({
                  child: Column({
                    center: true,
                    padding: 5,
                    gap: 5,
                    children: [
                      ...descItems.map((item, index) =>
                        Container({
                          onMouseEnter: () => setHover(index),
                          onMouseLeave: () => setHover(-1),
                          padding: 10,
                          width: '90%',
                          backgroundColor: hover === index ? '#303030' : 'theme.backgroundPaper',
                          borderRadius: 10,
                          alignContent: 'center',
                          textAlign: 'center',
                          child: Text(item.content, {
                            alignContent: 'center',
                            textColor: hover === index ? 'white' : 'theme.textPrimary',
                          }),
                          onClick: () => {},
                        }),
                      ),
                    ],
                  }),
                }),
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
