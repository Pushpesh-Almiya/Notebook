import React, { useState, useContext } from "react";
import Notes from "./Notes";
import noteContext from "../Context/Notes/noteContext";
function Home() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onchange = (e) => {
    // e.preventDefault()
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };
  const submitNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  return (
    <div className=" w-full flex flex-col justify-center">
      <div className="w-full h-4/6 md:w-3/4 md:h-3/4 bg-yellow-600 border-2 border-white mx-auto my-5">
        <form action="">
          <h1 className="text-center text-2xl font-signature md:text-4xl">
            Notebook -{" "}
            <span className=" text-3xl">Your notes on the cloud</span>{" "}
          </h1>
          <form action="" className="flex flex-col justify-center items-center">
            <input
              className=" p-2 my-1 rounded-lg w-3/4"
              type="text"
              name="title"
              id="title"
              placeholder="Enter your Title"
              onChange={onchange} minLength={3} required
            />
            <input
              className=" p-2 my-1 rounded-lg w-3/4"
              type="text"
              name="tag"
              placeholder={"Enter your Tag"}
              onChange={onchange} minLength={3} required
            />
            <textarea
              className=" p-2 my-1 rounded-lg w-3/4 "
              rows="3"
              name="description"
              onChange={onchange} minLength={3} required
              placeholder="Enter your Discription"
            ></textarea>
          </form>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="my-4 border-2 text-white hover:scale-110 duration-300 border-white p-3 rounded-full bg-gradient-to-r from-blue-900 to-cyan-500"
              onClick={submitNote} disabled={note.title.length<3}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-4xl  font-signature mx-10">Your-Notes</h1>
        <Notes />
      </div>
    </div>
  );
}

export default Home;
