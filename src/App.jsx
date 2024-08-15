// import './App.css'

// RRD Imports
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Library Imports
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import Error from "./pages/Error";
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Profile, { profileLoader } from "./pages/Profile";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";

const router = createBrowserRouter([
  {
    path: "/react-weight-tracker",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/react-weight-tracker",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ]
  },
]);

function App() {

  return (
    <div className='App'>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
