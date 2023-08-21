import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth,db} from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const AuthContext =  createContext()

export default  function AuthContextProvider({children}) {
  const [user,setUser] = useState({})
  const [userData,setUserData] = useState([])
  const [appLoading,setAppLoading] = useState(true)
  

useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setUser(user)
          setAppLoading(false)
          // ...
        } else {
          // User is signed out
          // ...
          setUser({})
          setAppLoading(false)
        }
      });



      

},[]) 

useEffect(()=>{

  const getNotes = async ()=>{

  
    if(user.email){
      
    
      const q = query(collection(db, "notes"), where('createdBy', "==", user.uid));
      let arr = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });
      
      setUserData(arr)
    
    }
  
  }
  
  getNotes()




  
},[user])


    return (
    <AuthContext.Provider value={{user,setUser,userData,setUserData,appLoading}}>
    {children}
    </AuthContext.Provider>
  )
}


export const useAuth =() => {
    return useContext(AuthContext)
}
