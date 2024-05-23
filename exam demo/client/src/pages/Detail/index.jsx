import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetOneProductQuery } from '../../service/productApi';
import Button from '@mui/material/Button';

const Detail = () => {
  const {id}=useParams();
  const{data:product}=useGetOneProductQuery(id);
  const navigate=useNavigate();
  return (
    <div>
      {product && (
           <div style={{width:"40%",padding:"100px 0",margin:"30px auto"}}>
           <div className="card">
             <img src={product?.data.img} alt="" />
             <h3>{product?.data.title}</h3>
             <p>{product?.data.bio}</p>
             <Button variant="contained" onClick={()=>navigate(-1)}>Go Back</Button>
           </div>
       </div>
      )}
   
    </div>
  )
}

export default Detail