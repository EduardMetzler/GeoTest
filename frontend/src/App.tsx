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
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
