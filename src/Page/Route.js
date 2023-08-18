import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
export default function Index() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/*' element={<Frontend/>} />
        <Route path='/auth/*' element={<Auth/>} />
    </Routes>
    
    
    </BrowserRouter>
  )
}
