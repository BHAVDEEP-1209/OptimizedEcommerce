import React, { useEffect, useState } from 'react'
import { getMessages } from '../utils/utils';
import { message } from 'antd';
import ChatMessage from './ChatMessage';
import Input from './Input';
import AdminChatMessage from './AdminChatMessage';
import { useSelector } from 'react-redux';

const Message = (props) => {

    const [messages,setMessages] = useState([]);
    const [click,setClick] = useState(false);
    const id = props.state;
    const user = useSelector(state=>state.currentUser);
  
    useEffect(()=>{
        const get = async()=>{
            try {
                const res = await getMessages(props.state);
                setMessages(res.data.messages);
            } catch (error) {
                console.log(error);
            }
        }
        get();
    },[click,props.state])

  return (
    <div className='messageContainer'>
        <div className="header">
            {
                messages?.map((ele)=>{
                    return <>
                    {
                        ele.postedBy==user?.name ?  <ChatMessage state={ele} st={click}/> : <AdminChatMessage state={ele}/>
                    }
                    </>
                })
            }
        </div>
        <Input state={id} st={{setClick}}/>
    </div>
  )
}

export default Message