import React, { useState } from "react";
import {  Modal } from "antd";
import FormGroup from "./FormGroup";
const AddTodoModal = ({ children , noteToUpdate}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };


console.log(noteToUpdate)

  return (
    <>
      <Modal
        title="Todo Form"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={[]}
      >
        <FormGroup handleCancel={handleCancel} noteToUpdate={noteToUpdate} dateInSeconds={noteToUpdate?.Date?.seconds}  />
        {/* <FormGroup handleCancel={handleCancel} noteToUpdate={noteToUpdate}   /> */}
      </Modal>

      <div className="" onClick={showModal}>
        {children}
      </div>
    </>
  );
};
export default AddTodoModal;
