import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase';

const AuthContext =  createContext()

export default function AuthContextProvider({children}) {
const [user,setUser] = useState({})


useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          setUser(user)
          // ...
        } else {
          // User is signed out
          // ...
          setUser({})
        }
      });

      console.log(user)

},[])



    return (
    <AuthContext.Provider value={{user,setUser}}>
    {children}
    </AuthContext.Provider>
  )
}


export const useAuth =() => {
    return useContext(AuthContext)
}
