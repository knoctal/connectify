import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
// import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
// import { AppProvider } from "./AppContext";
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
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
