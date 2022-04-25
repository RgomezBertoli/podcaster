import React from "react";

import Loader from "components/loader";
import { useLoaderContext } from "contexts/loader-context";

import "./style.scss";

export default function AppHeader(){
  const {isLoading} = useLoaderContext();
  
  return (
    <header className="app-header">
      <h1 className="app-header__title">Podcaster</h1>
      {isLoading ? <Loader/> : ""}
    </header>
  )
}