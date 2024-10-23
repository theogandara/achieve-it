import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/index.tsx";
import Login from "./pages/login/index.tsx";
import QuitHabits from "./pages/quit-habits/index.tsx";
import SignUp from "./pages/signup/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/quit-habits",
    element: <QuitHabits />,
  },
]);

export const PrivateRoutes = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.navigate("/login");
  }

  return <RouterProvider router={router} />;
};
