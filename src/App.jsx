import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { AppProvider } from "./AppContext";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Reportproblem from "./components/Reportproblem";
import Settings from "./components/Settings";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import Notifications from "./pages/Notifications";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Homepage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/Report",
    element: <Reportproblem />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
