import React,{useState} from "react";
import Cookies from "universal-cookie";

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
      await fetch("http://127.0.0.1:8000", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      props.flag(false)
      props.refresh()
}
    return(<div>
        <input type="text" value={edited_task} onChange={(e)=>set(e.target.value)}/>
        <button  onClick={()=>{Edit_task(props.__task.key,edited_task)}}>Edit Task</button>
        </div>)
}

export default Modal;