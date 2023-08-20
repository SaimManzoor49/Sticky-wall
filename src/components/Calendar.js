import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import NotesCard from "./shared/NotesCard";
import { useAuth } from "../context/AuthContext";

export default function Calendar() {
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState("");
  const { userData } = useAuth();
  useEffect(() => {
    const temp = userData.filter((d) => {
      return (
        d.Date.seconds * 1000 <=new Date(date).getTime() + 12 * 60 * 60 * 1000 
        &&
        d.Date.seconds * 1000 >= new Date(date).getTime() - 12 * 60 * 60 * 1000
      );
    });

    setNotes(temp);
  }, [userData, date]);

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <>
    <div className="my-3">
      <DatePicker style={{width:'100%'}} onChange={onChange} />
    </div>
      <div className="d-flex gap-4 flex-wrap">
      {!date && <h5>Select Date to see Notes Assigned to that Date</h5>} 
      {date && !notes.length&& <h5>Nothing todo rest buddy ^-^ </h5>}

      <NotesCard dataToShow={notes} />
      </div>
    </>
  );
}
