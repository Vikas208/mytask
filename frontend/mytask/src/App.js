import "./App.css";
import Body from "./Components/Body";
import Login from "./Components/Login";
import { useDataLayerValue } from "./DataLayer";
function App() {
  const [{ user }, dispatch] = useDataLayerValue();
  // console.log(user);
  return <div className="App">{user.length !== 0 ? <Body /> : <Login />}</div>;
}

export default App;
