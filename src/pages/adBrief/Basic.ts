import {
  Button,
  Center,
  Column,
  Expanded,
  IconMui,
  Rows,
  SingleChildScrollView,
  SizedBox,
  Space,
  Text,
} from '../../System/Lib/Widgets'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded'

const descItems = [
  {
    content: 'Descriptive Summary',
  },
  {
    content: 'Maks 2 User',
  },
  {
    content: '3 Topik :',
  },
]
const descSubItems = [
  {
    contentSub: 'General Overview',
  },
  {
    contentSub: 'Transaction Overview',
  },
  {
    contentSub: 'Diseases Overview',
  },
]

export default function ContentBasic() {
  return Column({
    children: [
      SizedBox({
        padding: 12,
        child: Text('Basic', { size: 20, weight: 'bold' }),
      }),
      SizedBox({
        paddingTop: 5,
        paddingLeft: 12,
        child: Text('Ideal untuk usaha dan instansi berskala kecil', {
          size: 14,
        }),
      }),
      Space(20),
      SizedBox({ width: '100%', border: '1px solid theme.border' }),
      SizedBox({
        justifyContent: 'center',
        padding: 12,
        child: Rows({
          children: [Text('Rp.8000.000', { size: 20, weight: 'bold' }), Space(10), Text('/bulan', { size: 16 })],
        }),
      }),
      Expanded({
        child: SingleChildScrollView({
          child: Column({
            children: [
              ...descItems.map(item =>
                SizedBox({
                  paddingLeft: 12,
                  child: Rows({
                    children: [
                      IconMui(CheckRoundedIcon, { width: 20 }),
                      Space(10),
                      Text(item.content, {
                        alignContent: 'center',
                      }),
                    ],
                  }),
                }),
              ),
              ...descSubItems.map(item =>
                SizedBox({
                  paddingLeft: 40,
                  child: Rows({
                    children: [
                      IconMui(Brightness1RoundedIcon, { width: 10 }),
                      Space(10),
                      Text(item.contentSub, {
                        alignContent: 'center',
                      }),
                    ],
                  }),
                }),
              ),
            ],
          }),
        }),
      }),
      SizedBox({
        paddingTop: 25,
        child: Center({
          child: Button('Mulai Berlangganan', {
            height: 35,
          }),
        }),
      }),
      Space(20),
    ],
  })
}
