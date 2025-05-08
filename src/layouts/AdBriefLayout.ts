import {
  Root,
  Column,
  Container,
  Expanded,
  Rows,
  Widget,
  Text,
} from "../System/Lib/Widgets";
import SideBar from "../pages/tutorial/SideBar";
import { Outlet } from "react-router-dom";
import Header from "../pages/tutorial/Header";
import { useTheme } from "@/hooks/useTheme";
//import Header from '../pages/tutorial/Header'

export default function AdBriefLayout() {
  const Theme = useTheme();

  return Root({
    theme: Theme.colors,
    child: Container({
      color: Theme.colors.background,
      child: Rows({
        children: [
          Container({
            width: 250,
            backgroundColor: Theme.theme === "dark" ? "#303030" : "#D3D3D3",
            borderRight: "1px solid theme.border",
            child: SideBar(),
          }),
          Expanded({
            // border: "1px solid theme.border",
            child: Column({
              children: [
                Container({
                  height: 50,
                  color: Theme.theme,
                  border: "1px solid theme.border",
                  child: Header(),
                }),
                Expanded({
                  child: Rows({
                    children: [
                      Expanded({ child: Widget(Outlet) }),
                      // Container({
                      //   width: 350,
                      //   borderLeft: '1px solid theme.border',
                      //   child: SideBarChat(),
                      // }),
                    ],
                  }),
                }),
                Container({
                  height: 35,
                  color: Theme.theme,
                  textAlign: "center",
                  justifyContent: "center",
                  //borderTop: '1px solid theme.border',
                  child: Text(
                    "AdBriefAI mungkin tidak selalu akurat. Pastikan untuk memeriksa informasi penting sebelum digunakan.",
                    {
                      size: 12,
                      textAlign: "center",
                    },
                  ),
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  }).builder();
}
