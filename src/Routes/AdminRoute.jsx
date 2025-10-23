import React from 'react'
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader';
import UseAuth from '../Hooks/UseAuth';
import useUserRole from '../Hooks/useUserRole';

function AdminRoute({children}) {
     const {user,loading} = UseAuth();
     const {role,roleLoading} = useUserRole();
     const location = useLocation()

     if(loading || roleLoading){
        return <Loader></Loader>
     }

     if(!user || role !== "admin"){
    return <Navigate state={location.pathname}  to='/forbidden'></Navigate>
}
return children;
}

export default AdminRoute