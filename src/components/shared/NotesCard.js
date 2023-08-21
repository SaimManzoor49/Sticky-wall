import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {LuView} from 'react-icons/lu'
import { db } from "../../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import AddTodoModal from "./AddTodoModal";
import { Link } from "react-router-dom";
import { ImportOutlined } from "@ant-design/icons";

export default function NotesCard({ dataToShow }) {
  const { user, setUserData } = useAuth();

  const handleDelete = async (d) => {
    console.log("clicked");
    await deleteDoc(doc(db, "notes", d.id))
      .then(() => {
        const getNotes = async () => {
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

        getNotes();

        console.log("done deleting");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {dataToShow.map((d, i) => {
        const milliseconds =
          d.Date.seconds * 1000 + d.Date.nanoseconds / 1000000;
        let date = new Date(milliseconds);
        date = date.toString().slice(0, 15);
        return (
          <div
            className="d-flex flex-column  card-hover  pt-4 position-relative "
            style={{
              height: "250px",
              width: "250px",
              background: `${d.Color.hex}40`,
            }}
            key={i}
          >
            <div className="bg-light position-absolute top-1 w-100  text-center shadow-sm">
              <span className="fw-bold">{d.Type}</span>
            </div>
            <div className="px-3">
              <h5>
                {d.Title.length > 18 ? (
                  <> {d.Title.slice(0, 18)}...</>
                ) : (
                  <>{d.Title}</>
                )}
              </h5>
              <p className="mb-0">
                {d.Description.length > 50 ? (
                  <> {d.Description.slice(0, 190)}...</>
                ) : (
                  <>{d.Description}</>
                )}
              </p>
            </div>
            <div className="d-flex justify-content-between mt-auto mb-2 px-1">
              <small>{d.Location}</small>
              <small className="fw-bold">{date}</small>
            </div>

            <div className="text-end py-1 d-flex justify-content-end ">
                <Link to={`/viewnote/${d.id}`}  className="text-success"><LuView size={"20px"} className="text-success ed-buttons" /></Link>
              <AddTodoModal noteToUpdate={d}>
                <AiOutlineEdit
                  size={"20px"}
                  className="text-warning ed-buttons"
                />
              </AddTodoModal>
              <AiOutlineDelete
                size={"20px"}
                className="text-danger mx-1 ed-buttons "
                onClick={() => {
                  handleDelete(d);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
