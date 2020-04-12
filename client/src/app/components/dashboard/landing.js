import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../isLoading/spinner";

const Landing = ({ auth }) => {

  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return auth.loading === true ? (
    <Spinner></Spinner>
  ) : (
      <div>
        <h1>Hello World</h1>
      </div>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
