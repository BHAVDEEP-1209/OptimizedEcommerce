import React, { useEffect, useRef, useState } from 'react'
import "../Styles/Homepage.scss"
import Navbar from '../components/Navbar'
import Item from '../components/Item'
import plus from "../assets/add.png"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllProducts, updateUser } from '../utils/utils'
import { Empty, Radio } from "antd";
import { updateUserInfo } from "../slices/userSlice";
import vendor from "../assets/vendor.png"
import customer from "../assets/customer.png"
import Loader from "../components/Loader"

const Homepage = () => { 
  const user = useSelector(state=>state.currentUser);
  const navigate = useNavigate();
  const [products,setProducts] = useState([]);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);

  const ref = useRef(null);

  const handleScroll = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(()=>{
    const getVendor=async()=>{
      setLoading(true);
      try {
        const result = (await getAllProducts()).data.products;
        if(user.role=="vendor"){
          const temp2  = result.filter((ele)=>{
            return (ele?.uploadedBy!= user?.email && ele?.savedAs == "product")
          })
          setLoading(false);
          setProducts(temp2);
        }else{
          const temp2  = result.filter((ele)=>{
            return (ele?.savedAs == "product")
          })
          setLoading(false);
          setProducts(temp2);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } 
    getVendor();
  },[])

  const onRoleChange=async(e)=>{
      const data = {
        email : user?.email,  
        role : e.target.value
      }
    dispatch(updateUserInfo({id:user.id,data}));
  }


  return (
    <>
     {user?.role === "role" ? <div className="roleSelector">
        <h1>Select role to proceed further</h1>
        <Radio.Group
          className="radio"
          name="role"
          onChange={onRoleChange}
        >
          <Radio value={"customer"}>Customer</Radio>
          <Radio value={"vendor"}>Vendor</Radio>
          <div className="footer">
            <img src={customer} alt="" />
            <img src={vendor} alt="" />
          </div>
        </Radio.Group>
      </div>
      :
      /// homepage
      <div className='homepage'>
      <Navbar/>
      <div className="videoDiv">
        <video src="https://lv-vod.fl.freecaster.net/vod/louisvuitton/i1mRN67J9G_HD.mp4" autoPlay loop  id="autoplay" muted/>
        <div className="discover" onClick={handleScroll}>
          <span>Discover Collection</span>
        </div>
      </div>
      <div className="trending" ref={ref}>
        <h1 className='heading'>TRENDING</h1>
        <h5 className='desc'>HOTTEST ITEMS</h5>

       {
        loading ? 
        <div className="loaderDiv">
          <Loader />
        </div> : 
        <div className="items">
        {
          products?.map((ele,ind)=>{
            return <Item state={ele} key={ind}/>
          })
        }
        {
          !products.length && <Empty />
        }
        
      </div>
       }
      
      {
        user?.role != "customer" && <img src={plus} alt="" className='plusIcon' onClick={()=>navigate("/addProduct")}/>
      }
      </div>
    </div> 
    
    }
    
    </> 
    
  )
}

export default Homepage