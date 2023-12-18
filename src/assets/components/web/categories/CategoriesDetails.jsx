import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
export default function CategoriesDetails() {
  //لحتى اجيب العنوان من الرابط
  const { categoryId } = useParams()
  //اجيب البيانات من الباك اند
  const getCategoriesDetails = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
    return data.products

  }
  const { data, isLoading } = useQuery('category-details', getCategoriesDetails);
  if (isLoading) {
    return <p>Loading....</p>
  }
  return (

    <div className="products d-flex justify-content-center">
      {data.length ? data.map((product) =>
        <div className="product col-md-3 ">
          <img src={product.mainImage.secure_url} className='img-fluid w-50' />
          <h2>{product.name}</h2>
          <Link to={`/products/${product._id}`}>details</Link>
        </div>

      ) : <h2>no product</h2>}
    </div>
  )
}
