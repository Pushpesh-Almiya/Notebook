import React, { useContext,useEffect,useRef,useState } from "react";
import noteContext from "../Context/Notes/noteContext";
import NoteItems from "./NoteItems";
function Notes() {
  const context = useContext(noteContext);
  const { notes,getNotes,editNote } = context;
  useEffect(()=>{
    getNotes()
    // eslint-disable-next-line
  },[])

  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: "" });
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const ref = useRef(null)
  const updateNote=(currentNote)=>{
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,etag:currentNote.tag,edescription:currentNote.description})
  }

  const modifyNote=(e)=>{
    e.preventDefault()
    editNote(note.id, note.etitle,note.etag, note.edescription)
    closeModal()
  }

  return (
    <>
    <button
        onClick={openModal} ref={ref}
        className="bg-blue-500 hover:bg-blue-600 hidden text-white font-bold py-2 px-4 rounded"
      >
        Open Modal
      </button>
      {isOpen && (
        <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-cyan-300 w-1/2 h-5/6  rounded-lg shadow-md">
            <p className="text-right p-4 text-white" onClick={closeModal}><i className="fa-solid cursor-pointer w-8 text-center rounded-full bg-red-400 hover:bg-red-600 fa-xmark  text-2xl"></i></p>
            <h2 className="text-xl text-center font-bold mb-4">Modal Title</h2>
            <form action="" className="flex flex-col justify-center items-center">
            <input
              className=" p-2 my-1 rounded-lg w-3/4"
              type="text"
              name="etitle"
              id="etitle"
              placeholder="Enter your Title"
              onChange={onchange} value={note.etitle}
            />
            <input
              className=" p-2 my-1 rounded-lg w-3/4"
              type="text"
              name="etag"
              placeholder={"Enter your Tag"}
              onChange={onchange} value={note.etag}
            />
            <textarea
              className=" p-2 my-1 rounded-lg w-3/4 "
              rows="3"
              name="edescription"
              onChange={onchange} value={note.edescription}
              placeholder="Enter your Discription"
            ></textarea>
            <div className="my-4 flex justify-end items-end">
            <button className="my-4 mx-4 text-white hover:scale-110 duration-300 border-white px-3 py-2 rounded-full bg-red-500 hover:bg-red-600" onClick={closeModal}>Close</button>
            <button className="my-4 mx-4 text-white hover:scale-110 duration-300 border-white px-3 py-2 rounded-full bg-green-500 hover:bg-green-600" onClick={modifyNote}>Update Note</button>
            </div>
          </form>
          </div>
        </div>
        </>
      )}

    <div className=" w-full grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 my-5 mx-auto">
      {notes.map((note, index) => {
        return <NoteItems key={index} note={note} updateNote={updateNote}/>;
      })}
      
    </div>
    
    </>
  );
}

export default Notes;
