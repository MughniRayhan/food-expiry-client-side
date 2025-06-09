import React, { use } from 'react'
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader';

function PrivateRoute({children}) {
    const {user,loading} = use(AuthContext);
    const location = useLocation()
    if(loading){
        return <Loader></Loader>
    }
if(user && user?.email){
    return children;
}
return <Navigate state={location.pathname}  to='/login'></Navigate>
}

export default PrivateRoute