import { Column, Expanded, IconMui, Input, Rows, SingleChildScrollView, SizedBox, Text } from '../../System/Lib/Widgets'
import SendRoundedIcon from '@mui/icons-material/SendRounded'

export default function SideBarChat() {
  return Column({
    children: [
      SizedBox({
        child: Column({
          center: true,
          children: [
            Text('Apa yang dapat saya bantu?', {
              size: 14,
              weight: 'bold',
              padding: 20,
            }),
            SizedBox({
              padding: 10,
              borderRadius: 10,
              width: 100,
              border: '1px solid theme.border',
              cursor: 'pointer',
              child: Rows({
                center: true,
                children: [Text('Saran', { size: 14, weight: 'bold' })],
              }),
            }),
          ],
        }),
      }),

      Expanded({
        child: SingleChildScrollView({
          child: Column({
            height: '100%',
            padding: 10,
            children: [
              Expanded(),
              SizedBox({
                padding: 5,
                child: Rows({
                  children: [
                    Text('test test test test test test test test test', {
                      borderRadius: 10,
                      padding: 10,
                      border: '1px solid theme.border',
                      width: 'auto',
                      size: 12,
                      textAlign: 'left',
                    }),
                  ],
                }),
              }),
              SizedBox({
                padding: 5,
                child: Rows({
                  children: [
                    Expanded(),
                    Text('test test test test test test test test', {
                      borderRadius: 10,
                      padding: 10,
                      border: '1px solid theme.border',
                      width: 'auto',
                      background: '#6D6D6D',
                      size: 12,
                      textAlign: 'right',
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
      }),

      SizedBox({
        padding: 10,
        child: Column({
          borderRadius: 10,
          border: '1px solid theme.border',
          background: 'white',
          padding: 5,
          child: Rows({
            center: true,
            children: [
              Input({
                borderRadius: 10,
                height: 35,
                border: '1px solid theme.border',
                color: 'theme.background',
                placeholder: 'Mulai Chat...',
              }),
              IconMui(SendRoundedIcon),
            ],
          }),
        }),
      }),
    ],
  })
}
