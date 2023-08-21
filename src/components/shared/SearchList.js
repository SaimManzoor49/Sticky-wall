import React from 'react'
import { useAuth } from '../../context/AuthContext'
import NotesCard from './NotesCard'

export default function SearchList({searchString}) {

    const {userData} = useAuth()


    const filteredNotes = userData.filter((n)=>{

        return n.Title.toLowerCase().includes(searchString.toLowerCase())  || (n.Title+" ").toLowerCase().includes(searchString.toLowerCase())  
    })


    console.log(filteredNotes)


  return (
    <>
        <div className="d-flex gap-4 flex-wrap">
          
          {!filteredNotes.length?<h5>Not Found :|</h5>:
            <NotesCard dataToShow={filteredNotes} />
          }
        </div>
    </>
  )
}
