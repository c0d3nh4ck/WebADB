import React from "react";
import "./App.css";
import Adbsh from "../adb/adb";
import AppSearch from "../searchbar/searchbar";

function App() {
  return (
    <div className="App">
      <Adbsh />
      <AppSearch />
    </div>
  );
}

export default App;
