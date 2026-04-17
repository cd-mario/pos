import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Pos from './pages/Pos.jsx'
import Forecasting from './pages/Forecasting.jsx'
import Analytics from './pages/Analytics.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Inventory from './pages/Inventory.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "pos",
        element: <Pos />,
      },
      {
        path: "forecasting",
        element: <Forecasting />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
