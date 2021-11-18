import React, { useRef, useState, useEffect } from "react";
import { useDataLayerValue } from "../DataLayer";
import { fetchProjects } from "../fetch/fetchProject";
import { useHistory } from "react-router";
import AlertBox from "./AlertBox";
import "./newProject.css";
function NewProject() {
  const projectName = useRef("");
  const [data, setSuccess] = useState({ success: 0, message: "" });
  const [{ projects }, dispatch] = useDataLayerValue();
  const history = useHistory();
  const handleProject = async (e) => {
    e.preventDefault();
    const name = projectName.current.value;
    projectName.current.value = "";
    await fetch("/project/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project: name }),
    })
      .then(async (res) => {
        console.log(res);
        const response = await res.json();
        setSuccess({ success: response.success, message: response.message });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="newProject">
      {data.success === 0 ? (
        ""
      ) : (
        <AlertBox success={data.success} message={data.message} />
      )}

      <form onSubmit={handleProject}>
        <input type="text" ref={projectName} required />
        <button>Create</button>
      </form>
    </div>
  );
}

export default NewProject;
