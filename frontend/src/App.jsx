import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UploadPage from "./pages/UploadPage";
import NotificationsPage from "./pages/NotificationsPage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout title="Document Upload Dashboard">
            <UploadPage />
          </MainLayout>
        }
      />
      <Route
        path="/notifications"
        element={
          <MainLayout title="Notification Center">
            <NotificationsPage />
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
