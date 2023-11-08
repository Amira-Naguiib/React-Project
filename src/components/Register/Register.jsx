import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {
 
  const [isLoading,setIsLoading]=useState(false)
  const [apiError,setApiError]=useState("")

  let navigate = useNavigate()


 async function register (values){
  setApiError("")

  setIsLoading(true)
    console.log("hello from submit", values)
  let {data}=  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>{
    setIsLoading(false)
  setApiError(err.response.data.message)
  })
  if(data.message == "success"){
    setIsLoading(false)
    navigate("/login")
  }

  }
let validationSchema = Yup.object ({
  name: Yup.string().max(15,"name must less than 15 character").required("name is required"),
  email:Yup.string().email("email not valid").required("email is required"),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"password not valid").required("password is required"),
  rePassword:Yup.string().oneOf([Yup.ref("password")],"repassword should match password").required("password is required"),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"phone not valid").required("phone is required")
})



  let formik = useFormik({
     initialValues:{
      name: '',
      email:'',
      password:'',
      rePassword:'',
      phone:''
     },
     validationSchema: validationSchema,
     onSubmit:(values)=> register(values)
  })


  return (
    <>
     <div className="container my-5">
      <h2>Register Now :</h2>
      {apiError? <div className="alert alert-danger text-center">{  apiError } </div> :""}
    <form className="mx-auto w-75" onSubmit={formik.handleSubmit}>
    <div className="form-group mb-2">
      <label htmlFor="name" className='mb-2'>Name</label>
      <input type="text" id="name" className='form-control' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> :"" }
    </div>
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
    <div className="form-group mb-2">
      <label htmlFor="rePassword" className='mb-2'>RePassword</label>
      <input type="password" id="rePassword" className='form-control' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> :"" }

    </div>
    <div className="form-group mb-2">
      <label htmlFor="phone" className='mb-2'>Phone</label>
      <input type="tel" id="phone" className='form-control' name='' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> :"" }

    </div>

    {isLoading?  <button className='btn bg-main ms-auto d-block'> <i className='fa fa-spin fa-spinner'></i></button> : <button className='btn bg-main ms-auto d-block' disabled={!(formik.isValid && formik.dirty)}> Register</button>}
   
    </form>
     </div>
    </>
  )
}









