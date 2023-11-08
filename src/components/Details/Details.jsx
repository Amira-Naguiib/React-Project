import React, { useContext, useEffect, useState } from 'react'
import styles from './Details.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Circles } from 'react-loader-spinner'
import Slider from "react-slick";
import { CartContent } from '../../context/cartContent'
import toast from 'react-hot-toast'
export default function Details() {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };




  const [details,setDetails]=useState({})
  const [isLoading,setIsLoading]=useState(true)
  let {addToCart,setNumOfCartItems} = useContext(CartContent)


  let params= useParams()


 async function getProductDetails(id){
   let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   setDetails(data.data)
   setIsLoading(false)
  }


  async function addCart(id){ 
    let res = await addToCart(id);
   if (res.data.status == "success"){
    toast.success('Product Added Successfully.')  
    setNumOfCartItems(res.data.numOfCartItems)
  }else {
    toast('Product NOT Added.')          
   }
   }



  useEffect(()=>{
    getProductDetails(params.id)

  },[])



  return (
    <>
    <div className="container">
      {isLoading ? <Circles
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass="justify-content-center"
                      visible={true}/> : <div className="row align-items-center">
        <div className="col-md-4">
        <Slider {...settings}>
       {details.images.map((ele,index)=>  <img src={ele} alt="" className='w-100 img-fluid' key={index} />)}

    </Slider>
          
        </div>
        <div className="col-md-8">
          <h2>{details.title} </h2>
          <p>{details.description} </p>
          <p>{details.category.name} </p>
          <div className="d-flex justify-content-between">
              <h5>
              {details.price}  EGP 
              </h5>
             <h5>
                <i className='fa fa-star rating-color'></i>
                {details.ratingsAverage} 
              </h5>
              </div>
              <button onClick={()=> addCart(details.id)} className='btn bg-main text-white w-100'>Add to cart </button>
        </div>
      </div>}
      
    </div>
      
    </>
  )
}
