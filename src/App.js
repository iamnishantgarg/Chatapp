import React from "react";
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route path="/" component={Join} exact />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
