import {
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  Row,
  SingleChildScrollView,
  Space,
  Text,
  TextField,
} from "./Widgets";
import { useDebounce } from "@uidotdev/usehooks";
import { ThemeState } from "@/store/slices/theme.slice.ts";
import { useTheme } from "@/hooks/useTheme";

export type Field = {
  width?: number | `${number}%`;
  title?: string;
  align?: "start" | "center" | "end";
};

interface TableWidgetProps {
  /**
   * Name of the table widget.
   */
  name?: string;

  /**
   * Mutable ref object to manage state and actions.
   */
  ref?: RefObject<any>;

  /**
   * Array of field objects that describe the table structure.
   * Each field includes a width and title.
   */
  fields: Field[];

  /**
   * Array of data objects for the table's rows.
   */
  data?: Record<string, any>[];

  pagination?: {
    total: number;
    totalPage: number;
    page: number;
    perRows?: number;
    onPageChange: (options: { perRows: number; page: number }) => Promise<void>;
    onPerPageChange: (options: {
      perRows: number;
      page: number;
    }) => Promise<void>;
  };

  /**
   * Determines if the toolbar should be displayed.
   */
  toolbar?: boolean;

  /**
   * Enables or disables checkboxes in the table.
   */
  useCheckbox?: boolean;

  multiSelect?: boolean;

  /**
   * Determines if the header should be displayed.
   */
  header?: boolean;

  onRefresh?: () => Promise<void>;
  onSearchChange?: (params: {
    search: string;
    page: number;
    perRows: number;
  }) => Promise<void>;
  searchDebounceDelay?: number;
  onAddBtnClick?: (params: { page: number; perRows: number }) => void;
}

// For checking render time during state changes
let times = 0;

export default function Table(props: TableWidgetProps) {
  props.ref = props.ref || useRef(null);

  const headerRef = useRef(null);
  const splitRef = useRef(null);
  const bodyRef = useRef(null);
  const bodyRowRefs = useRef<RefObject<HTMLDivElement | null>[]>([]);

  const { colors } = useTheme();
  const [isMounted, setMounted] = useState(false);
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  const [checkIndexes, setCheckIndexes] = useState<boolean[]>(
    props.data?.map(() => false) || [],
  );
  const [useCheckbox, setUseCheckbox] = useState(props.useCheckbox || false);
  const [disabled, setDisabled] = useState(false);
  const [header, setHeader] = useState(true);
  const [toolbar, setToolbar] = useState(props.toolbar || false);
  const [pagination, setPagination] = useState(true);
  const [perRows, setPerRows] = useState(props.pagination?.perRows || 10);
  const [page, setPage] = useState(props.pagination?.page || 1);

  const searchDebounced = useDebounce(search, props.searchDebounceDelay || 300);

  const fields = useMemo(() => props.fields || [], [props.fields]);
  const datastore = useMemo(() => props.data || [], [props.data]);
  const allChecked = useMemo(() => checkIndexes.every(Boolean), [checkIndexes]);
  const someChecked = useMemo(() => checkIndexes.some(Boolean), [checkIndexes]);
  const indeterminate = useMemo(
    () => someChecked && !allChecked,
    [someChecked, allChecked],
  );
  const isSelectOne = useMemo(
    () => checkIndexes.filter(Boolean).length === 1,
    [checkIndexes],
  );

  if (props.ref) {
    props.ref.current = {
      hideHeader: () => setHeader(false),
      showHeader: () => setHeader(true),
      hideToolbar: () => setToolbar(false),
      showToolbar: () => setToolbar(true),
      hidePagination: () => setPagination(false),
      showPagination: () => setPagination(true),
      setFocus: (value: boolean) => setFocus(value),
      setSearch: (value: string) => setSearch(value),
      setCheckIndexes: (
        value: ((prevState: boolean[]) => boolean[]) | boolean[],
      ) => {
        if (Array.isArray(value)) {
          setCheckIndexes(value);
        } else if (typeof value === "function") {
          setCheckIndexes((prevState) => value(prevState));
        }
      },
      setCheckAll: (value: ((prevState: boolean) => boolean) | boolean) => {
        if (typeof value === "boolean") {
          setCheckIndexes((prevState) => prevState.map(() => value));
        } else {
          setCheckIndexes((prevState) =>
            prevState.map(() => value(allChecked)),
          );
        }
      },
      setUseCheckbox: (value: boolean) => setUseCheckbox(value),
      setCheckHeader: (value: boolean) => {
        setCheckIndexes((prevState) => prevState.map(() => value));
      },
      setPerRows: (value: number) => setPerRows(value),
      setPage: (value: number) => setPage(value),
      getData: () => datastore,
    };
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    (async () => {
      if (props.pagination) {
        setDisabled(true);
        props.pagination
          .onPageChange({ page, perRows })
          .finally(() => setDisabled(false));
      }
    })();
  }, [page]);

  useEffect(() => {
    if (!isMounted) return;
    (async () => {
      if (props.pagination) {
        setDisabled(true);
        await props.pagination
          .onPerPageChange({ page, perRows })
          .finally(() => setDisabled(false));
      }
    })();
  }, [perRows]);

  useEffect(() => {
    if (!isMounted) return;
    (async () => {
      if (props.onSearchChange) {
        setDisabled(true);
        await props
          .onSearchChange({ search, page, perRows })
          .finally(() => setDisabled(false));
      }
    })();
  }, [searchDebounced]);

  // Update checkIndexes whenever data size changed
  useEffect(() => {
    if (datastore.length !== checkIndexes.length) {
      setCheckIndexes((prevState) => {
        if (datastore.length > prevState.length) {
          return [
            ...prevState,
            ...Array(datastore.length - prevState.length).fill(false),
          ];
        }
        return Array(datastore.length).fill(indeterminate);
      });
    }
  }, [datastore.length, checkIndexes.length]);

  // Checking render times when state change
  console.log("Table Rendered: ", ++times);

  return Root({
    theme: colors,
    height: "auto",
    child: Column({
      height: "unset",
      color: "theme.background",
      children: [
        //TOOLBAR
        !toolbar
          ? null
          : Toolbar({
              colors,
              onRefresh: props.onRefresh,
              onAddBtnClick: props.onAddBtnClick,
              page,
              perRows,
              focus,
              setFocus,
              search,
              setSearch,
              isSelectOne,
              disabled,
              setDisabled,
            }),

        //HEADER
        !header
          ? null
          : TableHeader({
              headerRef,
              bodyRef,
              useCheckbox,
              fields,
              setCheckIndexes,
              checkIndexes,
              allChecked,
              indeterminate,
              multiSelect: props.multiSelect,
            }),

        //BODY
        TableBody({
          colors,
          splitRef,
          headerRef,
          bodyRef,
          bodyRowRefs,
          fields,
          datastore,
          useCheckbox,
          multiSelect: props.multiSelect,
          checkIndexes,
          setCheckIndexes,
        }),

        //PAGINATION
        !pagination
          ? null
          : Pagination({
              pagination: props.pagination,
              page,
              setPage,
              perRows,
              setPerRows,
              disabled,
              datastore,
            }),
      ],
    }),
  }).builder();
}

