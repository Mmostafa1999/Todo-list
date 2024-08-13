import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Erroe404 from "./pages/erroe404";
import Profile from "./pages/Profile";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signup from "./pages/Signup";
import EditTask from "./pages/EditTask/EditTask";
import Signin from "./pages/signin/Singin";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Erroe404 />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/edit-task/:stringId",
    element: <EditTask />,
  },

  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
