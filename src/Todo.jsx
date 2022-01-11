import React, { useState, useEffect } from "react";
import List from "./List";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

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
    await fetch("http://127.0.0.1:8000", requestOptions)
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
    await fetch("http://127.0.0.1:8000", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    task_list();

  }
  let obj ={
    "refresh":task_list,
    "_data":arr
 }
  
  return (
    <div>
      <input
        type="text"
        placeholder="Add your Task..."
        value={new_todo}
        onChange={(e) => {
          todoSet(e.target.value);
        }}
      />

      <button
        type="submit"
        onClick={() => {
          if (new_todo) Add_task(new_todo);
        }}
      >
        Add Task
      </button>
      <br />
      <br />
      {arr.map((x) => (
        <List  key={x.id} __task={x} obj={obj}/>
      ))
    }
      
        <button onClick={()=>{logout()}}>Logout</button>
        
    </div>
  );
};

export default Todo;
