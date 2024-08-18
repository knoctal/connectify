import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LogInPage";
import { AppProvider } from "./AppContext";
import Signup from "./pages/SignUpPage";
import Homepage from "./pages/Homepage";
import Reportproblem from "./components/Reportproblem";
import Settings from "./components/Settings";
import Notifications from "./pages/Notifications";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
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
    path: "/Report",
    element: <Reportproblem />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
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
