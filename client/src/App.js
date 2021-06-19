import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ImageScreen from "./Screen/ImageScreen";
import ContextScreen from "./Screen/ContextScreen";
function App() {
  useEffect(() => {});
  return (
    <ContextScreen>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" component={ImageScreen} />
        </Switch>
      </BrowserRouter>
    </ContextScreen>
  );
}

export default App;
