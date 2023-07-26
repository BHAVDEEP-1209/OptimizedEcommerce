import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminId, getMessages, getUsers, sendMessage } from "../utils/utils";
import { setAdminId } from "../slices/userSlice";
import { Empty } from "antd";
import UserComponent from "../components/UserComponent";
import Message from "../components/Message";
import Navbar from "../components/Navbar"
import customerCare from "../assets/customerCare.png"
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const ChatPage = () => {
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.currentUser);
  const id = useSelector((state) => state.adminId);
  const img = user?.image ? user?.image : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  const dispatch = useDispatch();
  const [click,setClick] = useState(false);
  const [messages,setMessages] = useState([]);
  const [users,setUsers] = useState([]);
  const [currentId,setCurrentId] = useState("");
  const [admininfo ,setAdminInfo] = useState("");


  useEffect(()=>{
    const get = async()=>{
        try {
          const adminId = await getAdminId();
          setCurrentId(adminId.data._id+user?.id);
          setAdminInfo(adminId.data);
        } catch (error) {
            console.log(error);
        }
    }
   
    // for admin 
    const get2 =async()=>{
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

  if(user?.role=="admin"){
    get2();
  }else{
    get();
  }

  },[click])


  return (
   <>
   <Navbar />
   <div className="chat">
        <div className="left">
            <div className="chatHeader">
            <h1>CUSTOMER CARE!</h1>
            <img src={customerCare} alt="" />
            </div>
        {
            user?.role=="admin" ? <>
            {
            users?.map((ele)=>{
                return <UserComponent state={ele} st={{setCurrentId , setClick}}/>
            })
        }
            </>
            :
            <>
                <UserComponent />
                <div className="slogan">
                    <div className="sloganDiv" style={{width: "80%",height: "100%"}}>
                    <SupportAgentIcon className="sloganIcon"/>
                    <h1 className="sloganText" style={{fontSize: "25px",lineHeight: "3rem"}}>Customer Satisfaction is worthless. Customer loyalty is priceless.</h1>
                    </div>
                </div>
            </>
        }

       
        </div>
        <div className="right">
            {
                (currentId=="" && user?.role=="admin") && 
                <div className="slogan">
                    <div className="sloganDiv">
                    <h1 className="sloganText">Customer Satisfaction is worthless.Customer loyalty is priceless.</h1>
                    </div>
                </div>
            }
            {
                currentId!="" && <Message state={currentId}/>
            }
        </div>
    </div>
   </>
  );
};

export default ChatPage;
















{/* <div className="messages">
            {
                !messages.length && <Empty />
            }
            {
                messages?.map((ele)=>{
                    return <h1>{ele.content}</h1>
                    
                })
            }
        </div>
        <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClick}>send Message</button>
         */}
