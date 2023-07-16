import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";

function NoteItems(props) {
  const context = useContext(noteContext)
  const {deleteNote}=context
  const { note,updateNote } = props;
  return (
    <>
      <div className="hover:scale-95 duration-200 ">
        <div className=" flex flex-col justify-center rounded-lg items-center my-3 p-8 mx-5 bg-sky-200 shadow-lg">
          <p className="font-bold text-xl">{note.title}</p>
          <p className="">{note.description}</p>
          <p className="">{note.tag}</p>
          <div className=" mt-5">
            <button className="mx-5 cursor-pointer text-blue-500">
              <i className="fa-solid fa-pen-to-square font-bold text-xl hover:scale-110 duration-200" onClick={()=>{updateNote(note)}} ></i>
            </button>
            <button className="mx-5 cursor-pointer text-red-500">
              <i className="fa-solid fa-trash font-bold text-xl hover:scale-110 duration-200" onClick={()=>{deleteNote(note._id)}}></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItems;
