import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
import PrivateRoute from "./components/routing/PrivateRoute";
import Landing from "./components/dashboard/landing";
import ExcelView from "./components/dashboard/excelview";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Upload from "./components/upload/upload";
import Employees from "./components/employees/employees";
import setAuthToken from "./utils/auth/setAuthToken";
import { loadUser } from "./actions/auth/auth";
import Navbar from "./components/navigation/navbar";
import Sidebar from "./components/navigation/sidebar";
import NewRecord from "./components/newrecord/newrecord";
import NewAssociate from "./components/newassociate/newassociate";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  console.log("This is a test")

  useEffect(() => {
    store.dispatch(loadUser());
  }, [localStorage.token]);


  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/excelview" component={ExcelView} />
        <Fragment>
          <section className="container-scroller">
            <Route component={Sidebar} />
            <div className="container-fluid page-body-wrapper">
              <Route component={Navbar} />

              <div className="main-panel">
                <div className="content-wrapper">
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/upload" component={Upload} />
                    <Route exact path="/employees" component={Employees} />
                    <Route exact path="/newrecord" component={NewRecord} />
                    <Route exact path="/newassociate" component={NewAssociate} />
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
