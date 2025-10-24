import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer} from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Layouts/Root.jsx';
import Forbidden from './Pages/Forbidden.jsx';
import Home from './Pages/Home/Home.jsx';
import Fridge from './Pages/Fridge.jsx';
import AddFood from './Pages/AddFood.jsx';
import MyItems from './Pages/MyItems.jsx';
import FoodDetails from './Pages/FoodDetails.jsx';
import UpdateFood from './Pages/UpdateFood.jsx';
import WastedFood from './Pages/WastedFood.jsx';
import Login from './Pages/auth/Login.jsx';
import Register from './Pages/auth/Register.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import Loader from './Components/Loader.jsx';
import PrivateRoute from './Providers/PrivateRoute.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import DashboardLayout from './Layouts/DashboardLayout.jsx';
import AdminRoute from './Routes/AdminRoute.jsx';
import AllUsers from './Pages/Dashboard/AllUsers/AllUsers.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome.jsx';
import MyProfile from './Pages/Dashboard/MyProfile/MyProfile';
import NearlyExpiryItems from './Pages/Dashboard/NearlyExpiry/NearlyExpiryItems';

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
    },
    {
        path: '/forbidden',
        Component: Forbidden
      }
   ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>, 
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'myprofile',
        Component: MyProfile
      },
      {
        path: 'nearly-expiry-items',
        Component: NearlyExpiryItems
      }
    ]
  }
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
