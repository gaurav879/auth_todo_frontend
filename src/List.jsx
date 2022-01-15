import React,{useState} from "react";
import Modal from "./Modal";
import Cookies from "universal-cookie";
import {Typography,Button,Container} from '@mui/material';

const List = ({ obj, __task }) => {
  let cookies = new Cookies()
  async function Delete_task(id) {
    const requestOptions = {
      method: "DELETE",
      headers: new Headers({
        "Authorization" : `Bearer ${cookies.get("jwt")}`
      }),
      body: JSON.stringify({
        id: id,
      }),
    };
    await fetch("https://auth-todo-b.herokuapp.com", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    obj.refresh();
  }
  const [flag,setFlag] = useState(false);
  let stat = 0;
  const Finish_Task = async (id) => {
    console.log(obj._data);
    obj._data.map((element) => {
      if (element.id === id) {
        stat = element.status;
      }
    });

    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        status: !stat,
      }),
    };
    await fetch("https://auth-todo-b.herokuapp.com", requestOptions)
      .then((response) => response.json)
      .then((data) => console.log(data));
    obj.refresh();
  };

  const Edit_task = () => {
    // console.log(flag)
    setFlag(!flag)
  };
  return (
    <Container variant="div">
      <Typography
        onClick={() => {
          Finish_Task(__task.id);
        }}
      >
        {__task.status ? __task.task + "aaa" : __task.task}
      </Typography>
      <Button
      variant="contained"
        id={__task.id}
        onClick={() => {
          Edit_task();
        }}
      >
        Edit
      </Button>
      {flag && <Modal key={__task.id} __task={__task} flag={setFlag} refresh={obj.refresh}/>}

      <Button
      variant="contained"
        id={__task.id}
        onClick={() => {
          Delete_task(__task.id);
        }}
      >
        Delete
      </Button>
      <br />
    </Container>
  );
};

export default List;
