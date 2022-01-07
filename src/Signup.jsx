import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");

  async function Add_User() {
    if (password === c_password) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      };

      await fetch("http://127.0.0.1:8000/login/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
      setUsername("");
      setEmail("");
      setPassword("");
      setC_Password("");
    }
    else{
      alert("Passwords do not match")
    }
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
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
      />
      <br />
      <br />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <br />
      <br />
      <input
        onChange={(e) => setC_Password(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <br />
      <br />
      <button type="submit" onClick={Add_User}>
        {" "}
        Sign Up
      </button>
      <br />
      <br />
      <a href="http://localhost:3000/login">
        <button>Login</button>
      </a>
    </div>
  );
};
export default Signup;
