import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Typography,Button,Input,Container,ButtonGroup} from '@mui/material';

const Signup = () => {
  const navigate = useNavigate()
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

      await fetch("https://auth-todo-b.herokuapp.com/login/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
      setUsername("");
      setEmail("");
      setPassword("");
      setC_Password("");
      navigate("/login")
    }
    else{
      alert("Passwords do not match")
    }
  }

  return (
    <Container variant="div">
      <Typography variant="h3" gutterBottom> Sign Up Page </Typography>
      <Input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <br />
      <Input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
      />
      <br />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <br />
      <Input
        onChange={(e) => setC_Password(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <br />
      <br />
      <ButtonGroup variant="contained">
        <Button type="submit" onClick={Add_User}>Sign Up</Button>
        <Button href="https://authtodo.netlify.app/login">Login</Button>
      </ButtonGroup>
    </Container>
  );
};
export default Signup;
