import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDataLayerValue } from "../DataLayer";
import { fetchTask } from "../fetch/fetchProject";
import Form from "./Form";
import "./Project.css";
import Task from "./Task";
function Projects() {
  const { project } = useParams();
  const [{ tasks }, dispatch] = useDataLayerValue();
  const [takslist, settask] = useState([]);

  const fetchTasks = async () => {
    const res = await fetchTask(project);
    console.log(res?.message);
    dispatch({
      type: "SET_TASK",
      tasks: res?.message,
    });
    settask(res?.message);
  };

  useEffect(() => {
    fetchTasks();

    return () => {
      settask([]);
    }
  }, [project]);

  return (
    <div className="project">
      <div className="project_header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4>{project}</h4>
          <span
            className="material-icons "
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => {
              // console.log("reload");
              fetchTasks();
            }}
          >
            refresh
          </span>
        </div>

        <button
          id="project_add"
          onClick={() => {
            document.getElementById("taskform").style.display = "flex";
            document.getElementById("project_add").style.display = "none";
          }}
        >
          Add Task
        </button>
        <Form project={project} />

        <div className="taskList">
          {takslist &&
            typeof takslist === 'object'
            ? takslist?.map((element) => {
              console.log(element);
              return (
                <Task
                  time={element?.time}
                  title={element.title}
                  description={element.description}
                  isComplete={element?.isComplete}
                  project={project}
                  key={element?.title}
                />
              );
            })
            : console.log(
              "Loading"
            )
            // <span>Loading...</span>
          }
        </div>
      </div>
    </div>
  );
}

export default Projects;
