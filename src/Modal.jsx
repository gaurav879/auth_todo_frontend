import React,{useState} from "react";
import Cookies from "universal-cookie";
import {Button,Input,Container} from '@mui/material';

const Modal = (props) =>{
    const [edited_task,set]  =useState(props.__task.task)
let Edit_task = async () =>{
  let cookies = new Cookies()
    // console.log(props.flag)
    const requestOptions = {
        method: "PUT",
        headers: new Headers({
          "Authorization" : `Bearer ${cookies.get("jwt")}`
        }),
        body: JSON.stringify({ 
          "id":props.__task.id,
          "task":edited_task,
          "status":props.__task.status
        }),
      };
      await fetch("https://auth-todo-b.herokuapp.com", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      props.flag(false)
      props.refresh()
}
    return(<Container>
        <Input type="text" value={edited_task} onChange={(e)=>set(e.target.value)}/>
        <Button variant="contained" onClick={()=>{Edit_task(props.__task.key,edited_task)}}>Edit Task</Button>
        </Container>)
}

export default Modal;