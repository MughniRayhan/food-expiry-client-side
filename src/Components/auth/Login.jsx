import React, { useState } from 'react'
import { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function Login() {
const {signinWithGoogle,user,setUser, signIn,updateUser} = use(AuthContext);
  const location = useLocation();
 const [success,setSuccess] = useState(false);
   const [errorMsg,setErrorMsg] = useState('');
  const navigate = useNavigate();
   const handleLogin = (e) =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    
     setSuccess(false);
    setErrorMsg('');

    signIn(email,password)
    .then((result) => {
      // Sign in
      const user = result.user;
      updateUser({displayName:user.name,  photoURL: user.photoURL })
      .then(()=>{
        setUser({...user,displayName:user.name,  photoURL: user.photoURL});
      })
      .catch((error)=>{
        setErrorMsg(error.message);
        
        setUser(user);
      })
      setSuccess(true);
      Swal.fire({
        title: "Successfully Logged In!",
        icon: "success",
        draggable: true
      });
      navigate(`${location.state? location.state : '/'}`)
    })
    .catch((error) => {
      const errorMessage = error.message;
      setErrorMsg(errorMessage);
      
    });
  
  }

   const handleSigninWithGoogle = () =>{
      signinWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        setSuccess(true);
        Swal.fire({
    title: "Successfully Logged In!",
    icon: "success",
    draggable: true
  });
        navigate(`${location.state? location.state : '/'}`)
  
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
       
      });
      
    }


  return (
    <div  className=' flex justify-center items-center min-h-screen p-5  bg-base-300'>

    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-6 mt-8">
    <h1 className="sm:text-3xl text-2xl font-bold text-center">Login now!</h1> 
    <form onSubmit={handleLogin} className="card-body">
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input type="email" name='email' className="input" placeholder="Email" />

        <label className="label mt-4">Password</label>
        <input type="password" name='password' className="input" placeholder="Password" />

      

        <button type='submit' className="btn btn-neutral bg-primary border-none mt-4">Login</button>

        <p className='text-center my-2'>OR</p>
        
        <button onClick={handleSigninWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
      </fieldset>

      <p className='text-gray-500 text-sm mt-2'>New to this website? Please <Link to='/register' className='text-blue-500 underline'>Sign Up</Link></p>
    </form>
  
  </div>
   </div>
  )
}

export default Login