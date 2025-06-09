import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppNavigation from "./src/navigation/AppNavigation";
import "./global.css";
import { LogBox } from "react-native";

function App() {
  LogBox.ignoreAllLogs(true);

  return <AppNavigation />;
}

export default App;
