import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { login } from "../../actions/auth/auth";
import Alert from "../alerts/alerts";
import Spinner from "../isLoading/spinner";

const Login = ({ login, auth, history }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  if (auth.isAuthenticated) {
    history.push('/')
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return localStorage.token ? (
    <Spinner />
  ) : (
      <div>
        <div className="d-flex align-items-center login-card auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-8 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={require("../../../assets/images/halo_logo.png")}
                    alt="logo"
                  />
                </div>
                <h4>Halo Payroll Dashboard</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3" onSubmit={onSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="Username"
                      size="lg"
                      className="h-auto"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="Password"
                      size="lg"
                      className="h-auto"
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <button
                      type="submit"
                      value="login"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      SIGN IN
                  </button>
                  </div>

                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Create
                  </Link>
                  </div>
                </Form>
              </div>
              <Alert />
            </div>

          </div>
        </div>

      </div>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
