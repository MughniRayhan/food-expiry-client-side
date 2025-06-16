import React, { Suspense, use } from 'react'
import { AuthContext } from '../Providers/AuthProvider';
import MyFoodList from '../Components/MyFoodList';
import Loader from '../Components/Loader';
import { myFoodsPromise } from '../api/MyFoodApi';

function MyItems() {
 
  const {user} = use(AuthContext);


  
  return (
    <div >
     <Suspense fallback={<Loader/>}>
      <MyFoodList myFoodsPromise={myFoodsPromise(user.email)}/> 
     </Suspense>
</div>
  )
}

export default MyItems