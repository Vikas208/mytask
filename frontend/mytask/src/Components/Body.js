import React from "react";
import SideBar from "./SideBar";
import Screen from "./Screen";
import "./body.css";
function Body() {
  return (
    <div className="body">
      <SideBar />
      <Screen />
    </div>
  );
}

export default Body;
