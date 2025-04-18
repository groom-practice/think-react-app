import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./Dashboard";
import Stats from "./Dashboard/Stats";
import Settings from "./Dashboard/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // main
      { path: "about", element: <About /> }, // /about
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "stats", element: <Stats /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "stats", element: <Stats /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
