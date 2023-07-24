import React from 'react'
import { useSelector } from 'react-redux'
import "../Styles/ProfileIndex.scss"

const ProfileIndex = () => {
    const user = useSelector(state=>state.currentUser);
  return (
    <div className='index'>
        <h1>Hello!</h1>
        <span>{user?.name}</span>
    </div>
  )
}

export default ProfileIndex