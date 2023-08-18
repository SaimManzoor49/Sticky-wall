import React from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import AddTodoModal from './shared/AddTodoModal'
export default function List() {

  const handleTodo = () => {
    console.log('clicked')
  }

  return (
    <>
    <div className="d-flex gap-2 flex-wrap">
      <AddTodoModal>
    <div className="bg-light d-flex justify-content-center align-items-center" style={{height:'250px', width:'250px'}} onClick={handleTodo} ><AiOutlinePlus size={'40px'} /></div>
      </AddTodoModal>

    </div>
    </>
  )
}
