import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";

function Navbar() {
  const  context = useContext(noteContext)
  const {userName} =context;
  const [toggle, setToggle] = useState(false);
  
  const navigate = useNavigate();
  const logoutBtn = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    
    <>
      <div
        className={`flex justify-${
          !localStorage.getItem("token") ? "center" : "between"
        } items-center w-full h-20 bg-blue-900 text-white`}>
        <h1 className={`text-5xl ml-2 font-signature`}>Notebook</h1>
        {localStorage.getItem("token") && (
          <div className="hidden md:flex justify-between items-center">
            <ul className="flex ">
              <li className="px-4 text-xl cursor-pointer capitalize hover:scale-110 duration-300">
                <Link to="/">Home</Link>
              </li>
              <li className="px-4 text-xl cursor-pointer capitalize hover:scale-110 duration-300">
                <Link to="/about">About</Link>
              </li>
              <p className="capitalize hover:scale-110 duration-300 px-3"><i className="fa-solid fa-user px-2"></i>{userName}</p>
            </ul>
            <button
              type="submit"
              onClick={logoutBtn}
              className="mx-4  text-white hover:scale-110 duration-300 border-white p-2 rounded-lg bg-green-500"
            >
              Logout <i className="fa-solid fa-right-to-bracket"></i>
            </button>
          </div>
        )}
        <div
          onClick={() => setToggle(!toggle)}
          className={` ${!localStorage.getItem("token") ? "hidden": "cursor-pointer md:hidden pe-4 z-10 text-white"}`}
        >
          {toggle ? (
            <i className="fa-solid fa-xmark text-4xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-4xl"></i>
          )}
        </div>
        
        {toggle && (
          <ul className={` ${!localStorage.getItem("token") ? "hidden": "flex flex-col justify-center items-center absolute top-0 right-0 w-40 h-screen backdrop-blur-lg border-r-2 border-white md:hidden"}`}>
            <li className="py-4 cursor-pointer capitalize font-medium z-10 text-black hover:scale-110 duration-200 text-2xl">
                <Link to="/">Home</Link>
              </li>
              <li className="py-4 cursor-pointer capitalize font-medium z-10 text-black hover:scale-110 duration-200 text-2xl">
                <Link to="/about">About</Link>
              </li>
              
          <button
          type="submit"
          onClick={logoutBtn}
          className="mx-4  text-white hover:scale-110 duration-300 border-white p-2 rounded-lg bg-green-500"
        >
          Logout <i className="fa-solid fa-right-to-bracket"></i>
        </button>
          </ul>
        )}
      </div>
    </>
  );
}

export default Navbar;
