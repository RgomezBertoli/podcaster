import React from "react";
import { useNavigate } from "react-router-dom";

import Loader from "components/loader";
import { useLoaderContext } from "contexts/loader-context";

import "./style.scss";

export default function AppHeader(){
  const {isLoading} = useLoaderContext();
  const navigate = useNavigate();
  
  return (
    <header className="app-header">
      <h1 className="app-header__title" onClick={() => navigate("/")}>Podcaster</h1>
      {isLoading ? <Loader/> : ""}
    </header>
  )
}