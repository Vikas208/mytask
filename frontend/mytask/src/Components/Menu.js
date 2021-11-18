import React from "react";
import "./menu.css";
import { Link, useHistory } from "react-router-dom";
import { DeleteProject } from "../fetch/fetchProject";
function Menu({ Image, text, link }) {
  const history = useHistory();
  const handleDelete = () => {
    DeleteProject(text);
  };
  return (
    <div className="menu">
      <span className="material-icons ">{Image !== "delete" && Image}</span>
      <Link to={"/" + link}>{text}</Link>
      <span
        className="material-icons delete"
        onClick={() => {
          history.push("/add");
          handleDelete();
        }}
      >
        {Image === "delete" && Image}
      </span>
    </div>
  );
}

export default Menu;
