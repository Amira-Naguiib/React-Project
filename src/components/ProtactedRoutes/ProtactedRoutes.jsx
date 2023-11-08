import React from 'react'
import styles from './ProtactedRoutes.module.css'
import { Navigate } from 'react-router-dom';
export default function ProtactedRoutes(props) {

if (localStorage.getItem("userToken")){
  return props.children
}else{
  return <Navigate to={'/login'} />
}

 
}
