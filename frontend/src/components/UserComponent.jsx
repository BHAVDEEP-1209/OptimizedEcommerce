import React from 'react'
import { useSelector } from 'react-redux'
import adminPic from "../assets/business.png"

const UserComponent = (props) => {

  const user = useSelector(state=>state.currentUser);
  const role = user?.role;
  let img = "";
  {
    if(props.state?.user?.image.at(0)=="h"){
        img = props.state?.user?.image
    }else{
      img = `http://localhost:5000/images/${props.state?.user?.image}`
    }
  }
  // const img = props.state?.user?.image ? props.state?.user?.image :

    const handleClick=()=>{    
        props.st?.setCurrentId(props.state.id);
        props.st?.setClick(prev=>{return !prev});   
    }

    const handleNothing = ()=>{}

    return (
    <div onClick={role=="admin" ? handleClick : handleNothing} className='userComponent'>
        {
          role=="admin" ? 
          <>
          <img src={img} alt=""  />
          <h1>{props.state?.user?.name}</h1>
          </> : 
          <>
          <img src={adminPic} alt="" />
          <h1 className='adminLogo'>ZARA</h1>
          </>
        }
    </div>
  )
}

export default UserComponent