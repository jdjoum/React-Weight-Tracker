// import './App.css'

// RRD Imports
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Components
import AddWeightForm, { addWeightFormLoader } from './components/AddWeightForm'

// Routes
import Error from "./pages/Error";
import Dashboard, { dashboardLoader } from './pages/Dashboard';

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "/add",
        element: <AddWeightForm />,
        loader: addWeightFormLoader,
        // loader: dashboardLoader,
        errorElement: <Error />
      },
      {
        path: "/about",
        element: <h1>About</h1>,
        loader: addWeightFormLoader,
        // loader: dashboardLoader,
        errorElement: <Error />
      },
    ]
  },
]);

function App() {

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
