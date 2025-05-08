import { useSelector } from 'react-redux'
import { RootState } from '../store'
import useAdbrief from '../contexts/useAdbrief'
import { useState } from 'react'
import {
  Center,
  CircularProgress,
  Click,
  Column,
  Container,
  Divider,
  Expanded,
  Icon,
  ListItemText,
  Menu,
  MenuItem,
  Positioned,
  Resize,
  Rows,
  SizedBox,
  Snackbar,
  Stack,
  Text,
  TextField,
} from '@/System/Lib/Widgets'
import Orchestrator from '../System/Lib/ai/src/engine/Orchestrator'
import AnswerAgent from '../System/Lib/ai/src/agents/AnswerAgent'
import SqlAgent from '../System/Lib/ai/src/agents/SqlAgent'
import RangkumanAgent from '../System/Lib/ai/src/agents/RangkumanAgent'
import ChartAgent from '../System/Lib/ai/src/agents/ChartAgent'
import ViewChat from './ViewChat'
import { useTheme } from '@/hooks/useTheme'
import { SystemPrompts } from '@/System/Lib/ai/src/config/config_agent'

function scrollTop() {
  setTimeout(() => {
    document.querySelector('[chat-content]')!.scrollTo({
      top: document.querySelector('[chat-content]')!.scrollHeight,
      behavior: 'smooth',
    })
  }, 300)
}

