import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import NotesCard from './shared/NotesCard'



export default function Upcoming() {
  const [upcomingNotes,setUpcomingNotes] = useState([])
  const {userData} = useAuth()
useEffect(()=>{


  const temp = userData.filter((d)=>{
    return (d.Date.seconds*1000) > new Date().getTime()
  })

  setUpcomingNotes(temp)

},[userData])


  return (<>
<div className="d-flex gap-4 flex-wrap">

<NotesCard dataToShow={upcomingNotes} />
</div>
</>
  )
}
