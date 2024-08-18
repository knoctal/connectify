import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LogInPage";
import { AppProvider } from "./AppContext";
import Signup from "./pages/SignUpPage";
import Homepage from "./pages/Homepage";
import Reportproblem from "./components/Reportproblem";
import Settings from "./components/Settings";
import ProfilePage from "./pages/ProfilePage";
import Notifications from "./pages/Notifications";
import SearchPage from "./pages/SearchPage";
import ThreadForm from "./components/ThreadForm";

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
    path: "/report",
    element: <Reportproblem />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/post",
    element: <ThreadForm />,
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
