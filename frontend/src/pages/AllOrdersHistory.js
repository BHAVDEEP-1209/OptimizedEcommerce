import React, { useEffect, useState } from 'react'
import { getAdminOrdersHistory } from '../utils/utils';
import { useSelector } from 'react-redux';
import OrderItem from '../components/OrderItem';
import Navbar from "../components/Navbar"
import "../Styles/OrderPage.scss"
import { Empty } from 'antd';

const AllOrdersHistory = () => {
  const user = useSelector(state=>state.currentUser);
  const [orders,setOrders] = useState([]);
  const [click,setClick] = useState(false);

  useEffect(()=>{
    const get = async()=>{
      try {
        const res = await getAdminOrdersHistory({email : user?.email , id : user?.id});
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  },[])
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

export default AllOrdersHistory