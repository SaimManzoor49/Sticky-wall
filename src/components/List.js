import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddTodoModal from "./shared/AddTodoModal";
import { useAuth } from "../context/AuthContext";
import NotesCard from "./shared/NotesCard";
export default function List() {
  const { userData } = useAuth();

 

  return (
    <>
      <div className="d-flex gap-4 flex-wrap">
        <AddTodoModal>
          <div
            className="bg-light d-flex justify-content-center align-items-center"
            style={{ height: "250px", width: "250px" }}
          >
            <AiOutlinePlus size={"40px"} />
          </div>
        </AddTodoModal>

      <NotesCard dataToShow={userData} />
      </div>
    </>
  );
}
