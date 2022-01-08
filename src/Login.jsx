import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function Add_User() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    let temp = 0;
    await fetch("http://127.0.0.1:8000/login/", requestOptions)
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          response.json();
        } else throw new Error("Error in username/password");

        // alert("wrong password/username")
      })
      .then((data) => {
        console.log(data);
        cookies.set("jwt", data.access, { path: "/" });
        navigate("/");
      })

      .catch((err) => {
        alert(err);
        setUsername("");
        setPassword("");
      });
  }

  return (
    <div>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <br />
      <br />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        placeholder="Password"
      />
      <br />
      <br />
      <button type="submit" onClick={Add_User}>
        {" "}
        Login
      </button>
      <br />
      <br />
      <a href="http://localhost:3000/signup">
        <button>Sign up</button>
      </a>
    </div>
  );
};
export default Login;
