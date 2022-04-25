import "./App.scss";

import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <h1>Podcaster</h1>
      <Outlet />
    </div>
  );
};

export default App;
