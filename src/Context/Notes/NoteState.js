import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitails =[]
  const [notes, setNotes]= useState(notesInitails)
  const [alert,setAlert]= useState({color:"",message:""})
  const [userName,setUserName]=useState("")
  const host = "http://127.0.0.1:8000"


  //SignUp......


  const signUp =async(name,email,password)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),
    });
    const json = await response.json();
    localStorage.setItem("token", json.authToken);
    setUserName(json.createUser.name)
  }


  //Login..........
  const login =async(email,password)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password}),
    });
    const json = await response.json();
    localStorage.setItem("token", json.authToken);
    setUserName(json.userData.name)
  }


  //Alert.......
  const showAlert=(color, message)=>{
    setAlert({
      color:color,
      message:message
    })
    setTimeout(() => {
      setAlert('')
    }, 2000);
  }

  //Get All notes.....
  const getNotes = async()=>{
    const response = await fetch(`${host}/api/notes/getnotes`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      }
    })
    const json = await response.json()
    setNotes(json)
  }

  //ADD a note......
  const addNote= async(title,description,tag)=>{
    //API call.
    const response = await fetch(`${host}/api/notes/createnote`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //DELETE a note 
  const deleteNote= async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      }
    })
    await response.json();
    const newNotes= notes.filter((note)=>{return note._id !==id}) //If note._id 
    setNotes(newNotes)
  }
  
  //UPDATE a note.....
  const editNote= async(id,title,tag,description)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
    const json = await response.json()
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit note in client..
    for(let index =0;index<newNotes.length; index++){
      const element =newNotes[index];
      if(element._id=== id){
        newNotes[index].title= title;
        newNotes[index].tag= tag;
        newNotes[index].description= description;
        break;
      }
    }
    setNotes(newNotes)
  }
  return(
    <noteContext.Provider value={{notes, setNotes, addNote,deleteNote ,getNotes,editNote,showAlert,alert,signUp,userName,login}}>{props.children}</noteContext.Provider>
    )
  };

  export default NoteState;
