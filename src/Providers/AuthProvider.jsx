import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,  signOut, signInWithPopup,signInWithEmailAndPassword, onAuthStateChanged, updateProfile  } from "firebase/auth";
import { useEffect } from 'react';
export const AuthContext = createContext()

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
function AuthProvider({children}) {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const createUser = (email,password) =>{
      setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
      setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signinWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

    const logOut = () =>{
        return signOut(auth);
    };

    const updateUser = (updatedData) =>{
        return updateProfile(auth.currentUser , updatedData);
    }

    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
           setUser(currentUser);
           setLoading(false);
          });
         return ()=>{
             unSubscribe();
         } 
    },[])

    const authData = {
        user,
        setUser,
        createUser,
        signinWithGoogle,
        signIn,
        logOut,
        updateUser,
       
        loading,
        setLoading
    }
 
  return <AuthContext value={authData}>
    {children}
  </AuthContext>
}

export default AuthProvider