export default function Main() {
  const Theme = useTheme()
  const { colors } = useSelector((state: RootState) => state.theme)
  const store = useAdbrief()
  const [row, setRow] = useState(0)

  return Resize({
    theme: colors,
    child: Column({
      children: [
        Container({
          height: 50,
          borderBottom: '1px solid theme.border',

          child: Rows({
            children: [
              Click({
                width: 50,
                height: 50,
                child: Center({
                  child: Icon('more_vert'),
                }),
                click: (e: any) => {
                  const menu = Menu(e, {
                    anchorPosition: {
                      left: e.clientX - 5,
                      top: e.clientY - 50,
                    },
                    children: [
                      { label: 'New Chat', icon: 'forum', colorIcon: 'green' },
                      { label: 'Change Modal', icon: 'adb', colorIcon: 'blue' },
                      'divider',
                      {
                        label: 'Reset Setting',
                        icon: 'reset_tv',
                        colorIcon: 'red',
                      },
                    ].map((item: any) => {
                      if (item === 'divider') {
                        return Divider({ width: 200 })
                      }
                      return MenuItem({
                        onClick: () => menu.unMounting(),
                        child: ListItemText({
                          child: Rows({
                            center: true,
                            children: [
                              item.icon
                                ? Container({
                                    width: 30,
                                    child: Icon(item.icon, {
                                      color: item.colorIcon,
                                    }),
                                  })
                                : SizedBox({ width: 30 }),
                              Text(item.label),
                              Expanded(),
                            ],
                          }),
                        }),
                      })
                    }),
                  })
                },
              }),
            ],
          }),
        }),
        Expanded({ child: ViewChat() }),
        Container({
          // height: 60 + (((row - 1) * 17) > 0 ? ((row - 1) * 17) : 0),
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 10,
          backgroundColor: Theme.theme === 'dark' ? '#303030' : '#D3D3D3',
          borderTop: store.state.working ? 'unset' : '1px solid theme.border',
          child: store.state.working
            ? Rows({
                center: true,
                children: [
                  Container({
                    width: 30,
                    height: 30,
                    radius: 30,
                    margin: 10,
                    border: '1px solid theme.border',
                    child: Click({
                      click: () => {
                        store.setWorking(false)
                      },
                      child: Stack({
                        children: [
                          Center({
                            child: Icon(store.state.working ? 'stop_circle' : 'play_arrow', {
                              color: store.state.working ? 'red' : 'white',
                            }),
                          }),
                          Positioned({
                            top: 0,
                            left: 0,
                            child: CircularProgress({
                              size: 30,
                              color: 'info',
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              })
            : Rows({
                center: true,
                children: [
                  Container({
                    width: 60,
                    height: 30,
                    child: Click({
                      width: 'unset',
                      click: () => {
                        console.log(store.getChat())
                      },
                      child: Center({ child: Icon('add') }),
                    }),
                  }),
                  SizedBox({
                    height: 30,
                    width: 1,
                    borderLeft: '1px solid theme.border',
                  }),
                  Container({
                    width: 60,
                    height: 30,
                    child: Center({ child: Icon('image') }),
                  }),
                  Expanded({
                    child: Center({
                      child: TextField({
                        placeholder: 'Input prompt ...',
                        value: store.state.chat,
                        multiline: true,
                        fullWidth: true,
                        // rows: row,
                        minRows: 1,
                        maxRows: 5,
                        onChange: (e: any) => {
                          const newValue = e.target.value
                          store.setChat(newValue)
                          setRow(Math.min(5, newValue.split('\n').length || 0))
                        },
                        onKeyDown: (e: any) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                          }
                        },
                      }),
                    }),
                  }),
                  Container({
                    width: 30,
                    height: 30,
                    radius: 30,
                    margin: 10,
                    border: '1px solid theme.border',
                    child: Click({
                      click: () => {
                        store.setWorking(true)
                        process(store)
                      },
                      child: Center({
                        child: Icon('play_arrow'),
                      }),
                    }),
                  }),
                ],
              }),
        }),
      ],
    }),
  })
}

function process(store: any) {
  if (!store.state.chat) {
    Snackbar({
      title: 'Info',
      message: 'Please insert message',
    })
    store.setWorking(false)
    return
  }

  const chat = store.state.chat
  store.setChat('')
  store.addChat({
    role: 'user',
    content: chat,
  })
  scrollTop()
  const orchestrator = new Orchestrator()
  orchestrator.addParameter(SystemPrompts.KNOWLEDGE_PAYOR, {
    "payor_code": "payor_1",
    "user_id": "Bambang",
    "product_id": 40
  });
  for (let i = 0; i < store.state.history.length; i++) {
    const chat = store.state.history[i]
    if (chat.role == 'chart') {
      orchestrator.engine.addMessage('assistant', `Data Chart: \n\n\`\`\`json\n${JSON.stringify(chat.content)}\n\`\`\``)
    } else {
      if (chat.role != 'system') {
        orchestrator.engine.addMessage(chat.role, chat.content)
      }
    }
  }
  orchestrator.addAgent(new AnswerAgent())
  orchestrator.addAgent(new SqlAgent())
  orchestrator.addAgent(new RangkumanAgent())
  orchestrator.addAgent(new ChartAgent())
  orchestrator.ask(chat).then(response => {
    const jsonResponse = response.parseTextOutputToJson()
    if (jsonResponse == null) {
      store.addChat({
        role: 'assistant',
        content: response.getResponse(),
      })
      store.setWorking(false)
      scrollTop()
      return
    }
    console.log(jsonResponse)
    console.log('========================================================')
    console.log('========================================================')
    console.log('========================================================')
    orchestrator.setData(response.parseTextOutputToJson())
    orchestrator.process().then(response => {
      console.log(response)
      store.setWorking(false)

      // check jika agent terakhir adalah agen rangkuman maka munculkan resultnya
      const rangkumanExists = response.filter((x: any) => x.agen == 'agen_rangkuman')
      if (rangkumanExists.length) {
        store.addChat({
          role: 'assistant',
          content: rangkumanExists[0].result,
        })
      }

      // check if agent_chart exists
      const agentChartExists = response.filter((x: any) => x.agen == 'agent_chart')
      if (agentChartExists.length) {
        store.addChat({
          role: 'chart',
          content: agentChartExists[0].result,
        })
      }

      scrollTop()
    })
  })
}
