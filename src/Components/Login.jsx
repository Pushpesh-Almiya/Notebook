import React, { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";

function Login() {
  const context = useContext(noteContext);
  const {showAlert}= context;
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      
      showAlert("blue",`Welcome back ${data.email} at Notebook `)
    } else {
      alert("Invalid credentials");
    }
  };
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-cyan-200 w-3/4 flex flex-col justify-center items-center">
        <div className=" w-5/6 md:w-1/2 h-1/2">
          <div className="w-full">
            <h2 className="text-4xl text-center font-signature my-4">Login</h2>
            <form onSubmit={handelSubmit}>
              <div className="input-box">
                <span className="mx-4">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <label>Email</label>
                <input
                  className="p-2 my-1 outline-none w-full rounded-lg"
                  value={data.email}
                  onChange={onchange}
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="mx-4">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <label>password</label>
                <input
                  className="p-2 my-1 outline-none w-full rounded-lg"
                  value={data.password}
                  onChange={onchange}
                  type="password"
                  name="password"
                  required
                />
              </div>
              <div className="remember-forgot">
                <label>
                  <input className="mx-2" type="checkbox" />
                  Remember me
                </label>
                <a href="#" className=" text-blue-800 ml-5">
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="mx-4 my-4 text-center text-white hover:scale-110 duration-300 border-white p-2 rounded-lg bg-green-500"
                >
                  Login
                </button>
              </div>
              <div className="mb-5">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className=" text-blue-800 mx-5 my-5">
                    Register Now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
