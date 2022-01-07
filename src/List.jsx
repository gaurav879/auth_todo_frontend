import React,{useState} from "react";
import Modal from "./Modal";

let List = ({ obj, __task }) => {
  async function Delete_task(id) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    };
    await fetch("http://127.0.0.1:8000", requestOptions)
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
    await fetch("http://127.0.0.1:8000", requestOptions)
      .then((response) => response.json)
      .then((data) => console.log(data));
    obj.refresh();
  };

  const Edit_task = () => {
    // console.log(flag)
    setFlag(!flag)
  };
  return (
    <div>
      <span
        onClick={() => {
          Finish_Task(__task.id);
        }}
      >
        {__task.status ? __task.task + "aaa" : __task.task}
      </span>
      <button
        id={__task.id}
        onClick={() => {
          Edit_task();
        }}
      >
        Edit
      </button>
      {flag && <Modal key={__task.id} __task={__task} flag={setFlag} refresh={obj.refresh}/>}

      <button
        id={__task.id}
        onClick={() => {
          Delete_task(__task.id);
        }}
      >
        Delete
      </button>
      <br />
      <br />
    </div>
  );
};

export default List;
