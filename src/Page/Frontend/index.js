import React, { useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Home from './Home'
import { useAuth } from '../../context/AuthContext'
import ViewNote from './ViewNote'

export default function Index() {

  const {user} = useAuth()

const navigator = useNavigate()

  useEffect(()=>{

    if(!user.email){

      navigator('/auth/login')

    }
      

  },[user])

  return (
    <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/viewnote/:id'} element={<ViewNote />} />
    </Routes>
  )
}
