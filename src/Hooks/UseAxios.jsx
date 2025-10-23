import axios from 'axios'
import React from 'react'

function UseAxios() {
    const axiosInstance = axios.create({
        baseURL: 'https://food-expiry-server-side.vercel.app'
    })
  return axiosInstance;
}

export default UseAxios