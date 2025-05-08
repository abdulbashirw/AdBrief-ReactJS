import NotFound from "../pages/NotFound";
import EditorLayout from "../layouts/EditorLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Sample from "../layouts/Sample";
import Login from "../pages/Login";
import AdBriefLayout from "@/layouts/AdBriefLayout";
import ContentUserManagement from "@/pages/user-manegement/ContentUserManagement";
import ContentDasboard from "@/pages/dashboard/ContentDashboard";
import ContentDasboardChat from "@/pages/dashboard-chat/ContentDashboardChat";
import ContentAdBrief from "@/pages/adBrief/ContentAdBrief";
import ContentLangganan from "@/pages/adBrief/ContentLangganan";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sample" element={<Sample />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* <Route path="/" element={<TestAdbrif />}></Route> */}
        <Route path="/" element={<AdBriefLayout />}>
          {/* <Route index element={<Welcome />} /> */}
          <Route index element={<ContentAdBrief />} />
          <Route path="/langganan" element={<ContentLangganan />} />
          <Route path="/dashboard" element={<ContentDasboard />} />
          <Route path="/dashboard-chat" element={<ContentDasboardChat />} />
          <Route path="/user-management" element={<ContentUserManagement />} />
        </Route>
        <Route path="/editor" element={<EditorLayout />}></Route>
        <Route path="/main" element={<MainLayout />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
