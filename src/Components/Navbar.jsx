import React, { useState } from "react";
import {Link} from "react-router-dom";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const links = [
    {
      id: 1,
      link: "home",
      path:"/"
    },
    {
      id: 2,
      link: "about",
      path:"/about"
    },{
      id: 3,
      link: "Contact",
      path:"/contact"
    },
    {
      id: 4,
      link: "Services",
      path:"/services"
    },
  ];
  return (
    <>
      <div className=" flex justify-between items-center w-full h-20 bg-blue-900 text-white">
        <h1 className="text-5xl ml-2 font-signature">Notebook</h1>
        <ul className=" hidden md:flex">
          {links.map(({ id, link,path}) => (
            <li
              key={id}
              className="px-4 text-xl cursor-pointer capitalize hover:scale-110 duration-300"
            >
              <Link to={path}>{link}</Link>
            </li>
          ))}
        </ul>
        <div
          onClick={() => setToggle(!toggle)}
          className="cursor-pointer md:hidden pe-4 z-10 text-white"
        >
          {toggle ? <i className="fa-solid fa-xmark text-4xl"></i> : <i className="fa-solid fa-bars text-4xl"></i>}
        </div>
        {toggle && (
        <ul className="flex flex-col justify-center items-center absolute top-0 right-0 w-40 h-screen backdrop-blur-lg border-r-2 border-white md:hidden">
          {links.map(({ id, link,path }) => (
            <li
              key={id}
              className="py-4 cursor-pointer capitalize font-medium z-10 text-black hover:scale-110 duration-200 text-2xl"
            >
              <Link to={path} onClick={()=>setToggle(!toggle)}>{link}</Link>
            </li>
          ))}
        </ul>
      )}
      </div>
    </>
  );
}

export default Navbar;
