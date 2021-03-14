import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Navbar />
        <div className="row">
          <div className="col s12 m10 offset-m1 l8 offset-l2 xl8 offset-xl2">
            <Routes />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
