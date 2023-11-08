import React, { useContext, useEffect, useState } from 'react'
import styles from './FeatureProduct.module.css'
import axios from 'axios'
import { Circles } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import { CartContent } from '../../context/cartContent'
import toast, { Toaster } from 'react-hot-toast';




export default function FeatureProduct() {
let {addToCart,setNumOfCartItems} = useContext(CartContent)


 function getProduct(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/products")
 }


 let{data, isLoading } =useQuery("featuredProducts",getProduct)

 async function addCart(id){ 
  let res = await addToCart(id);
 if (res.data.status == "success"){
  toast.success('Product Added Successfully.')  
  setNumOfCartItems(res.data.numOfCartItems)
        
 }else {
  toast('Product NOT Added.')          
 }
 }
  return (
    <>
      <div className="container py-5">
        <h2>Featured Products</h2><br/>
        {isLoading ? <Circles
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass="justify-content-center"
                      visible={true}/> : <div className="row">
          {data?.data?.data.map((ele)=><div key={ele.id} className="col-md-2">
            <div className="product px-2 py-3">
             <Link to={'details/' + ele.id}>
             <img src={ele.imageCover} className="w-100" alt="" />
              <p className='text-main'>{ele.category?.name}</p>
              <h3 className='h6'>{ele.title.split(" ").splice(0,3).join(" ")}</h3>
             <div className="d-flex justify-content-between">
              <p>
                {ele.price} EGP
              </p>
             <p>
                <i className='fa fa-star rating-color'></i>
                {ele.ratingsAverage}
              </p>
              </div>
             </Link>
            
              <button onClick={()=> addCart(ele.id)} className='btn bg-main text-white w-100'>Add to cart </button>
            </div>
          </div>)}
          
        </div>}
        
      </div>
    </>
  )
}
