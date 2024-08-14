import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/LogInPage";
import { AppProvider } from "./AppContext";
import Signup from "./Pages/SignUpPage";
import Homepage from "./Pages/Homepage";
import Reportproblem from "./components/Reportproblem";
import Settings from "./components/Settings";
import ProfilePage from "./Pages/ProiflePage";
import Notifications from "./Pages/Notifications";
import SearchPage from "./Pages/SearchPage";
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
