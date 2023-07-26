import React from 'react'
import logo from "../assets/logo.svg"
import "../Styles/Navbar.scss"
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {Link} from "react-router-dom"
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navContainer">
      <div className='nav'>
        <div className="img">
        <img src={logo} alt="" onClick={()=>navigate("/homepage")}/>
        </div>
        <div className="icons">

        <div className="navItem" onClick={()=>navigate("/chat")}>
          <span style={{width: "150px"}}>CUSTOMER CARE</span>
        <SupportAgentIcon className='icon'/>
        </div>

        <div className="navItem" onClick={()=>navigate("/profile")}>
          <span>PROFILE</span>
        <PersonIcon className='icon'/>
        </div>

        <div className="navItem" onClick={()=>navigate("/orders")}>
          <span>MY ORDERS</span>
          <LocalShippingIcon className='icon'/>
        </div>

        <div className="navItem" onClick={()=>navigate("/cart")}>
          <span>CART</span>
        <LocalMallIcon className='icon'/>
        </div>
                
        </div>

    </div>

    <div className="categories">
      <div>
      <Link to="/watches">WATCHES</Link>
      <Link to="/fashion">FASHION</Link>
      <Link to="/jewelry">JEWELRY</Link>
      <Link to="/skincare">SKINCARE</Link>
      <Link to="/makeup">MAKEUP</Link>
      </div>
    </div>
    </div>
  )
}

export default Navbar