import "./App.scss";

import { Outlet } from "react-router-dom";
import LoaderContext from "contexts/loader-context";
import PodcastContext from "contexts/podcast-context";
import AppHeader from "components/app-header";

const App = () => {
  return (
    <LoaderContext>
      <PodcastContext>
        <div className="App">
          <AppHeader />
          <section className="content">
            <Outlet />
          </section>
        </div>
      </PodcastContext>
    </LoaderContext>
  );
};

export default App;
