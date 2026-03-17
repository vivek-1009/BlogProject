import React from 'react'
import {Container,LogoutBtn} from '../index.js'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
function Header() {
  const authStatus=useSelector((state)=>state.auth.status)
  const navigate=useNavigate()
  const navItems=[{
name:'Home',
slug:"/",
active:true
  },{
name:"Login",
slug:"/login",
active:'!authStatus'
  },{
    name:"Signup",
    slug:"/signup",
    active:'!authStatus'

  },{
    name:"All Posts",
    slug:"/all-posts",
    active:authStatus
  },{
    name:"Add Post",
    slug:"/add-post",
    active:authStatus
  }]
  return (
    <header>
<Container>
  <nav>
   <ul className='flex ml-auto'>
{navItems.map((item)=>
item.active ? (<li key={item.name}>
  <button onClick={()=>navigate(item.slug)} className='px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
    {item.name}
  </button>
</li>) : null

)}
{authStatus && (
  <li>
    <LogoutBtn/>
  </li>
)}
   </ul>
  </nav>
</Container>
    </header>
  )
}

export default Header
