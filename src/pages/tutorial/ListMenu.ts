import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { IconMui } from "../../System/Lib/Widgets";

export interface MenuTutorProps {
  icon: any;
  name: string;
  path: string;
}

export const allMenu: MenuTutorProps[] = [
  {
    icon: IconMui(HomeRoundedIcon),
    name: "Home",
    path: "/",
  },
  {
    icon: IconMui(DashboardRoundedIcon),
    name: "Dashboard",
    path: "dashboard",
  },
  {
    icon: IconMui(ManageAccountsRoundedIcon),
    name: "User Management",
    path: "user-management",
  },
];
