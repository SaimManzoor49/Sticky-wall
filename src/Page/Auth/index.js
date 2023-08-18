import React, { useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import { useAuth } from '../../context/AuthContext'

export default function Index() {

  const {user} = useAuth()

const navigator = useNavigate()

  useEffect(()=>{

    if(user.email){

      navigator('/')

    }
      

  },[user])



  return (
    <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup />} />
    </Routes>
  )
}
