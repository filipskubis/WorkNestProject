import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout.tsx";
import Login from "@/components/auth/Login.tsx";
import Register from "@/components/auth/Register.tsx";
import Alerts from "@/components/alerts/Alerts.tsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/" }],
  },
]);

function App() {
  return (
    <>
      <Alerts />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
