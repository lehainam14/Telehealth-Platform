import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { CreateRecordPage } from "./pages/CreateRecordPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FunctionsPage } from "./pages/FunctionsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "appointments", Component: AppointmentsPage },
      { path: "create-record", Component: CreateRecordPage },
      { path: "notifications", Component: NotificationsPage },
      { path: "profile", Component: ProfilePage },
      { path: "functions", Component: FunctionsPage },
    ],
  },
]);
