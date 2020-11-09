import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import Migrate from "./migrate";
import Reviews from "./reviews";
import LoginPage from "./login";
import Product from "./product";

function App() {
  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/migrate" component={Migrate} />
        <Route exact path="/products" component={Product} />
        <Route
          path="/reviews/:product_id/:viewer_id"
          render={props => {
            return <Reviews {...props} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
