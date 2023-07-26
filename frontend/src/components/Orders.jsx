import React, { useEffect, useState } from 'react'
import "../Styles/Store.scss"
import { getAdminOrders, getVendorOrders } from '../utils/utils'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem'
import { Empty } from 'antd'

const Orders = () => {
  const user = useSelector(state=>state.currentUser);
  const [items,setItems] = useState([]);
  const [change,setClick] = useState(false);

  useEffect(()=>{
    const get=async()=>{
      try {
        /// testing for vendor orders
        // if(user.role=="vendor"){
        //   const res = await getVendorOrders({email : user?.email})
        //   setItems(res.data);
        // }else{
        //   const res = await getAdminOrders()
        //   setItems(res.data);
        // }

        const res = await getVendorOrders({email : user?.email})
        setItems(res.data);

      } catch (error) {
        console.log(error);
      }
    }
    get();
  },[change])
  return (
    <div className='order'>
    <h1 className='heading'>Orders</h1>
    <div className="items">
      {
        items?.map((ele,ind)=>{
          return <OrderItem state={ele} key={ind} st={{setClick}}/>
        })
      }
      {
        !items.length && <Empty />
      }
    </div>
  </div>
  )
}

export default Orders