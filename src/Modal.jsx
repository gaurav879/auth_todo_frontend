import React,{useState} from "react";

let Modal = (props) =>{
    const [edited_task,set]  =useState(props.__task.task)
let Edit_task = async () =>{
    // console.log(props.flag)
    const requestOptions = {
        method: "PUT",
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