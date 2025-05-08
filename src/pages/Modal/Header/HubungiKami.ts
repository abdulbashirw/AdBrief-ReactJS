import { useSelector } from "react-redux";
import { Column, Expanded, Space, Text } from "../../../System/Lib/Widgets";
import { RootState } from "../../../store";

export default function ContentHubungiKami() {
  const { colors } = useSelector((state: RootState) => state.theme);

  return Column({
    width: "100%",
    theme: colors,
    boxSizing: "border-box",
    color: "theme.background",
    child: Column({
      padding: 20,
      children: [
        Text("Judul Hubungi Kami", { size: 30 }),
        Space(20),
        Expanded({
          child: Text("Content ", { size: 30 }),
        }),
      ],
    }),
  }).builder();
}
