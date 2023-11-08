import React from 'react'
import styles from './MainSlider.module.css'
import Slider from 'react-slick';
import mainImg1 from '../../assets/images/mainSlider/1681511121316.png'
import mainImg2 from '../../assets/images/mainSlider/1681511156008.png'
import mainImg3 from '../../assets/images/mainSlider/1681511179514.png'


import blog1 from '../../assets/images/1681511818071.jpeg'
import blog2 from '../../assets/images/1681511865180.jpeg'

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };


  return (
    <>
      
      <div className="container my-5">
        <div className="row gx-0">
          <div className="col-md-9">
          <Slider {...settings}>
          <img  height={400} src={mainImg1} alt="" className='w-100'/>
          <img height={400}  src={mainImg2} alt="" className='w-100'/>
          <img  height={400} src={mainImg3} alt="" className='w-100'/>

          </Slider>
          </div>
          <div className="col-md-3">
            <img  height={200} src={blog1} alt="" className='w-100'/>
            <img  height={200} src={blog2} alt="" className='w-100'/>
          </div>
        </div>
      </div>
     
    
   
    </>
  )
}
