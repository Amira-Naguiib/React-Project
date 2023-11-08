import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContent } from './../../context/cartContent';
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
export default function Cart() {

  const [cartDetails,setCartDetails]= useState({})



  let {getCart, deleteProductFromCart,updateProductQuantity,setNumOfCartItems}= useContext(CartContent)

 async function removeItem(id){
 let {data} =  await deleteProductFromCart (id)
 setNumOfCartItems(data.numOfCartItems)

 setCartDetails(data)
  }

  async function updateCount(id,count){
    let {data} =  await updateProductQuantity (id,count)
    setCartDetails(data)
     }
   
  



 async function getCartDetails (){
let {data} = await getCart()
setNumOfCartItems(data.numOfCartItems)
setCartDetails(data)
  }


  useEffect(()=>{
    getCartDetails()
  },[])
  return (
    <>
    {cartDetails?.data ? <div className="container my-5">
        <div className="mx-auto bg-main-light p-5">
         <h1 className='mb-3'>Cart Shop</h1>
         <div className="d-flex justify-content-between align-content-center ">
          <h3 className='h5'>Total Prics : <span className='text-main'>{cartDetails.data.totalCartPrice} EGP</span></h3>
          <h3 className='h5'>Total Cart Items : <span className='text-main'>{cartDetails.numOfCartItems}</span></h3>
         </div>
         {cartDetails.data.products.map((ele)=>  <div key={ele.product._id} className="row py-2 border-bottom">
          <div className="col-md-1">
            <img src={ele.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-11">
            <div className="d-flex justify-content-between">
              <div className="left-side">
                <h4>{ele.product.title}</h4>
                <p>{ele.price} EGP</p>
              </div>
              <div className="right-side">
                <button className='btn btn-danger' onClick={()=>updateCount(ele.product._id,ele.count-1)}>-</button>
                <span className='mx-3'>{ele.count}</span>
                <button className='btn btn-primary' onClick={()=>updateCount(ele.product._id,ele.count+1)}>+</button>
              </div>
            </div>
            <button onClick={()=>removeItem(ele.product._id)} className='btn text-danger p-0'><i className='fa fa-trash-can pe-2'></i>Remove</button>
          </div>
         </div>
         )}
    <Link className='btn bg-main w-100 mt-5 text-white' to={'/checkout'}> Check Out</Link>

        
        </div>
      </div> : <Circles
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass="justify-content-center"
                      visible={true}/>}
      
    </>
  )
}
