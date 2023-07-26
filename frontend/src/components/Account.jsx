import React, { useState } from 'react'
import "../Styles/Store.scss"
import { useDispatch, useSelector } from 'react-redux'
import UserForm from './UserForm';
import axios from 'axios';
import { setValue } from '../slices/userSlice';
import BusinessForm from './BusinessForm';
import Loader from "../components/Loader"
import { Button, notification, Space } from 'antd';
import PasswordForm from './PasswordForm';

const Account = () => {
  const user = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const baseImgUrl = `http://localhost:5000/images/`
  const address = user?.address;
  const email = user?.email ? user.email : "***User***";
  let msg = "";
  const ch = email.at(0);
  {
    (ch >= '0' && ch <= '9') ? msg = "Phone Number" : msg = "Email"
  }
  const name = user?.name ? user.name : "**Bhavdeep kaushal**";
  const number = user?.number ? user.name : "**+91 1234567890**";
  const image = user?.image ? `http://localhost:5000/images/${user?.image}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const business = useSelector(state => state.business);

  const [imageLoading, setImageLoading] = useState(false);

  ////////////////////notification
  const [api, contextHolder] = notification.useNotification();
  let ms = useState("");
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: ms,
    });
  };
  //////////////////////////


  const handleProfilePic = (e) => {
    setImageLoading(true);
    const file = e.target.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append("image", file);
    formData.append("id", user.id);
    formData.append("pic", "profile");
    axios({
      method: "post",
      url: `http://localhost:5000/auth/updateImage`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        ms = "image updated"
        openNotificationWithIcon('success')

        setImageLoading(false);
        dispatch(setValue(response.data));
      })
      .catch(function (response) {
        //handle error

        setImageLoading(false);
        console.log(response);
      });

  }

  return (
    <div className='store'>
      {contextHolder}
      <div className="heading">
        {
          imageLoading ? <Loader /> : <label htmlFor="pic"><img src={image} alt="" style={{ objectFit: "Cover" }} /></label>
        }
        <input type="file" name="image" id="pic" style={{ display: "none" }} onChange={handleProfilePic} />
        <h1>Account</h1>
      </div>

      {<div className="personal" style={{ marginBottom: "30px" }}>
        <div className="header">
          <h3>My Details</h3>
          <h3 className='edit' onClick={() => setClick(!click)}>Edit</h3>
        </div>
        <div className="details">
          <span>{msg}</span>
          <h4>{email}</h4>
          <span>Name</span>
          <h4>{name}</h4>
          <span>Address</span>
          <h4 className='address'>Street:<span>{address?.street}</span></h4>
          <h4 className='address'>City: <span>{address?.city}</span></h4>
          <h4 className='address'>State: <span>{address?.state}</span></h4>
          <h4 className='address'>PinCode: <span>{address?.pin}</span></h4>
        </div>
      </div>}
      {
        click && <UserForm state={{ click, setClick }} />
      }

      <PasswordForm />

      {
        user?.role == "vendor" && <>
          {<div className="personal">
            <div className="header">
              <h3>Business Details</h3>
              <h3 className='edit' onClick={() => setClick2(!click2)}>Edit</h3>
            </div>
            <div className="details">
              <span>Brand Name</span>
              <h4>{business?.name}</h4>
              <span>Brand Description</span>
              <h4>{business?.desc}</h4>
            </div>
          </div>}
        </>
      }

      {
        click2 && <BusinessForm state={{ click2, setClick2 }} />
      }












    </div>
  )
}

export default Account