import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, IndexRoute } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
import PrivateRoute from "./components/routing/PrivateRoute";
import Landing from "./components/dashboard/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Uploader from "./components/xlsx/upload";
import setAuthToken from "./utils/auth/setAuthToken";
import { loadUser } from "./actions/auth/auth";
import Navbar from "./components/navigation/navbar";
import Sidebar from "./components/navigation/sidebar";
import { connect } from "react-redux";

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
            <PrivateRoute component={Sidebar} />
            <div className="container-fluid page-body-wrapper">
              <PrivateRoute component={Navbar} />
              <div className="main-panel">
                <div className="content-wrapper">
                  <Switch>
                    <Route exact path="/dashboard" component={Landing} />
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
