import React from "react";
import "./css/App.css";
import Header from "./components/Header.js";
import ListView from "./components/ListView.js";
import PlayView from "./components/PlayView.js";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="filter"></div>
      <Header />
      <Route path="/" component={ListView} exact />
      <Route path="/videos/:id" component={PlayView} />
    </div>
  );
}

export default App;
