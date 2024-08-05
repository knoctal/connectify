import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
// import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import { AppProvider } from "./AppContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
