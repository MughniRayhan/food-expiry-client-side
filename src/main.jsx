import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Layouts/Root.jsx';
import Home from './Pages/Home.jsx';
import Fridge from './Pages/Fridge.jsx';
import Login from './Components/auth/Login.jsx';
import Register from './Components/auth/Register.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import AddFood from './Pages/AddFood.jsx';
import MyItems from './Pages/MyItems.jsx';

const router = createBrowserRouter([
  {
    path: "/",
   Component: Root,
   errorElement: <ErrorPage/>,
   children: [
    {
      index: true,
      Component: Home
    },
    {
      path: '/fridge',
      Component: Fridge
    },
    {
       path: '/addfood',
       Component: AddFood
    },
    {
      path: '/myitems',
      Component: MyItems
    },
    {
      path: '/login',
      Component: Login
    },
    {
      path: '/register',
      Component: Register
    }
   ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
