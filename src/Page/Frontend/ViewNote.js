import React from 'react'
import {useParams} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import stickywall from '../../assets/stickywall.png'
export default function ViewNote() {

    const {id} = useParams()
    const {userData} = useAuth()

    let noteToShow = userData.filter((n)=>(n.id===id))
    noteToShow = noteToShow[0]

    let {Title , Location , Description,Type,createdAt,updatedAt} = noteToShow

    console.log({createdAt,updatedAt})

    const getDateInFormate= (seconds,nanoseconds)=>{

        const milliseconds =
        seconds * 1000 + nanoseconds / 1000000;
       let d = new Date(milliseconds);
      return d.toString().slice(0, 15);
    }

  

  return (
    <div className='position-relative'>
    <img src={stickywall} style={{width:'100vw', height:'100vh'}} alt='stickywall'  />
    <div className='position-absolute sticky-position ' style={{width:'65vw'}}>
        <div className="text-center">

        <h3>{Type}</h3>
        </div>
        <h6 className='fw-bold'>Title:</h6>
        <h3 className='ms-4' >{Title}</h3>
        <h6 className='fw-bold'>Description:</h6>
        <div className="overflow-auto" style={{maxHeight:'20vh'}}>

        <small className='ms-4 d-size ' >{Description}</small>
        </div>
        <div className="mt-2">
            <h6 className='fw-bold'>Location:</h6>
            <h5 className='ms-4' > {Location}</h5>
            </div>
            <div className="d-flex justify-content-end  ">
                <div className="d-flex flex-column justify-content-end ps-0 ps-sm-3 ps-md-5 position-absolute  " style={{width:'20vw',minHeight:'35vh',top:"27vh !important;"}}>

                  <small className='fw-bold'>Date:</small>  
                <p className='mb-0 ms-4 '>{getDateInFormate(noteToShow.Date.seconds,noteToShow.Date.nanoseconds)}</p>
                  <small className='fw-bold d-none d-md-block '>Created At:</small>  
                <p className='mb-0 ms-4  d-none d-md-block '>{getDateInFormate(createdAt.seconds,createdAt.nanoseconds)}</p>
                  <small className='fw-bold d-none d-lg-block '>Updated At:</small>  
                <p className='mb-0 ms-4 d-none d-lg-block '>{getDateInFormate(updatedAt.seconds,updatedAt.nanoseconds)}</p>
                {/* <h6>{updatedAt}</h6> */}
                </div>
        </div>
        </div>
    </div>
  )
}
