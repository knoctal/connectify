import Login from "./pages/LogInPage";
import Signup from "./pages/SignUpPage";
import Homepage from "./pages/Homepage";
import { AppProvider } from "./AppContext";
import SearchPage from "./pages/SearchPage";
import Settings from "./components/Settings";
import ProfilePage from "./pages/ProfilePage";
import ThreadForm from "./components/ThreadForm";
import FeedPage from "./pages/FeedPage";
import Notifications from "./pages/Notifications";
import Reportproblem from "./components/Reportproblem";
import UserSession from "./components/UserSession";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <UserSession />,
  },
  {
    path: "/home",
    element: <Homepage />,
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
  {
    path: "/feed/:postId",
    element: <FeedPage />,
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
