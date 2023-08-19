import React from "react";
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
// const initialState=

const initialState ={
  Titile: "",
  Location: "",
  Date: "",
  Type: "Personal",
  Description: "",
};


const FormGroup = ({ handleCancel }) => {

  const { user, setUserData } = useAuth();
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
          // doc.data() is never undefined for query doc snapshots
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
      createdAt: new Date(),
      id: v4(),
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
          <TextArea rows={4} />
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
          <MyDatePicker />
        </Form.Item>

        <Form.Item name="Type" label="Type">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChangeType}
          >
            <option selected value={"Personal"}>
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
          <Button type="primary" className="w-100" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormGroup;
