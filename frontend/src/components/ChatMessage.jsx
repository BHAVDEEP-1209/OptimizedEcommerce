import React, { useEffect, useRef } from 'react'

const ChatMessage = (props) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [props.st])
  return (
    <div className="userChatDiv">
      <div ref={ref} className='userChat'>
        <span>{props.state.content}</span>
      </div>
    </div>
  )
}

export default ChatMessage