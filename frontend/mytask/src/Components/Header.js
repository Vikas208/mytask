import React from "react";
import { useDataLayerValue } from "../DataLayer";
import "./header.css";
function Header() {
  const [{ user }, dispatch] = useDataLayerValue();
  console.log(user);
  return (
    <div className="header">
      <img src={user?.photoURL} alt="" />
      <p>{user?.displayName}</p>
    </div>
  );
}

export default Header;
