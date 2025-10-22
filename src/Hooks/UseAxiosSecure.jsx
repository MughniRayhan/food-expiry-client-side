import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import UseAuth from './UseAuth';

    const   axiosSecure = axios.create({
        baseURL: 'https://food-expiry-server-side.vercel.app' 
    })

function UseAxiosSecure() {
  const {user,logOut} = UseAuth();
  const navigate = useNavigate();
 
 useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.accessToken; 
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          logOut()
            .then(() => {
              navigate('/login');
            })
            .catch(() => {});
        }
        return Promise.reject(error);
      }
    );

    // Eject interceptors on cleanup to prevent duplication
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);


  return axiosSecure;
}

export default UseAxiosSecure