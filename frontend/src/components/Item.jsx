import React from 'react'
import "../Styles/Item.scss"
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deleteProduct } from '../utils/utils'

const Item = (props) => {
  const image = `http://localhost:5000/images/${props.state.images[0]}`
  const location = useLocation().pathname;
  const user = useSelector(state=>state?.currentUser);
  const navigate = useNavigate();
 

  // functions

  const handleEdit=()=>{
    const id = props.state._id;
    navigate(`/addProduct/${id}`);
  }

  const handleDelete=async()=>{
    try {
      const id = props.state._id;
      const result = await deleteProduct(id);
      window.alert("deleted!");
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleNothing =()=>{

  }

  const handleClick=()=>{
    const id = props.state._id;
    navigate(`/productDetail/${id}`);
  }

  return (
    <div className='item' onClick={location!="/profile" ? handleClick : handleNothing}>
        <img src={image} alt="" />
        <div className="footer">
            <h4>{props.state.name}</h4>
            <span>&#x20B9; {props.state.price}</span>
        </div>
        {
          user?.role == "vendor" && <>
          {
            props.state.uploadedBy == user?.email && <div className="footer">
            <button onClick={handleEdit}>edit</button>
            <button onClick={handleDelete}>delete</button>
          </div>
          }
          </>
        }
    </div>
  )
}

export default Item