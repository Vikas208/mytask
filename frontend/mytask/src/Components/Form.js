import React, { useRef, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import AlertBox from "./AlertBox";
import "./form.css";
function Form({ project }) {
  const title = useRef("");
  const task = useRef("");
  const [success, setState] = useState({ success: 0, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`/task/addTask/${project}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.current.value,
        description: task.current.value,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        setState(response);
      })
      .catch((err) => {
        console.log(err);
      });
    title.current.value = "";
    task.current.value = "";
  };

  return (
    <div className="form" id="taskform">
      {success.success === 0 ? (
        ""
      ) : (
        <AlertBox success={success.success} message={success.message} />
      )}
      <span
        className="material-icons"
        onClick={() => {
          document.getElementById("taskform").style.display = "none";
          document.getElementById("project_add").style.display = "block";
        }}
      >
        close
      </span>
      <form onSubmit={handleSubmit}>
        <input type="text" required ref={title} placeholder="Enter Title" />
        <textarea
          ref={task}
          required
          placeholder="Enter Task"
          style={{ fontSize: "16px" }}
        ></textarea>
        <button>Create Task</button>
      </form>
    </div>
  );
}

export default Form;
