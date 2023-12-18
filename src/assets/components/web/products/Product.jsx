import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/Cart';

export default function Product() {
    const {productId}=useParams();
const {addToCartContext}= useContext(CartContext)
const getProduct = async()=>{
const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
return data.product
}
const addToCart = async(productId)=>{
 const res =await addToCartContext(productId)
return res
  }
  
const{data,isLoading}=useQuery('product',getProduct)
if(isLoading){
  return <h2>Loading ....</h2>
}
  return (
   <div className="container">
    <div className="row">
      <div className="col-md-4">
        {
          data.subImages.map((img,index)=>
          <div>
            <img src={data.mainImage.secure_url} className='img-fluid'/>
          </div>
          )
        }
      </div>
      <div className="col-md-4">
        <h2>{data.name}</h2>
        <p>{data.price}</p>
        <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)} >add ptoduct</button>
      </div>
    </div>
   </div>
  )
  }

 