import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DatePicker } from 'antd';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import {CirclePicker} from 'react-color'

// const initialState=


const FormGroup = ({handleCancel}) => {

  const [initialState,seInitialState]=useState({
    Titile:'',
    Location:'',
    Date:'',
    Type:'Personal',
    Description:'',
  })
  const MyDatePicker = DatePicker.generatePicker(momentGenerateConfig);





  const onFinish = (values) => {
    console.log('Success:', values);
  
    
    // seInitialState({
    //   Titile:'',
    //   Location:'',
    //   Date:'',
    //   Type:'Personal',
    //   Description:'',
    // })
    // handleCancel()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  const options = [
    {
      value: 'Personal',
      label: 'Personal',
    },
    {
      value: 'Work',
      label: 'Work',
    },
    {
      value: 'ToAssignSomeone',
      label: 'ToAssignSomeone',
    },
  ];



 





  return<>
  
  <Form
  
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={initialState}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    
  >
    <Form.Item
      label="Color"
      name="Color"
      
      rules={[
        {
          required: true,
          message: 'Color',
        },
      ]}
      >
      <CirclePicker />
    </Form.Item>
    <Form.Item
      label="Title"
      name="Title"
      
      rules={[
        {
          required: true,
          message: 'Title',
        },
      ]}
      >
      <Input />
    </Form.Item>

    <Form.Item
      label="Location"
      name="Location"
      rules={[
        {
          required: true,
          message: 'Location',
        },
      ]}
      >
      <Input />
    </Form.Item>

    <Form.Item
      label="Description"
      name="Description"
      rules={[
        {
          required: true,
          message: 'Description',
        },
      ]}
      >
       <TextArea rows={4}  />
    </Form.Item>

    <Form.Item
      label="Date"
      name="Date"
      rules={[
        {
          required: true,
          message: 'Date',
        },
      ]}
      >

      <MyDatePicker />
      </Form.Item>


    <Form.Item
      name="Type"
      label="Type"
      >
      <Space.Compact>
      <Select defaultValue={options[0]} options={options} />
    </Space.Compact>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
      >
      <Button type="primary" className='w-100' htmlType="submit" >
        Submit
      </Button>
    </Form.Item>
  </Form>
        </>
}
export default FormGroup;





