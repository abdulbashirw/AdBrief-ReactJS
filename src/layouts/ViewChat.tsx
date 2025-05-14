import React, { useEffect, useRef } from 'react'
import { Center, Column, Container, Expanded, Markdown, Rows, SingleChildScrollView } from '../System/Lib/Widgets'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import useAdbrief from '../contexts/useAdbrief'
import * as echarts from 'echarts'

export default function ViewChat() {
  const { colors } = useSelector((state: RootState) => state.theme)
  const store = useAdbrief()
  const maxWidth = (window.screen.width / 2) * 0.75

  return Container({
    theme: colors,

    padding: 20,
    maxHeight: '95%',
    child: SingleChildScrollView({
      attr: {
        'chat-content': 'chat-content',
      },
      child: Column({
        children: store.state.history.map((item, i) => {
          if (item.role == 'user') {
            return Container({
              paddingTop: 20,
              paddingBottom: 20,
              child: Column({
                children: [
                  Container({
                    fontColor: 'theme.textPrimary',
                    child: Rows({
                      children: [
                        Expanded(),
                        Container({
                          maxWidth: maxWidth,
                          padding: 20,
                          paddingTop: 5,
                          paddingBottom: 5,
                          backgroundColor: 'theme.backgroundPaper',
                          radius: 5,
                          child: Markdown({ markdown: item.content }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            })
          }

          if (item.role == 'assistant' && item.content) {
            return Container({
              padding: 20,
              marginBottom: 20,
              //boxShadow: '3px 3px 8px rgba(255, 255, 255, 0.5)',
              child: Column({
                children: [
                  Container({
                    fontColor: 'theme.textPrimary',
                    child: Container({
                      maxWidth: maxWidth,
                      padding: 20,
                      paddingTop: 5,
                      paddingBottom: 5,
                      backgroundColor: 'theme.hover',
                      radius: 5,
                      child: Markdown({ markdown: item.content }),
                    }),
                  }),
                ],
              }),
            })
          }

          // if (item.role == 'chart') {
          //   return React.createElement(BuildingChart, {
          //     option: item.content,
          //     key: i,
          //   })
          // }

          if (item.role == 'chart') {
            return Container({
              maxWidth: '90%',
              padding: 20,
              backgroundColor: 'theme.hover',
              radius: 5,
              child: Center({
                child: React.createElement(BuildingChart, {
                  option: item.content,
                  key: i,
                }),
              }),
            })
          }

          if (item.role == 'rangkuman') {
            return Container({
              padding: 20,
              marginBottom: 20,
              child: Column({
                children: [
                  Container({
                    fontColor: 'theme.textPrimary',
                    child: Container({
                      maxWidth: maxWidth,
                      padding: 20,
                      paddingTop: 5,
                      paddingBottom: 5,
                      backgroundColor: 'theme.hover',
                      radius: 5,
                      boxShadow: '3px 3px 8px rgba(255, 255, 255, 0.5)',
                      child: Markdown({ markdown: item.content }),
                    }),
                  }),
                ],
              }),
            })
          }

          return null
        }),
      }),
    }),
  })
}

export function BuildingChart({ option }: { option: any }) {
  const ref = useRef<HTMLDivElement>(null)
  const { colors } = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    setTimeout(() => {
      if (!ref.current) return
      console.log('option', option)
      const chart = echarts.init(ref.current, colors.mode)
      chart.setOption(option)
      return () => chart.dispose()
    }, 1000)
  }, [option])

  return Column({
    ref,
    height: 400,
    color: 'theme.backgroundPaper',
    attr: {
      'chat-content': 'chat-content',
    },
    marginBottom: 20,
  }).builder()
}
