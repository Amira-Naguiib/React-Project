import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'
export default function Login() {
  const [isLoading,setIsLoading]=useState(false)
  const [apiError,setApiError]=useState("")
  let {setToken} = useContext(tokenContext)

  let navigate = useNavigate()


 async function login (values){
  setApiError("")

  setIsLoading(true)
    console.log("hello from submit", values)
  let {data}=  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((err)=>{
    setIsLoading(false)
  setApiError(err.response.data.message)
  })
  if(data.message == "success"){
    setIsLoading(false)
    localStorage.setItem("userToken",data.token)
    setToken(data.token)
    navigate("/")
  }

  }
let validationSchema = Yup.object ({
  email:Yup.string().email("email not valid").required("email is required"),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"password not valid").required("password is required"),
})



  let formik = useFormik({
     initialValues:{
      email:'',
      password:''
     },
     validationSchema: validationSchema,
     onSubmit:(values)=> login(values)
  })


  return (
    <>
     <div className="container my-5">
      <h2>Login Now :</h2>
      {apiError? <div className="alert alert-danger text-center">{  apiError } </div> :""}
    <form className="mx-auto w-75" onSubmit={formik.handleSubmit}>
   
    <div className="form-group mb-2">
      <label htmlFor="email" className='mb-2'>E-mail</label>
      <input type="email" id="email" className='form-control' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> :"" }

    </div>
    <div className="form-group mb-2">
      <label htmlFor="password" className='mb-2'>Password</label>
      <input type="password" id="password" className='form-control' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> :"" }

    </div>
   
   

    {isLoading?    <button className='btn bg-main ms-auto d-block'> <i className='fa fa-spin fa-spinner'></i></button> : <button className='btn bg-main ms-auto d-block' disabled={!(formik.isValid && formik.dirty)}> Login </button>}
   
    </form>
     </div>
    </>
  )
}
