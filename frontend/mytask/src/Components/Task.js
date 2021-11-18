import React, { useRef, useState } from "react";
import "./task.css";
function Task({ title, description, time, isComplete, project }) {
  const [titleReadonly, setTitleReadonly] = useState(true);
  const [descReadonly, setDescReadonly] = useState(true);
  const inputTitle = useRef("");
  const inputDesc = useRef("");
  const UpdateTitle = async () => {
    await fetch(`/task/changeTitle/${project}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        newtitle: inputTitle.current.value,
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        if (response.success) title = inputTitle.current.value;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateTask = async () => {
    await fetch(`/task/updateTask/${project}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        newDescription: inputDesc.current.value,
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        if (response.success === true) description = inputDesc.current.value;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteTask = async () => {
    await fetch(`/task/deleteTask/${project}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then(async (res) => {
        console.log(await res.json());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="task">
      <div className="task_header">
        <input
          type="text"
          disabled={titleReadonly}
          ref={inputTitle}
          defaultValue={title}
        />

        <div className="icons">
          <span
            className="material-icons"
            onClick={() => {
              setTitleReadonly((preState) => !preState);
              console.log(inputTitle.current.value);
            }}
          >
            edit
          </span>
          <span
            className="material-icons"
            onClick={() => {
              DeleteTask();
            }}
          >
            delete
          </span>
          <span
            className="material-icons done"
            style={{ display: titleReadonly ? "none" : "block" }}
            onClick={() => {
              UpdateTitle();
              setTitleReadonly(true);
            }}
          >
            done
          </span>
        </div>
      </div>

      <div className="task_body">
        <textarea
          defaultValue={description}
          rows={1}
          cols={25}
          disabled={descReadonly}
          ref={inputDesc}
        ></textarea>
      </div>

      <div className="task_footer">
        <span className="time">{new Date(time).toUTCString()}</span>
        <div className="icons">
          <span
            className="material-icons"
            onClick={() => {
              setDescReadonly((preState) => !preState);
              console.log(inputDesc.current.value);
            }}
          >
            edit
          </span>
          <span
            className="material-icons done"
            style={{ display: !descReadonly ? "block" : "none" }}
            onClick={() => {
              UpdateTask();
              setDescReadonly(true);
            }}
          >
            done
          </span>
        </div>
      </div>
    </div>
  );
}

export default Task;
