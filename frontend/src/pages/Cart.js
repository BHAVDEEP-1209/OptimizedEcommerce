import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCartItems } from '../utils/utils';
import CartItem from '../components/CartItem';
import { Button, Empty, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import "../Styles/Cart.scss"
import Navbar from "../components/Navbar"
import { notification, Space } from 'antd';

const Cart = () => {
  const user = useSelector(state => state.currentUser);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [newQuan, setNewQuan] = useState(0);
  const [onLoad, setOnLoad] = useState(true);
  const [click, setClick] = useState(false);
  const [id, setId] = useState("");


  ////////////////////notification
  const [api, contextHolder] = notification.useNotification();
  let msg = useState("");
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: msg,
    });
  };
  //////////////////////////

  const handleProceedToBuy = () => {
    if (user?.address == undefined) {
      msg = "Add Address!"
      openNotificationWithIcon('warning');

      setTimeout(() => {
        navigate(`/profile/account`)
      }, 800)

    } else if (!cartItems.length) {
      msg = "Add Items To Cart To Proceed!"
      openNotificationWithIcon('warning');
    } else {
      const address = user?.address
      if (!address.street || !address.city || !address.state || !address.pin) {
        msg = "Add Address!"
        openNotificationWithIcon('warning');

        setTimeout(() => {
          navigate(`/profile/account`)
        }, 800)

      } else {
        navigate(`/checkout`)
      }

    }
  }

  useEffect(() => {

    const get2 = async () => {
      try {
        const items = await getCartItems(user.id);
        setCartItems(items.data);
        let t = 0;
        {
          items.data?.map((ele) => {
            t = t + (Number(ele.product.price) * Number(ele.quantity));
          })
        }
        if (t > 0) {
          setTotal(t);
        }
      } catch (error) {
        console.log(error);
      }

    }
    get2();
  }, [click]);



  return (
    <>
      {contextHolder}
      <Navbar />
      <div className='cartContainer'>
        <h1 className='heading'>Cart</h1>
        <div className="content">
          <div className="cartItems">
            {
              cartItems?.map((ele, ind) => {
                return <CartItem state={ele} key={ind} st={{ newQuan, setNewQuan, click, setClick, setId, setTotal, total }} />
              })
            }

            {
              !cartItems.length && <Empty />
            }
          </div>
          {
            cartItems.length && <div className="cartTotal">

              <button onClick={handleProceedToBuy}>
                Proceed to Buy
              </button>

            </div>
          }
        </div>
      </div>




    </>
  )
}

export default Cart