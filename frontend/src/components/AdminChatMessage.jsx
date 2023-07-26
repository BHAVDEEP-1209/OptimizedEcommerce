import React from 'react'

const AdminChatMessage = (props) => {
  return (
    <div className="adminDiv">
        <div className='adminChat'>  <span>{props.state.content}</span></div>
    </div>
  )
}

export default AdminChatMessage