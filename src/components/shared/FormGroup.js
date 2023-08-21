import React, { useEffect, useState } from "react";
import { Button,  Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DatePicker } from "antd";
import momentGenerateConfig from "rc-picker/lib/generate/moment";
import { CirclePicker } from "react-color";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { v4 } from "uuid";
import dayjs from "dayjs";


const FormGroup = ({ handleCancel,noteToUpdate,dateInSeconds }) => {

  const { user, setUserData } = useAuth();
  const [ initialState, setInitalState ] = useState(
    ()=>{
      if(noteToUpdate){
        console.log(noteToUpdate)
        delete noteToUpdate.Date
        return noteToUpdate
      }else{
        return {
          Title: "",
          Location: "",
          Date: "",
          Type: "Personal",
          Description: "",
        }
      }

    }


  );
  const MyDatePicker = DatePicker.generatePicker(momentGenerateConfig);

  const onFinish = async (values) => {
    const getData = async () => {
      if (user.email) {
        const q = query(
          collection(db, "notes"),
          where("createdBy", "==", user.uid)
        );
        let arr = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        setUserData(arr);
      }
    };

    let dataToStore = {
      Title: values.Title,
      Location: values.Location,
      Date: values.Date._d,
      Type: values.Type,
      Description: values.Description,
      Color: values.Color,
      createdBy: user.uid,
      // createdAt: ()=>{if(noteToUpdate.createdAt){return noteToUpdate.createdAt }else{return new Date()}},
      createdAt: noteToUpdate?.createdAt ?   noteToUpdate?.createdAt:  new Date(),
      // createdAt: noteToUpdate.createdAt ?   noteToUpdate.createdAt:  new Date(),
      updatedAt: new Date(),
      // id: ,
      id: initialState.id ?   initialState.id:  v4(),
    };

    console.log("Success:", dataToStore);

    await setDoc(doc(db, "notes", dataToStore.id), dataToStore)
      .then(() => {
        console.log("Document successfully written!");
        getData();
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeType = (e) => {
    console.log(e.target.value);
  };


  console.log(noteToUpdate)


  /////////////////////////////

  const getDateInFormate = (d)=>{
    d = new Date(d)

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  



  return (
    <>
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
              message: "Color",
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
              message: "Title",
              
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
              message: "Location",
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
              message: "Description",
            },
          ]}
        >
          <TextArea rows={4} maxLength={900} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="Date"
          
          rules={[
            {
              required: true,
              message: "Date",
            },
          ]}
        >
          <MyDatePicker defaultValue={noteToUpdate && dayjs(getDateInFormate(dateInSeconds*1000), 'YYYY-MM-DD')}  />
          
        </Form.Item>

        <Form.Item name="Type" label="Type">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChangeType}
          >
            <option defaultValue={"Personal"} value={"Personal"}>
              Personal
            </option>
            <option value="Work">Work</option>
            <option value="ToAssignSomeone">AssignToSomeone</option>
          </select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" className="w-100" htmlType="submit">{
            noteToUpdate?<>Update</>:<>Submit</>
            
          }
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormGroup;
