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
import PrivateRoute from './Providers/PrivateRoute.jsx';
import Loader from './Components/Loader.jsx';
import FoodDetails from './Components/FoodDetails.jsx';
import UpdateFood from './Components/UpdateFood.jsx';
import WastedFood from './Pages/WastedFood.jsx';

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
      loader: () => fetch('https://food-expiry-server-side.vercel.app/foods'),
      hydrateFallbackElement: <Loader/>,
      Component: Fridge
    },
    {
       path: '/addfood',
       element: <PrivateRoute><AddFood/></PrivateRoute>
    },
    {
      path: '/myitems',
      loader: () => fetch('https://food-expiry-server-side.vercel.app/foods'),
      hydrateFallbackElement: <Loader/>,
      element: <PrivateRoute><MyItems/></PrivateRoute>  
    },
     {
       path: '/fridge/:id',
       loader: ({params}) => fetch(`https://food-expiry-server-side.vercel.app/foods/${params.id}`),
       hydrateFallbackElement: <Loader/>,
       element: <PrivateRoute><FoodDetails/></PrivateRoute>
    },
     {
       path: '/update/:id',
       loader: ({params}) => fetch(`https://food-expiry-server-side.vercel.app/foods/${params.id}`),
       hydrateFallbackElement: <Loader/>,
       element: <PrivateRoute><UpdateFood/></PrivateRoute>
    },
    {
      path: '/wasted-food',
      Component: WastedFood
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
