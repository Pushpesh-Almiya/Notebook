import React, { useState, useContext } from "react";
import Notes from "./Notes";
import noteContext from "../Context/Notes/noteContext";
function Home() {
  const context = useContext(noteContext);
  const { addNote, showAlert } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onchange = (e) => {
    // e.preventDefault()
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };
  const submitNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("green", "Your note has been added")
  };
  return (
    <div className=" w-full flex flex-col justify-center">
      <div className="w-full h-4/6 md:w-3/4 md:h-3/4 bg-yellow-400 border-2 border-white mx-auto my-2">
          <h1 className="text-center text-2xl font-signature md:text-4xl">
            Notebook -{" "}
            <span className=" text-3xl">Your notes on the cloud</span>{" "}
          </h1>
          <form action="" onSubmit={submitNote} className="flex flex-col justify-center items-center">
            <input
              className=" p-2 my-1 rounded-lg w-3/4 outline-none"
              value={note.title}
              type="text"
              name="title"
              id="title"
              placeholder="Enter your Title"
              onChange={onchange}
              minLength={3}
              required
            />
            <input
              className=" p-2 my-1 rounded-lg w-3/4 outline-none"
              value={note.tag}
              type="text"
              name="tag"
              placeholder={"Enter your Tag"}
              onChange={onchange}
              minLength={3}
              required
            />
            <textarea
              className=" p-2 my-1 rounded-lg w-3/4 outline-none "
              value={note.description}
              rows="3"
              name="description"
              onChange={onchange}
              minLength={3}
              required
              placeholder="Enter your Discription"
            ></textarea>
          <div className="flex justify-center items-center">
            <button disabled={note.title.length < 3||note.title.length < 3}
              type="submit"
              className={`my-4 border-2 rounded-full p-3 border-white   ${note.title.length<3 || note.description.length < 3?"bg-blue-200": "text-white hover:scale-110 duration-300 bg-gradient-to-r from-blue-900 to-cyan-500"}`}
              
              
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
