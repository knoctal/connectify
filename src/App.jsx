import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/LogInPage";
import { AppProvider } from "./AppContext";
import Signup from "./Pages/SinUpPage";
import Homepage from "./Pages/HomePage";
import Reportproblem from "./components/Reportproblem";
import Settings from "./components/Settings";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
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
    path: "/report",
    element: <Reportproblem />,
  },
  {
    path: "/settings",
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
