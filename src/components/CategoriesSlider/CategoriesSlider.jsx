import React from 'react'
import styles from './CategoriesSlider.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
export default function CategoriesSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false

  };


  function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  let {data} = useQuery("allCategories",getCategories)

  return (
    <>
   <Slider {...settings}>
     
     {data?.data?.data.map((ele)=> <>
     
    <img src={ele.image} alt="" className='w-100 p-1' height={300}/>
     <h4>{ele.name}</h4>
   
      
     </>)}
    
    </Slider>
    </>
  )
}
