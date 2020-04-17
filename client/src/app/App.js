import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
import PrivateRoute from "./components/routing/PrivateRoute";
import Landing from "./components/dashboard/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Upload from "./components/upload/upload";
import Download from "./components/download/download";
import Employees from "./components/employees/employees";
import setAuthToken from "./utils/auth/setAuthToken";
import { loadUser } from "./actions/auth/auth";
import Navbar from "./components/navigation/navbar";
import Sidebar from "./components/navigation/sidebar";

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
                    <Route exact path="/" component={Landing} />
                    <PrivateRoute exact path="/upload" component={Upload} />
                    <PrivateRoute exact path="/download" component={Download} />
                    <PrivateRoute exact path="/employees" component={Employees} />
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
