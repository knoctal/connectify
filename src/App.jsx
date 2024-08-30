import Login from "./pages/LogInPage";
import Signup from "./pages/SignUpPage";
import Homepage from "./pages/Homepage";
import { AppProvider } from "./AppContext";
import SearchPage from "./pages/SearchPage";
import Settings from "./components/Settings";
import ProfilePage from "./pages/ProfilePage";
import ThreadForm from "./components/ThreadForm";
import Notifications from "./pages/Notifications";
import Reportproblem from "./components/Reportproblem";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
