import React from 'react'

export default function NotesCard({dataToShow}) {
  return (
    <>

    {dataToShow.map((d,i)=>{
        const milliseconds = d.Date.seconds * 1000 + d.Date.nanoseconds / 1000000; 
        let date = new Date(milliseconds);
        date = date.toString().slice(0,15);
        return(
            <div className="bg-ligh d-flex flex-column justify-content-arou   pt-4 position-relative " style={{height:'250px', width:'250px',background:`${d.Color.hex}40` }}  key={i} >
      <div className="bg-light position-absolute top-1 w-100  text-center shadow-sm"><span className='fw-bold'>{d.Type}</span></div>
      <div className="px-3">
      <h5>{ d.Title.length>18? <> {d.Title.slice(0,18)}...</>:<>{d.Title}</>}</h5>
        <p className="mb-0">{ d.Description.length>50? <> {d.Description.slice(0,190)}...</>:<>{d.Title}</>}</p>
      </div>
      <div className="d-flex justify-content-between mt-auto mb-2 px-1">
      <small>{d.Location}</small>
      <small className='fw-bold' >{date}</small>
      </div>
</div>
  )
})}
</>
  )
}
