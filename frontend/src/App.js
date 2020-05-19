import React from "react";
import "./css/App.css";
import Header from "./components/Header.js";
import ListView from "./components/ListView.js";
import PlayView from "./components/PlayView.js";
import { Route, Switch } from "react-router-dom";
import { CookieProvider } from "react-cookie";

function App() {
  console.log("App");
  return (
    <CookieProvider>
      <div className="App">
        <div className="filter"></div>
        <Header />
        <Switch>
          <Route exact path="/" component={ListView} />
          <Route path="/videos/:id" component={PlayView} />
        </Switch>
      </div>
    </CookieProvider>
  );
}

export default App;
