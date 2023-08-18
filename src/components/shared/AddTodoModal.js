import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormGroup from './FormGroup';
const AddTodoModal = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title="Todo Form" open={isModalOpen} onCancel={handleCancel} centered
      footer={[]}
      >
        
        <FormGroup handleCancel={handleCancel} />

    

      </Modal>


        <div className="" onClick={showModal} >
            {children}

        </div>
    </>
  );
};
export default AddTodoModal;