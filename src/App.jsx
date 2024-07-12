import './App.css'

// RRD Imports
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Components
import AddWeightForm, { addWeightFormLoader } from './components/AddWeightForm'

// Routes
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddWeightForm />,
    loader: addWeightFormLoader,
    // loader: dashboardLoader,
    errorElement: <Error />
  },
]);

function App() {

  return (
    <div className='App'>
      <h1>WeightWise</h1>
      <p>Where you can track your weight over time to help you meet your fitness goals!</p>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
