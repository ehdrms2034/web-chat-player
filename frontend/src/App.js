import React, { useState } from "react";
import "./css/App.css";
import Header from "./components/Header.js";
import ListView from "./components/ListView.js";
import PlayView from "./components/PlayView.js";
import { Route, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

function App() {
  const [nickname, setNickname] = useState("닉네임");

  return (
    <CookiesProvider>
      <div className="App">
        <div className="filter"></div>
        <Header nickname={nickname} setNickname={setNickname} />
        <Switch>
          <Route exact path="/" component={ListView} />
          <Route path="/videos/:id" render={(props) => <PlayView {...props} nickname={nickname} />} />
        </Switch>
      </div>
    </CookiesProvider>
  );
}

export default App;
