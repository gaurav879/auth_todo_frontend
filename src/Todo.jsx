import React, { useState, useEffect } from "react";
import List from "./List";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import {Typography,Button,Input,Container,ButtonGroup} from '@mui/material';

const Todo = () => {
  const navigate = useNavigate()
  let cookies= new Cookies()
  const logout = () => {
      console.log("0000")
    cookies.remove("jwt");
    navigate("/");
  }
  const task_list = async () => {
    const requestOptions = {
      method: "GET",
      headers : new Headers({
        "Authorization": `Bearer ${cookies.get("jwt")}`
      })
    };
    console.log(cookies.get("jwt"))
    await fetch("https://auth-todo-b.herokuapp.com", requestOptions)
      .then((response) => response.json())
      .then((data) => setArr(data));
  };
  const [new_todo, todoSet] = useState("");
  const [arr, setArr] = useState([]);
  console.log(arr)
  useEffect(() => {
    task_list();
  }, []);

  async function Add_task(new_todo) {
    todoSet("")
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Authorization" : `Bearer ${cookies.get("jwt")}`
      }),
      body: JSON.stringify({
        task: new_todo,
        status: false,
      }),
    };
    await fetch("https://auth-todo-b.herokuapp.com", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    task_list();

  }
  let obj ={
    "refresh":task_list,
    "_data":arr
 }
  
  return (
    <Container variant="div">
      <Typography variant="h4"> Your ToDo List</Typography>
      <Input
        type="text"
        placeholder="Add your Task..."
        value={new_todo}
        onChange={(e) => {
          todoSet(e.target.value);
        }}
      />
      <ButtonGroup variant="contained">
        <Button
          type="submit"
          onClick={() => {
            if (new_todo) Add_task(new_todo);
          }}
        >
          Add Task
        </Button>
        <Button onClick={()=>{logout()}}>Logout</Button>
      </ButtonGroup>
      
      
      {arr.map((x) => (
        <List  key={x.id} __task={x} obj={obj}/>
      ))
    }
      
        
    </Container>
  );
};

export default Todo;
