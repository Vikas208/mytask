import React from "react";
import "./screen.css";
import { Route, Switch } from "react-router-dom";
import NewProject from "./NewProject";
import Logout from "./Logout";
import Header from "./Header";
import Projects from "./Projects";
function Screen() {
  return (
    <div className="screen">
      <Header />
      <Switch>
        <Route exact path="/add" component={NewProject}></Route>
        {/* <Route exact path="/logout" component={Logout}></Route> */}
        <Route exact path="/project/:project" component={Projects}></Route>
      </Switch>
    </div>
  );
}
export default Screen;
