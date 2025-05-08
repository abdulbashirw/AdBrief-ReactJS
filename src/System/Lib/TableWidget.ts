import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Center,
  Checkbox,
  Click,
  Column,
  Confirm,
  Container,
  Divider,
  Expanded,
  Icon,
  ListItemText,
  Menu,
  MenuItem,
  Root,
  SingleChildScrollView,
  Space,
  Text,
  TextField,
  Widget,
  Row,
} from './Widgets'
import { HeaderRefProvider, useHeaderRef } from './table/context/useHeaderRef'
import { BodyRefProvider, useBodyRef } from './table/context/useBodyRef'
import { SplitRefProvider, useSplitRef } from './table/context/useSplitRef'
import { RootState } from '../../store'

export default function TableWidget(props: any) {
  props.ref = useRef<any>(null)
  return Widget(HeaderRefProvider, {}, Widget(BodyRefProvider, {}, Widget(SplitRefProvider, {}, Widget(Table, props))))
}

function Table(props: any) {
  const splitRef = useSplitRef()
  const bodyRef = useBodyRef()
  const headerRef = useHeaderRef()

  const { colors } = useSelector((state: RootState) => state.theme)
  const [isSelectOne, setSelectOne] = useState(false)
  const [focus, setFocus] = useState(false)
  const [search, setSearch] = useState('')
  const [scrollMode, setScrollMode] = useState('')
  const [hoverIndex, setHoverIndex] = useState(-1)
  const [checkIndex, setCheckIndex] = useState<boolean[]>([])
  const [fields, setFields] = useState<any[]>(props.fields)
  const [modeShift, setModeShift] = useState<boolean>(false)
  const [startNumber, setStartNumber] = useState<number>(-1)
  const [datastore, setData] = useState<any[]>(props.data)
  const [useCheckbox, setUseCheckbox] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkHeader, setCheckHeader] = useState(false)
  const [header, setHeader] = useState(true)
  const [toolbar, setToolbar] = useState(true)
  const [pagination, setPagination] = useState(true)
  const [perRows, setPerRows] = useState(10)
  const [page, setPage] = useState(1)

  useEffect(() => {
    props.ref.current = {
      hideHeader: () => setHeader(false),
      showHeader: () => setHeader(true),
      hideToolbar: () => setToolbar(false),
      showToolbar: () => setToolbar(true),
      hidePagination: () => setPagination(false),
      showPagination: () => setPagination(true),
      setSelectOne: (value: boolean) => setSelectOne(value),
      setFocus: (value: boolean) => setFocus(value),
      setSearch: (value: string) => setSearch(value),
      setScrollMode: (value: string) => setScrollMode(value),
      setHoverIndex: (value: number) => setHoverIndex(value),
      setCheckIndex: (value: any) => {
        setCheckIndex(
          checkIndex.map((item, index) => {
            if (index == value.index) {
              return value.value
            }
            return item
          }),
        )
      },
      setCheckAll: (value: boolean) => {
        setCheckIndex(checkIndex.map(() => value))
      },
      setFields: (value: any[]) => setFields(value),
      setData: (value: any[]) => setData(value),
      setUseCheckbox: (value: boolean) => setUseCheckbox(value),
      setIndeterminate: (value: boolean) => setIndeterminate(value),
      setCheckHeader: (value: boolean) => setCheckHeader(value),
      setPerRows: (value: number) => setPerRows(value),
      setPage: (value: number) => setPage(value),
      getData: () => datastore,
    }

    if (props.toolbar) {
      setToolbar(true)
    } else {
      setToolbar(false)
    }
  }, [])

  useEffect(() => {
    const check = !checkIndex.includes(false)
    const checkIndeterminate = checkIndex.some(Boolean) && checkIndex.some((x: any) => !x)
    setIndeterminate(checkIndeterminate)
    setCheckHeader(check)
  }, [checkIndex])

  useEffect(() => {
    const handleMouseDown = (e: any) => {
      if (e.shiftKey) {
        console.log('Activate')
        setModeShift(true)
      }
      if (e.key == 'Escape') {
        console.log('Clean All')
        setModeShift(false)
        setStartNumber(-1)
        setCheckIndex(checkIndex.map(() => false))
      }
    }

    window.addEventListener('keydown', handleMouseDown)
    return () => {
      window.removeEventListener('keydown', handleMouseDown)
    }
  }, [modeShift])

  return Root({
    theme: colors,
    height: 'auto',
    child: Column({
      color: 'theme.background',
      children: [
        //TOOLBAR
        !toolbar
          ? null
          : Container({
              height: 50,
              borderBottom: '1px solid theme.border',
              child: Row({
                alignItems: 'center',
                children: [
                  Container({
                    width: 60,
                    child: Center({
                      child: Icon('refresh', {
                        onClick: () => {
                          console.log('refresh')
                        },
                      }),
                    }),
                  }),
                  Button('Add Data', { icon: 'add', height: 35 }),
                  Space(10),
                  !isSelectOne ? null : Button('Edit Data', { icon: 'edit', height: 35 }),
                  Space(10),
                  !isSelectOne
                    ? null
                    : Button('Delete Data', {
                        icon: 'edit',
                        height: 35,
                        backgroundColor: 'theme.error',
                        onClick: () => {
                          Confirm({
                            theme: colors,
                            title: 'Confirmation',
                            message: 'Are you sure you want to delete it?',
                            onAccept: (accept: any) => {
                              console.log('delete', accept)
                            },
                          })
                        },
                      }),
                  Expanded(),
                  Container({
                    width: focus ? 400 : 200,
                    transition: !focus ? 'unset' : '0.3s width ease-in-out',
                    child: Center({
                      child: TextField({
                        placeholder: 'Search ...',
                        endIcon: Icon(search.length ? 'close' : 'search', {
                          cursor: 'pointer',
                          onClick: () => setSearch(''),
                        }),
                        value: search,
                        onFocus: () => setFocus(true),
                        onBlur: () => setFocus(false),
                        onChange: (e: any) => setSearch(e.target.value),
                      }),
                    }),
                  }),
                  Space(10),
                ],
              }),
            }),

        //HEADER
        !header
          ? null
          : Container({
              height: 40,
              borderBottom: '1px solid theme.border',
              display: 'flex',
              backgroundColor: 'theme.backgroundPaper',
              radius: 10,
              onMouseEnter: () => {
                setScrollMode('header')
              },
              child: Row({
                children: [
                  !useCheckbox
                    ? null
                    : Container({
                        width: 40,
                        borderRight: '1px solid theme.border',
                        child: Center({
                          child: Checkbox({
                            checked: checkHeader,
                            indeterminate,
                            onClick: (e: any) => {
                              setCheckIndex(checkIndex.map(() => e.target.checked))
                              setCheckHeader(e.target.checked)
                            },
                          }),
                        }),
                      }),
                  Container({
                    width: 40,
                    // borderRight: "1px solid theme.border",
                    child: Center({
                      child: Text('No', { size: 12, weight: 'bold' }),
                    }),
                  }),
                  Expanded({
                    child: SingleChildScrollView({
                      ref: headerRef,
                      direction: 'horizontal',
                      onScroll: (e: any) => {
                        if (scrollMode === 'header') {
                          bodyRef!.current!.scrollLeft = e.target.scrollLeft
                        }
                      },
                      child: Row({
                        width: fields.reduce((acc: any, field: any) => acc + field.width, 0),
                        children: fields.map((field: any) => {
                          return Container({
                            width: field.width,
                            // borderRight: "1px solid theme.border",
                            child: Center({
                              child: Text(field.title, {
                                size: 12,
                                weight: 'bold',
                              }),
                            }),
                          })
                        }),
                      }),
                    }),
                  }),
                ],
              }),
            }),

        //BODY
        Expanded({
          child: Row({
            children: [
              Container({
                // color: "theme.backgroundPaper",
                child: SingleChildScrollView({
                  ref: splitRef,
                  onMouseEnter: () => {
                    setScrollMode('split')
                  },
                  onScroll: (e: any) => {
                    if (scrollMode === 'split') {
                      bodyRef!.current!.scrollTop = e.target.scrollTop
                    }
                  },
                  child: Column({
                    children: datastore
                      .filter(item => {
                        //filter by search
                        return item
                      })
                      .map((_data: any, x: number) => {
                        return Row({
                          onMouseMove: () => {
                            if (modeShift) {
                              console.log('setup....')
                              setCheckIndex(checkIndex.map(() => false))
                              for (let i = startNumber; i < x; i++) {
                                checkIndex[i] = true
                              }
                              setCheckIndex(checkIndex)
                            }
                          },
                          children: [
                            !useCheckbox
                              ? null
                              : Container({
                                  width: 40,
                                  height: 40,
                                  borderRight: '1px solid theme.border',
                                  borderBottom: '1px solid theme.border',
                                  child: Center({
                                    child: Checkbox({
                                      checked: checkIndex[x],
                                      onClick: (e: any) => {
                                        const checked = e.target.checked
                                        checkIndex[x] = checked
                                        setCheckIndex(checkIndex)
                                        setModeShift(false)
                                        setStartNumber(x)
                                      },
                                    }),
                                  }),
                                }),
                            Container({
                              width: 40,
                              height: 40,
                              // borderRight: "1px solid theme.border",
                              borderBottom: '1px solid theme.border',
                              child: Center({
                                child: Text(`${x + 1}`, { size: 14 }),
                              }),
                            }),
                          ],
                        })
                      }),
                  }),
                }),
              }),
              Expanded({
                child: SingleChildScrollView({
                  ref: bodyRef,
                  onMouseEnter: () => {
                    setScrollMode('body')
                  },
                  onScroll: (e: any) => {
                    if (scrollMode === 'body') {
                      if (splitRef && splitRef) {
                        splitRef!.current!.scrollTop = e.target.scrollTop
                        headerRef!.current!.scrollLeft = e.target.scrollLeft
                      }
                    }
                  },
                  child: Container({
                    width: fields.reduce((acc: any, field: any) => acc + field.width, 0),
                    // height: 51 * (datastore.length + 0),
                    borderBottom: '0px',
                    child: Column({
                      children: datastore.map((data: any, x: number) => {
                        return Row({
                          color: checkIndex[x] ? 'theme.active' : hoverIndex == x ? 'theme.hover' : 'theme.background',
                          width: fields.reduce((acc: any, field: any) => acc + field.width, 0),
                          height: 40,
                          borderBottom: '1px solid theme.border',
                          onMouseEnter: () => setHoverIndex(x),
                          onMouseLeave: () => setHoverIndex(-1),
                          onClick: () => {
                            checkIndex[x] = !checkIndex[x]
                            setCheckIndex(checkIndex)
                          },
                          attr: {
                            'data-row-index': x.toString(),
                          },
                          children: fields.map((field: any) => {
                            return Container({
                              width: field.width,
                              // borderRight: "1px solid theme.border",
                              onContextMenu: (e: any) => {
                                const menu = Menu(e, {
                                  children: [
                                    { label: 'Edit', icon: 'edit' },
                                    { label: 'Copy', icon: 'copy' },
                                    { label: 'Cut', icon: 'cut' },
                                    { label: 'Paste', icon: 'paste' },
                                    { label: 'Duplicate', icon: 'duplicate' },
                                    { label: 'Move', icon: 'play' },
                                    'Divider',
                                    { label: 'Delete', icon: 'delete' },
                                  ].map((item: any) => {
                                    if (item === 'divider') {
                                      return Divider({ width: 300 })
                                    }
                                    return MenuItem({
                                      onClick: () => {
                                        menu.unMounting()
                                      },
                                      child: ListItemText({
                                        child: Row({
                                          width: 300,
                                          children: [
                                            item.icon
                                              ? Container({
                                                  width: 30,
                                                  child: Icon(item.icon),
                                                })
                                              : Space(30),
                                            Text(item.label),
                                          ],
                                        }),
                                      }),
                                    })
                                  }),
                                })
                              },
                              child: Center({
                                boxSizing: 'border-box',
                                justifyContent: field.title == 'No' ? 'center' : 'start',
                                child: Container({
                                  child: Text(data[field.title], {
                                    size: 12,
                                    paddingLeft: 10,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: 'inline-block',
                                    width: field.width - 20,
                                  }),
                                }),
                              }),
                            })
                          }),
                        })
                      }),
                    }),
                  }),
                }),
              }),
            ],
          }),
        }),

        //PAGINATION
        !pagination
          ? null
          : Container({
              height: 40,
              borderTop: '1px solid theme.border',
              color: 'theme.backgroundPaper',
              fontSize: 12,
              radius: 10,
              child: Row({
                center: true,
                children: [
                  Space(10),
                  Text(`Total Rows: ${datastore.length}`),
                  Space(10),
                  Container({
                    width: 65,
                    child: Container({
                      height: 20,
                      margin: 9,
                      radius: 5,
                      border: '1px solid theme.border',
                      onClick: (e: any) => {
                        const menu = Menu(e, {
                          children: [
                            { label: perRows.toString() },
                            'divider',
                            { label: '10' },
                            { label: '25' },
                            { label: '50' },
                            { label: '100' },
                          ].map((item: any) => {
                            if (item === 'divider') {
                              return Divider({ width: 200 })
                            }
                            return MenuItem({
                              onClick: () => {
                                menu.unMounting()
                                setPerRows(parseInt(item.label))
                              },
                              child: ListItemText({
                                child: Row({
                                  children: [
                                    item.icon
                                      ? Container({
                                          width: 30,
                                          child: item.icon,
                                        })
                                      : Space(30),
                                    Text(item.label),
                                  ],
                                }),
                              }),
                            })
                          }),
                        })
                      },
                      child: Row({
                        center: true,
                        children: [
                          Space(10),
                          Expanded({
                            child: Text(perRows.toString()),
                          }),
                          Icon('arrow_drop_down'),
                          Space(5),
                        ],
                      }),
                    }),
                  }),
                  Expanded(),
                  Click({
                    width: 'unset',
                    height: 'unset',
                    click: () => {
                      if (page > 1) {
                        setPage(page - 1)
                      }
                    },
                    child: Icon('arrow_back_ios', { size: 14 }),
                  }),
                  Space(10),
                  Text(`${page} of 20`),
                  Space(10),
                  Click({
                    width: 'unset',
                    height: 'unset',
                    click: () => setPage(page + 1),
                    child: Icon('arrow_forward_ios', { size: 14 }),
                  }),
                  Space(10),
                ],
              }),
            }),
      ],
    }),
  }).builder()
}
