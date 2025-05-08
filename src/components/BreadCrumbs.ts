import { Container, Icon, Row, Text } from "@/System/Lib/Widgets";
import { useGetBreadcrumbs } from "@/hooks/useGetBreadcrumbs";
import { useLocation } from "react-router-dom";

export default function BreadCrumbs() {
  const location = useLocation();
  const breadcrumbs = useGetBreadcrumbs(location.pathname);

  console.log(breadcrumbs, location.pathname);
  return Row({
    gap: 2,
    children: breadcrumbs?.map((breadcrumb, index, arr) =>
      Container({
        child: Row({
          alignItems: "center",
          gap: 2,
          children: [
            Text(breadcrumb.title, {
              fontWeight: "bold",
              color:
                index < arr.length - 1
                  ? "theme.primary"
                  : "theme.textSecondary",
            }),
            index < arr.length - 1
              ? Icon("chevron_right", {
                  color:
                    index < arr.length - 2
                      ? "theme.primary"
                      : "theme.textSecondary",
                })
              : null,
          ],
        }),
      }),
    ),
  });
}
