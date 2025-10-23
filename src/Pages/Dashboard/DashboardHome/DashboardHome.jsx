import React from 'react'
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import Loader from '../../../Components/Loader';
import useUserRole from '../../../Hooks/useUserRole';
import Forbidden from '../../Forbidden';
function DashboardHome() {
  const {role,roleLoading} = useUserRole();

  if(roleLoading){
    return <Loader/>
  }

  if(role === "user"){
    return <UserDashboard/>
  }

  else if(role === "admin"){
    return <AdminDashboard/>
  }

  else{
    return <Forbidden></Forbidden>
  }
 
}

export default DashboardHome