const Toolbar = ({
  colors,
  onRefresh,
  onAddBtnClick,
  page,
  perRows,
  disabled,
  isSelectOne,
  setDisabled,
  search,
  setSearch,
  focus,
  setFocus,
}: {
  colors: any;
  onRefresh?: () => Promise<void>;
  onAddBtnClick?: (params: { page: number; perRows: number }) => void;
  page: number;
  perRows: number;
  isSelectOne: boolean;
  focus: boolean;
  search: string;
  disabled: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}) =>
  Container({
    height: 50,
    child: Row({
      alignItems: "center",
      children: [
        onRefresh
          ? Container({
              width: 60,
              child: Click({
                cursor: disabled ? "not-allowed" : "pointer",
                click: () => {
                  if (disabled || !onRefresh) return;
                  setDisabled(true);
                  onRefresh().finally(() => setDisabled(false));
                },
                child: Center({
                  child: Icon("refresh", {
                    color: disabled ? "theme.disabled" : undefined,
                  }),
                }),
              }),
            })
          : null,
        Button("Add Data", {
          textColor: "white",
          icon: "add",
          disabled,
          height: 35,
          click: async () => {
            if (disabled || !onAddBtnClick) return;
            onAddBtnClick({ page, perRows });
          },
        }),
        Space(10),
        !isSelectOne
          ? null
          : Button("Edit Data", {
              textColor: "white",
              icon: "edit",
              height: 35,
            }),
        Space(10),
        !isSelectOne
          ? null
          : Button("Delete Data", {
              textColor: "white",
              icon: "edit",
              height: 35,
              backgroundColor: "theme.error",
              onClick: () => {
                Confirm({
                  theme: colors,
                  title: "Confirmation",
                  message: "Are you sure you want to delete it?",
                  onAccept: (accept: any) => {
                    console.log("delete", accept);
                  },
                });
              },
            }),
        Expanded(),
        Container({
          width: focus ? 400 : 200,
          transition: !focus ? "unset" : "0.3s width ease-in-out",
          child: Center({
            child: TextField({
              placeholder: "Search ...",
              endIcon: Icon(search.length ? "close" : "search", {
                cursor: "pointer",
                onClick: () => setSearch(""),
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
  });

const TableHeader = ({
  headerRef,
  bodyRef,
  useCheckbox,
  setCheckIndexes,
  checkIndexes,
  allChecked,
  indeterminate,
  multiSelect,
  fields,
}: {
  headerRef: RefObject<HTMLDivElement | null> | null;
  bodyRef: RefObject<HTMLDivElement | null> | null;
  useCheckbox: boolean;
  setCheckIndexes: (newCheckIndexes: boolean[]) => void;
  checkIndexes: boolean[];
  indeterminate: boolean;
  allChecked: boolean;
  multiSelect?: boolean;
  fields: Field[];
}) =>
  Container({
    height: 40,
    borderBottom: "1px solid theme.border",
    display: "flex",
    backgroundColor: "theme.backgroundPaper",
    radius: 10,
    child: Row({
      children: [
        !useCheckbox
          ? null
          : !multiSelect
            ? Container({ width: 40 })
            : Container({
                width: 40,
                borderRight: "1px solid theme.border",
                child: Center({
                  child: Checkbox({
                    checked: allChecked,
                    indeterminate,
                    sx: {
                      "& .MuiSvgIcon-root": {
                        color:
                          allChecked || indeterminate
                            ? "theme.textPrimary"
                            : "theme.primary",
                      },
                    },
                    onClick: (e: any) => {
                      if (multiSelect) {
                        const isChecked = !!e.target.checked;
                        setCheckIndexes(
                          Array(checkIndexes.length).fill(isChecked),
                        );
                      }
                    },
                  }),
                }),
              }),
        Container({
          width: 40,
          child: Center({
            child: Text("No", { size: 12, weight: "bold" }),
          }),
        }),
        Expanded({
          child: SingleChildScrollView({
            ref: headerRef,
            direction: "horizontal",
            onScroll: (e: any) => {
              if (bodyRef?.current) {
                bodyRef.current.scrollLeft = e.target.scrollLeft;
              }
            },
            child: Row({
              width: calculateTotal(fields.map((field) => field.width || 0)),
              children: fields.map((field: any) => {
                return Container({
                  boxSizing: "border-box",
                  padding: 10,
                  display: "flex",
                  width: field.width,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: field.align || "center",
                  child: Text(field.title, { size: 12, weight: "bold" }),
                });
              }),
            }),
          }),
        }),
      ],
    }),
  });

const TableBody = ({
  colors,
  splitRef,
  headerRef,
  bodyRef,
  bodyRowRefs,
  useCheckbox,
  multiSelect,
  checkIndexes,
  setCheckIndexes,
  fields,
  datastore,
}: {
  colors: ThemeState["colors"];
  splitRef: RefObject<HTMLDivElement | null> | null;
  headerRef: RefObject<HTMLDivElement | null> | null;
  bodyRef: RefObject<HTMLDivElement | null> | null;
  bodyRowRefs: RefObject<RefObject<HTMLDivElement | null>[]>;
  useCheckbox: boolean;
  multiSelect?: boolean;
  checkIndexes: boolean[];
  setCheckIndexes: Dispatch<SetStateAction<boolean[]>>;
  fields: Field[];
  datastore: any[];
}) => {
  const numRowRefs = Array.from({ length: datastore.length }).map(() =>
    createRef<HTMLDivElement>(),
  );
  bodyRowRefs.current = datastore.map(() => {
    return createRef<HTMLDivElement>();
  });
  return Expanded({
    child: Row({
      cursor: "pointer",
      children: [
        Container({
          child: SingleChildScrollView({
            ref: splitRef,
            onScroll: (e: any) => {
              if (bodyRef?.current) {
                bodyRef.current.scrollTop = e.target.scrollTop;
              }
            },
            child: Column({
              children: datastore.map((_data: any, x: number) => {
                const rowRef = bodyRowRefs.current[x];
                const numRef = numRowRefs[x];
                return Row({
                  ref: numRef,
                  color: checkIndexes[x] ? "theme.active" : "inherit",
                  onMouseEnter: () => {
                    if (rowRef.current && numRef.current && !checkIndexes[x]) {
                      rowRef.current.style.backgroundColor = colors.hover;
                      numRef.current.style.backgroundColor = colors.hover;
                    }
                  },
                  onMouseLeave: () => {
                    if (rowRef.current && numRef.current) {
                      if (checkIndexes[x]) {
                        rowRef.current.style.backgroundColor = "theme.active";
                        numRef.current.style.backgroundColor = "theme.active";
                      } else {
                        rowRef.current.style.backgroundColor = "inherit";
                        numRef.current.style.backgroundColor = "inherit";
                      }
                    }
                  },
                  onClick: () => {
                    setCheckIndexes((prevCheckIndexes) => {
                      let newCheckIndexes: typeof prevCheckIndexes;
                      if (multiSelect) {
                        newCheckIndexes = [...prevCheckIndexes];
                        newCheckIndexes[x] = !newCheckIndexes[x];
                      } else {
                        newCheckIndexes = Array(prevCheckIndexes.length).fill(
                          false,
                        );
                        newCheckIndexes[x] = !prevCheckIndexes[x];
                      }
                      return newCheckIndexes;
                    });
                  },
                  children: [
                    !useCheckbox
                      ? null
                      : Container({
                          width: 40,
                          height: 40,
                          borderRight: "1px solid theme.border",
                          borderBottom: "1px solid theme.border",
                          child: Center({
                            child: Checkbox({
                              checked: checkIndexes[x],
                              sx: {
                                "& .MuiSvgIcon-root": {
                                  color: checkIndexes[x]
                                    ? "theme.textPrimary"
                                    : "theme.primary",
                                },
                              },
                              onClick: () => {
                                const newCheckIndexes = [...checkIndexes];
                                newCheckIndexes[x] = !newCheckIndexes[x];
                                setCheckIndexes(newCheckIndexes);
                              },
                            }),
                          }),
                        }),
                    Container({
                      width: 40,
                      height: 40,
                      borderBottom: "1px solid theme.border",
                      child: Center({
                        child: Text(`${x + 1}`, { size: 14 }),
                      }),
                    }),
                  ],
                });
              }),
            }),
          }),
        }),
        Expanded({
          child: SingleChildScrollView({
            ref: bodyRef,
            onScroll: (e: any) => {
              if (splitRef?.current && headerRef?.current) {
                splitRef.current.scrollTop = e.target.scrollTop;
                headerRef.current.scrollLeft = e.target.scrollLeft;
              }
            },
            child: Container({
              width: calculateTotal(fields.map((field) => field.width || 0)),
              borderBottom: "0px",
              child: Column({
                children: datastore.map((data: any, x: number) => {
                  const rowRef = bodyRowRefs.current[x];
                  const numRef = numRowRefs[x];
                  return Row({
                    ref: rowRef,
                    color: checkIndexes[x] ? "theme.active" : "inherit",
                    width: calculateTotal(
                      fields.map((field) => field.width || 0),
                    ),
                    height: 40,
                    borderBottom: "1px solid theme.border",
                    onMouseEnter: () => {
                      if (
                        rowRef.current &&
                        numRef.current &&
                        !checkIndexes[x]
                      ) {
                        rowRef.current.style.backgroundColor = colors.hover;
                        numRef.current.style.backgroundColor = colors.hover;
                      }
                    },
                    onMouseLeave: () => {
                      if (rowRef.current && numRef.current) {
                        if (checkIndexes[x]) {
                          rowRef.current.style.backgroundColor = "theme.active";
                          numRef.current.style.backgroundColor = "theme.active";
                        } else {
                          rowRef.current.style.backgroundColor = "inherit";
                          numRef.current.style.backgroundColor = "inherit";
                        }
                      }
                    },
                    onClick: () => {
                      setCheckIndexes((prevCheckIndexes) => {
                        let newCheckIndexes: typeof prevCheckIndexes;
                        if (multiSelect) {
                          newCheckIndexes = [...prevCheckIndexes];
                          newCheckIndexes[x] = !newCheckIndexes[x];
                        } else {
                          newCheckIndexes = Array(prevCheckIndexes.length).fill(
                            false,
                          );
                          newCheckIndexes[x] = !prevCheckIndexes[x];
                        }
                        return newCheckIndexes;
                      });
                    },

                    attr: {
                      "data-row-index": x.toString(),
                    },
                    children: fields.map((field: any) => {
                      return Container({
                        display: "flex",
                        width: field.width,
                        flex: 1,
                        onContextMenu: (e: any) => {
                          const menu = Menu(e, {
                            anchorOrigin: {
                              horizontal: "right",
                            },
                            theme: colors,
                            sx: {
                              "& .MuiList-root": {
                                backgroundColor: colors.backgroundPaper,
                                "& .MuiMenuItem-root:hover": {
                                  backgroundColor: colors.hover,
                                },
                              },
                            },
                            children: [
                              { label: "Edit", icon: "edit" },
                              { label: "Detail", icon: "list" },
                              "Divider",
                              { label: "Delete", icon: "delete" },
                            ].map((item: any) => {
                              if (item === "Divider") {
                                return Divider({ margin: "0 10px" });
                              }
                              return MenuItem({
                                onClick: () => {
                                  menu.unMounting();
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
                              });
                            }),
                          });
                        },
                        child: Container({
                          width: "100%",
                          boxSizing: "border-box",
                          display: "flex",
                          padding: 10,
                          justifyContent:
                            field.align ||
                            (field.title == "No" ? "center" : "start"),
                          child: Text(data[field.title], {
                            size: 12,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "inline-block",
                          }),
                        }),
                      });
                    }),
                  });
                }),
              }),
            }),
          }),
        }),
      ],
    }),
  });
};

const Pagination = ({
  pagination,
  page,
  setPage,
  perRows,
  setPerRows,
  disabled,
  datastore,
}: {
  pagination?: { total?: number; totalPage?: number } | null;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  perRows: number;
  setPerRows: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  datastore: any[];
}) => {
  const paginationPerRows = [perRows, "divider", 10, 25, 50, 100];

  return Container({
    height: 40,
    borderTop: "1px solid theme.border",
    color: "theme.backgroundPaper",
    fontSize: 12,
    radius: 10,
    child: Row({
      center: true,
      children: [
        Space(10),
        Text(`Total Rows: ${pagination?.total || datastore.length}`),
        Space(10),
        Container({
          width: 65,
          child: Container({
            cursor: disabled ? "not-allowed" : "pointer",
            height: 20,
            margin: 9,
            radius: 5,
            border: "1px solid theme.border",
            onClick: (e: any) => {
              if (disabled) return;
              const menu = Menu(e, {
                children: paginationPerRows.map((item: any) => {
                  if (item === "divider") {
                    return Divider({ width: 200 });
                  }
                  return MenuItem({
                    onClick: () => {
                      menu.unMounting();
                      setPerRows(item);
                    },
                    child: ListItemText({
                      child: Text(item),
                    }),
                  });
                }),
              });
            },
            child: Row({
              center: true,
              children: [
                Space(10),
                Expanded({
                  child: Text(perRows.toString(), {
                    color: disabled ? "theme.disabled" : undefined,
                  }),
                }),
                Icon("arrow_drop_down"),
                Space(5),
              ],
            }),
          }),
        }),
        Expanded(),
        Click({
          width: "unset",
          height: "unset",
          click: () => {
            if (page <= 1 || disabled) return;
            setPage(page - 1);
          },
          child: Icon("arrow_back_ios", {
            size: 14,
            color: disabled || page <= 1 ? "theme.disabled" : undefined,
            cursor: disabled || page <= 1 ? "not-allowed" : "pointer",
          }),
        }),
        Space(10),
        Text(`${page} of ${pagination?.totalPage ?? 0}`),
        Space(10),
        Click({
          width: "unset",
          height: "unset",
          click: () => {
            if (disabled || page >= (pagination?.totalPage ?? 1)) return;
            setPage(page + 1);
          },
          child: Icon("arrow_forward_ios", {
            size: 14,
            color:
              disabled || page >= (pagination?.totalPage ?? 1)
                ? "theme.disabled"
                : undefined,
            cursor:
              disabled || page >= (pagination?.totalPage ?? 1)
                ? "not-allowed"
                : "pointer",
          }),
        }),
        Space(10),
      ],
    }),
  });
};

export function calculateTotal(values: (number | string)[]): number | string {
  const hasPercent = values.some(
    (v) => typeof v === "string" && v.trim().endsWith("%"),
  );
  const hasNumber = values.some(
    (v) =>
      typeof v === "number" ||
      (!isNaN(Number(v)) && !`${v}`.trim().endsWith("%")),
  );

  if (hasPercent && hasNumber) {
    const calcParts = values
      .filter((v) => v !== "" && v !== null)
      .map((v) =>
        typeof v === "number" ||
        (!isNaN(Number(v)) && !`${v}`.trim().endsWith("%"))
          ? Number(v)
          : v,
      );
    return `calc(${calcParts.join(" + ")})`;
  }

  if (hasPercent) {
    const total = values.reduce((acc: number, val) => {
      if (typeof val === "string" && val.trim().endsWith("%")) {
        return acc + parseFloat(val);
      }
      return acc;
    }, 0);
    return `${total}%`;
  }

  const value = values.reduce((acc: number, val) => acc + Number(val), 0);
  if (value <= 0) return "auto";
  return value;
}
