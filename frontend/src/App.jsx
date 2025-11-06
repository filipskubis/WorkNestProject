import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/" }],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
