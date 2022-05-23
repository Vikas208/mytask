import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import { fetchProjects } from "../fetch/fetchProject";
import Menu from "./Menu";

import "./sideBar.css";
function SideBar() {
  const [{ projects }, dispatch] = useDataLayerValue();

  const fetchProject = async () => {
    const data = await fetchProjects();
    console.log(data?.message);
    dispatch({
      type: "SET_PROJECTS",
      projects: data?.message,
    });
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="sidebar">
      <div className="logo_sidebar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4088/4088795.png"
          alt="logo"
        />
      </div>
      <div className="side_menu">
        <div className="top_menu">
          <div className="heading">
            <span>Projects</span>
            <span
              className="material-icons reload"
              onClick={() => {
                // console.log("reload");
                fetchProject();
              }}
            >
              refresh
            </span>
          </div>
          <hr />
          <div className="projects">
            {projects && typeof projects === 'object' &&
              projects ? (
              projects.map((element) => {
                return (
                  <Menu
                    Image="delete"
                    text={element?.project}
                    link={"project/" + element?.project}
                    key={element?.project}
                  />
                );
              })
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
        <div className="bottom_menu">
          <Menu Image="add" text="New Project" link="add" />
          {/* <Menu Image="logout" text="Logout" link="logout" /> */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
