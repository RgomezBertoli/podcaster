import "./App.scss";

import { Outlet } from "react-router-dom";
import LoaderContext from "contexts/loader-context";
import AppHeader from "components/app-header";

const App = () => {
  return (
    <LoaderContext>
      <div className="App">
        <AppHeader />
        <section className="content">
          <Outlet />
        </section>
      </div>
    </LoaderContext>
  );
};

export default App;
