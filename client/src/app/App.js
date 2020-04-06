import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";

import Landing from "./components/landing/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Uploader from "./components/xlsx/upload";
import setAuthToken from "./utils/auth/setAuthToken";
import { loadUser } from "./actions/auth/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className="container-scroller">
            <div className="container-fluid page-body-wrapper">
              <div className="main-panel">
                <div className="content-wrapper">
                  <Route exact path="/" component={Landing} />
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                  </Switch>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
