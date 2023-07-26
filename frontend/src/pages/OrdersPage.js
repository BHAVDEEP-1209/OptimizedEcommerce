import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getOrders } from '../utils/utils';
import OrderItem from '../components/OrderItem';
import Navbar from "../components/Navbar"
import "../Styles/OrderPage.scss"
import { Empty } from 'antd';

const OrdersPage = () => {
  const user = useSelector(state=>state.currentUser);
  const [orders,setOrders] = useState([]);
  const [click,setClick] = useState(false);

  useEffect(()=>{
    const get=async()=>{
      try {
        const result = await getOrders(user.id);
        setOrders(result.data);
      } catch (error) {
        
      }
    }
    get();
  },[click])

  console.log(click);
  return (
    <>
    <Navbar />
    <div className='order'>
      <h1 className='heading'>Orders</h1>
     <div className="orderItems">
     {
        orders?.map((ele,ind)=>{
          return <OrderItem state={ele} key={ind} st={{click,setClick}}/>
        })
      }
      {
        !orders.length && <Empty />
      }
     </div>
    </div>
    </>
  )
}

export default OrdersPage