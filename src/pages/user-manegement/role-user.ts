import { useRef, useState } from "react";
import { Column, Container } from "@/System/Lib/Widgets";
import Table, { Field } from "@/System/Lib/Table.ts";
import { useAppSelector } from "@/store";
import BreadCrumbs from "@/components/BreadCrumbs";

const resData = {
  data: Array.from({ length: 2000 }, (_v, i) => ({
    Role: `Role ${i + 1}`,
    PIC: `User ${i + 1}`,
    "Tanggal Modify": `${new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}`,
  })),
  pagination: {
    page: 1,
    total: 2000,
    totalPage: 10,
  },
};

export default function RoleUser() {
  const theme = useAppSelector((state) => state.theme);
  const fields: Field[] = [
    { title: "Role", align: "center" },
    { title: "PIC", align: "center" },
    { title: "Tanggal Modify", align: "center" },
  ];

  const [data, setData] = useState({
    ...resData,
    data: resData.data.slice(0, 10),
  });

  const tableRef = useRef<any>(null);

  return Column({
    theme: theme.colors,
    background: theme.colors.background,
    padding: 14,
    children: [
      BreadCrumbs(),
      Container({
        height: 200,
        display: "flex",
        flexDirection: "column",
        borderRadius: 10,
        padding: 10,
        width: "unset",
        flex: 1,
        overflowX: "auto",
        child: Container({
          flex: 1,
          display: "flex",
          overflowY: "hidden",
          child: Table({
            ref: tableRef,
            toolbar: true,
            header: true,
            fields,
            onRefresh: async () => {
              await new Promise<void>((resolve) =>
                setTimeout(() => {
                  console.log("Refresh finished");
                  resolve();
                }, 500),
              );
            },
            onAddBtnClick: () => {
              console.log("Add button clicked");
            },
            onSearchChange: async (options) => {
              console.log(options);
              await new Promise<void>((resolve) =>
                setTimeout(() => {
                  console.log("Search finished");
                  resolve();
                }, 500),
              );
            },
            pagination: {
              ...data.pagination,
              onPageChange: async (options) => {
                console.log(options);
                await new Promise<void>((resolve) =>
                  setTimeout(() => {
                    setData({
                      ...data,
                      data: resData.data.slice(0, options.perRows),
                      pagination: { ...resData.pagination, page: options.page },
                    });
                    console.log("Page changed");
                    resolve();
                  }, 500),
                );
              },
              onPerPageChange: async (options) => {
                console.log(options);
                await new Promise<void>((resolve) =>
                  setTimeout(() => {
                    setData({
                      ...data,
                      data: resData.data.slice(0, options.perRows),
                    });
                    console.log("Per page changed");
                    resolve();
                  }, 500),
                );
              },
            },
            data: data.data,
          }),
        }),
      }),
    ],
  }).builder();
}
