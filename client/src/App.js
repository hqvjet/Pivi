import React, {useState} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import HomePage from "./pages/Home"
import NavBar from "./components/NavBar";
import Routers from "./router";
import Auth from "./pages/Auth";

function App() {
    const [token, setToken]= useState(localStorage.getItem('user'))

  return (
      <>
          {token !== null ? <Routers/> : <Auth/>}
      </>
  );
}

export default App;
