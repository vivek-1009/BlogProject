import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.js'
import { logout } from '../../store/authSlice.js'
export default function LogoutBtn() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    authService.logout()
      .then(() => {
        dispatch(logout())
      })
  }

  return (
   <button onClick={handleLogout}>Logout</button>
  )
}
