import React, { useEffect, useState } from 'react'
import "../Styles/Checkout.scss"
import UserForm from '../components/UserForm'
import CheckoutForm from '../components/CheckoutForm'
import { useSelector } from 'react-redux'
import { PlaceOrders, getCartItems, updateProductOrders } from '../utils/utils'
import CartItem from '../components/CartItem'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from "../components/Navbar"
import { Button, notification, Space } from 'antd';
import Loader from "../components/Loader"

const Checkout = () => {

  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(200);
  const [cartTotal, setCartTotal] = useState(0);
  const [input, setInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [dis,setDis] = useState(false);

  const user = useSelector(state => state.currentUser);
  const [cartItems, setCartItems] = useState([]);

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

    ////////////////////notification
    const [api, contextHolder] = notification.useNotification();
    let msg = useState("");
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: msg,    
      });
    };
    //////////////////////////

    console.log("cartToal",cartTotal);

  const handleCoupon = (e) => {

    if (total == 0) {
      msg = "Buy Something!"
      openNotificationWithIcon('warning')
      return;
    }

    if (input == "NODEL") {

      setDelivery(0);
      setDiscount(0);
      setCartTotal(total);
      setDis(false);

    } else if (input == "BUMPER") {

      if(delivery==0){
        setDelivery(200);
        
      }

      const tempCartTotal = total+200;
      const d = 0.20 * tempCartTotal;
      setDiscount(Math.round(d));
      setCartTotal(Math.round(tempCartTotal - d));
      setDis(true);

    } else {
      msg = "Invalid Coupon!"
      openNotificationWithIcon('warning')
    }

    setInput("");
  }

  // useEffect(()=>{
  //   const get=async()=>{
  //     try {
  //         const items = await getCartItems(user.id);
  //         setCartItems(items.data);
  //     } catch (error) {
  //         console.log(error);
  //     }
  //   }
  //   get();
  // },[])


  useEffect(() => {
    setTotal(0);
    const get = async () => {
      try {
        const items = await getCartItems(user.id);
        setCartItems(items.data);
        let t = 0;
        {
          items.data?.map((ele) => {

            t = t + (Number(ele.product.price) * Number(ele.quantity));
          })
        }
        console.log(t);
        if (t > 0) {
          setTotal(t);
          let cartTot = t + delivery - discount;
          setCartTotal(cartTot);
        }
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, [])

  const placeOrder = () => {
    setLoading(true);
    const get = async () => {
      try {
        const items = await PlaceOrders(user.id,{isDiscount : dis});
        
        // for  updating no of orders on product
        const temp = await updateProductOrders({items : cartItems});
        
        msg = "Order Placed!"
        openNotificationWithIcon('success')
        
        setLoading(false);

        setTimeout(()=>{
          navigate("/orders")
        },500)
        
      } catch (error) {

        setLoading(false);
        console.log(error);
      }
    }
    if(total==0){
      msg = "Buy Something to Proceed further!"
        openNotificationWithIcon('error')
    }else{
      get();
    }
    
  }


  return (
    <>
    {contextHolder}
      <Navbar />
      <div className='checkout'>
        <div className="ordersContainer">
        <CheckoutForm />
          {
            cartItems?.map((ele, ind) => {
              return <CartItem state={ele} key={ind} st={{dis,setDis}}/>
            })
          }
        </div>

        <div className="orderDetails">
          <div className="total">
            <h2>Order Summary</h2>
            <span>total:{total}</span>
            <span>discount:{discount}</span>
            <span>delivery:{delivery}</span>
          </div>
          <div className="offers">
            <input type="text" name="coupon" placeholder='enter coupon' value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleCoupon}> apply</button>
            <div className="coupons">
              <h1>Offers</h1>
              <div className="coupon">
                <h3>NODEL</h3>
                <span>Free shipping on products for exclusive customers!</span>
              </div>
              <div className="coupon">
                <h3>BUMPER</h3>
                <span>20% bumper discount on products!</span>
              </div>
            </div>
          </div>
          <h1 className='cartTotal'>Order total: {cartTotal}</h1>
          {
            loading ? <Loader /> : <button onClick={placeOrder} className='button2'>Place Your Order</button>
          }
        </div>
      </div>
    </>
  )
}

export default Checkout