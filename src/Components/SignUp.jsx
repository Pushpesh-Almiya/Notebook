import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";

function Login() {
  const context = useContext(noteContext);
  const {showAlert}= context;
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("green",`Welcome ${data.name}`)
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
            <h2 className="text-4xl text-center  font-signature my-4">
              Sign Up
            </h2>
            <form onSubmit={handelSubmit}>
              <div className="input-box">
                <span className="mx-4">
                  <i className="fa-solid fa-user"></i>
                </span>
                <label>Name</label>
                <input
                  className="p-2 my-1 outline-none w-full rounded-lg"
                  value={data.name}
                  onChange={onchange}
                  type="text"
                  name="name"
                  required
                />
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
                <label>Password</label>
                <input
                  className="p-2 my-1 outline-none w-full rounded-lg"
                  value={data.password}
                  onChange={onchange}
                  type="password"
                  name="password"
                  required
                />
                <span className="mx-4">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <label>Confirm password</label>
                <input
                  className="p-2 my-1 outline-none w-full rounded-lg"
                  value={data.cpassword}
                  onChange={onchange}
                  type="password"
                  name="cpassword"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="mx-4 my-4 text-center text-white hover:scale-110 duration-300 border-white p-2 rounded-lg bg-green-500"
                >
                  Sign Up
                </button>
              </div>
              <div className="mb-5">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className=" text-blue-800 mx-5 my-5">
                    Login
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
