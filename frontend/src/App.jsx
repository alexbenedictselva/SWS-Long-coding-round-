import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UploadPage from "./pages/UploadPage";
import NotificationsPage from "./pages/NotificationsPage";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/"              element={<UploadPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
