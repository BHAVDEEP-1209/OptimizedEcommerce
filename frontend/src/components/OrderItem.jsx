import React, { useEffect, useState } from 'react'
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Select, Space } from 'antd';
import { deleteCartItem, reduceProductOrder, updateOrderStatus } from '../utils/utils';
import { Button, notification } from 'antd';
import { useSelector } from 'react-redux';
import Loader from "../components/Loader"


const OrderItem = (props) => {
  const product = props.state.product;
  const user = useSelector(state=>state.currentUser);
  const baseImgUrl = `http://localhost:5000/images/`
  const image = baseImgUrl + `${product.images[0]}`
  const time = props.state.createdAt;
  const date = new Date(time).getDate() + 7;
  const Month = new Date(time).getMonth();
  const Year = new Date(time).getFullYear();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const currDate = new Date().getDate();
  const orderDate = new Date(time).getDate();
  const orderPrice = product?.price * props.state?.quantity;

  const discountPrice = props?.state?.discount;

  const [loading,setLoading] = useState(false);

    ////////////////////notification
    const [api, contextHolder] = notification.useNotification();
    let msg = useState("");
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: msg,    
      });
    };
    //////////////////////////


  ///////////////////modal function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //////////////// modal ending

  const handleChange = async (value) => {
    try {
      const res = await updateOrderStatus(props.state._id, { orderStatus: value });

      msg = "Order status Updated!"
      openNotificationWithIcon('success')

      if(value=="delivered"){
        props?.st.setClick(prev=>{
          return !prev;
        })
      }
    } catch (error) {
      console.log(error);
    }

    // console.log("fireToRain",value);
  };


  const handleView = () => {
    const id = product._id;
    navigate(`/productDetail/${id}`);
  }

  var locClass;
  const status = props.state.orderStatus;
  // const status = "delivered"

  if (status == "stock") {
    locClass = "location";
  } else if (status == "dispatch") {
    locClass = "location2";
  }
  else if (status == "way") {
    locClass = "location3";
  } else {
    locClass = "location4";
  }


  const handleCancelClick=async()=>{
    setLoading(true);

    try {
      
      const del = await deleteCartItem(props.state.id);

      props?.st.setClick(prev=>{
        return !prev;
      })
      const result2 = await reduceProductOrder({id : product._id});

      msg = "Order Cancelled!"
      openNotificationWithIcon('success')

      setLoading(false);
      
    } catch (error) {

      setLoading(false);
      console.log(error);
    }
  
  }

  console.log(props.state.orderStatus);

  return (
    <>
    {contextHolder}
      <div className="cartItem">
        <div className="left">
          <img src={image} alt="" />
        </div>
        <div className="right">
          {/* //contentt */}
          <div className="header">
            <div className="leftInfo">
              <h1>{product?.name}</h1>
              <span>Quanitity: {props?.state?.quantity}</span>
              <span>Order Price: { discountPrice!=0 ? discountPrice : orderPrice }</span>
            </div>
            <span>ID <span className='orderId'>#{props.state._id}</span></span>
          </div>
          <div className="seller">
            <span>Seller: <span className='span2'>{(product?.uploadedByName).toUpperCase()}</span></span>
          </div>
          <div className="main main2">
            <span>Description: {product?.description}</span>
            <div className="buttons">
              {
                location == "/profile/orders" ? <div className='orderStatus'>
                  <Space wrap className='pos'>
                    <Select
                      defaultValue={props.state.orderStatus}
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: 'stock',
                          label: 'Stock',
                        },
                        {
                          value: 'dispatch',
                          label: 'Dispatch',
                        },
                        {
                          value: 'way',
                          label: 'On Way',
                        },
                        {
                          value: 'delivered',
                          label: 'Delivered',
                        },
                      ]}
                    />
                  </Space>

                </div>
                  :
                  <>
                    {
                      location != "/profile/history" && <>
                        <button className='view' onClick={handleView}><VisibilityIcon className='icon'/>view</button>
                        <button className='view view3' onClick={showModal}><GpsFixedIcon className='icon'/>track order</button>
                      </>
                    }
                  </>
              }
              
             {/* {
              location!="/profile/history" &&  <>
              {
                user?.role=="customer" ?
                 <>
                {
                (((currDate - orderDate) <=1) && props.state.orderStatus!="stock") && <button className='view view2' onClick={handleCancelClick}>Caaaancel</button>
              }
                </> :
                <>
                  <button className='view view2' onClick={handleCancelClick}>Cancel</button>
                </>
              }
              
              </>
             } */}

             {
              location=="/profile/orders" && <>
              {
                loading ? <Loader/> : <button className='view view2' onClick={handleCancelClick}>Cancel</button>
              }
              </>
             }

             {
              location=="/profile/allOrders" && <>
                    <Space wrap >
                    <Select
                      defaultValue={props.state.orderStatus}
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: 'stock',
                          label: 'Stock',
                        },
                        {
                          value: 'dispatch',
                          label: 'Dispatch',
                        },
                        {
                          value: 'way',
                          label: 'On Way',
                        },
                        {
                          value: 'delivered',
                          label: 'Delivered',
                        },
                      ]}
                    />
                  </Space>
              <button className='view view2' onClick={handleCancelClick} style={{width : "80px"}}>Cancel</button>
              </>
             }

             {
              location=="/orders" && <>
              
              {
                ((currDate - orderDate) <=1 && props.state.orderStatus=="stock") &&  <>
                {
                  loading ? <Loader /> : <button className='view view2' onClick={handleCancelClick}>Cancel</button>
                }
                </>
              }


              </>
             }

            </div>
          </div>
          <div className="footer2">
            {
              location != "/profile/orders" && <>
                {
                  props.state.orderStatus == "delivered" ?
                    <span className='delivery'>Delivered!</span>
                    :
                    <span className='delivery'><AirplanemodeActiveIcon />estimated delivery time {date}-{Month}-{Year}</span>
                }
              </>
            }
            <span className='ship'>Ship to: <span style={{ color: "red" }}>{props.state.purchasedBy}</span></span>
          </div>
        </div>
      </div>

      <Modal title="Track Your Order" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]} width={800}>
        <div className="track">
          <div className="trackHeader">
            <span className='title'>Order<span style={{ color: "blue" }} className='id'>#{props.state._id}</span></span>
            {
              (props.state.orderStatus=="delivered") ?  <span className='delivery'>Delivered!</span>
              :
              <span className='delivery'><AirplanemodeActiveIcon />estimated delivery time {date}-{Month}-{Year}</span>
            }
            

          </div>
          <div className="trackMain">
            <div className="currentLocation">
              <LocationOnIcon className={`${locClass}`} />
              <span className='desc'>Order Status: {props.state.orderStatus}</span>
            </div>
          </div>
          <div className="trackFooter">
            <img src="https://i.imgur.com/9nnc9Et.png" alt="" className='trackIcon' />
            <img src="https://i.imgur.com/u1AzR7w.png" alt="" className='trackIcon' />
            <img src="https://i.imgur.com/TkPm63y.png" alt="" className='trackIcon' />
            <img src="https://i.imgur.com/HdsziHP.png" alt="" className='trackIcon' />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default OrderItem