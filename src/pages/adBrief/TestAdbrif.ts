import useAdbrief from '@/contexts/useAdbrief'
import Main from '@/layouts/Main'
import { RootState } from '@/store'
import { Column, Container, Expanded, Root, Rows, Space, Text, TextField, Widget } from '@/System/Lib/Widgets'
import { Editor } from '@monaco-editor/react'
import { useSelector } from 'react-redux'

export default function TestAdbrif() {
  const { colors } = useSelector((state: RootState) => state.theme)
  return Root({
    theme: colors,
    child: Container({
      color: 'theme.background',
      child: Rows({
        children: [Main(), Right()],
      }),
    }),
  }).builder()
}

function Right() {
  const store = useAdbrief()

  return Expanded({
    borderLeft: '1px solid theme.border',
    child: Column({
      padding: 20,
      children: [
        Text('System:'),
        Space(10),
        TextField({
          placeholder: 'Input prompt system ...',
          rows: 10,
          multiline: true,
          value: store.state.system,
          onChange: (e: any) => {
            store.setSystem(e.target.value)
          },
        }),
        Space(20),
        Text('Sample Format Output and sample data:'),
        Space(10),
        Expanded({
          child: Container({
            child: Widget(Editor, {
              height: '100%',
              defaultLanguage: 'json',
              theme: 'vs-dark',
              value: store.state.code,
              onChange: () => store.setCode(store.state.code),
              options: {
                minimap: { enabled: false },
                wordWrap: 'on',
                fontSize: 14,
                tabSize: 2,
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: true,
              },
            }),
          }),
        }),
      ],
    }),
  })
}
