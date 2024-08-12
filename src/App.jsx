import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { AppProvider } from "./AppContext";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Reportproblem from "./components/Reportproblem";
import Settings from "./components/Settings";
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
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
