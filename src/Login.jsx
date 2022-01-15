import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {Typography,Button,ButtonGroup,Input, Container} from '@mui/material';

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
    await fetch("https://auth-todo-b.herokuapp.com/login/", requestOptions)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          console.log("here")
          return response.json()
        } else throw new Error("Error in username/password");

        // alert("wrong password/username")
      })
      .then((data) => {
        console.log(data);
        cookies.set("jwt", data.access, { path: "/" });
        navigate("/todo");
      })

      .catch((err) => {
        alert(err);
        setUsername("");
        setPassword("");
      });
  }

  return (
    <Container variant="div">
      <Typography variant="h3" gutterBottom> Login Page </Typography>
      
      <Input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <br />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <br />
      <br />
      <ButtonGroup variant="contained" >
        <Button type="submit"  onClick={Add_User}>Login</Button>
        <Button href="http://localhost:3000">Sign up</Button>
      </ButtonGroup>
      
    </Container>
  );
};
export default Login;
