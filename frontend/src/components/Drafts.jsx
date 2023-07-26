import React, { useEffect, useState } from 'react'
import "../Styles/Store.scss"
import Item from "./Item"
import { getAdminProducts, getVendorProducts } from '../utils/utils';
import { useSelector } from 'react-redux';
import StoreItem from './StoreItem';
import { Empty } from 'antd';

const Drafts = () => {
  const [products,setProducts] = useState([]);
  const user = useSelector(state=>state?.currentUser);
  const [change,setChange] = useState(true);

  useEffect(()=>{
    const getData = async()=>{
      try {
        if(user.role=="vendor"){
          const result = await getVendorProducts({email : user?.email , savedAs : "draft"});
          setProducts(result.data);
        }else{
          const result = await getAdminProducts({savedAs : "draft"});
          setProducts(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[change])
  return (
    <div className='store'>
        <h1>Drafts</h1>
        <div className="items">
           {  
              products?.map((ele,ind)=>{
                return <StoreItem state={ele} key={ind} st={{change,setChange}}/>
              })
           }
            {
        !products.length && <Empty />
      }
        </div>
    </div>
  )
}

export default Drafts