import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import NotesCard from "./shared/NotesCard";
import { TbH6 } from "react-icons/tb";

export default function Today() {
  const [todayNotes, setTodayNotes] = useState([]);
  const { userData } = useAuth();
  useEffect(() => {
    const temp = userData.filter((d) => {
      return (
        d.Date.seconds * 1000 -12* 60 * 60 * 1000 <= new Date().getTime() &&
        d.Date.seconds * 1000 + 12*60 * 60 * 1000 >= new Date().getTime()
      );
    });

    setTodayNotes(temp);
  }, [userData]);

  return (
    <>
    <div className="d-flex gap-4 flex-wrap">
    {!todayNotes.length&& <h5>Nothing todo rest buddy ^-^ </h5>}
      <NotesCard dataToShow={todayNotes} />
    </div>
    </>
  );
}
