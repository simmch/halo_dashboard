import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Widget_1 from "./widgets/widget_1";
import Widget_2 from "./widgets/widget_2";
import Widget_3 from "./widgets/widget_3";
import Widget_4 from "./widgets/widget_4";
import Spinner from "../isLoading/spinner";
import EmpTable from "./widgets/empTable";

const Landing = ({ auth, payroll }) => {

  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return auth.loading === true ? (
    <Spinner></Spinner>
  ) : (
      <div>
        <div className="row">
          <Widget_1 payroll={payroll} />
          <Widget_2 payroll={payroll} />
          <Widget_3 payroll={payroll} />
          <Widget_4 payroll={payroll} />
        </div>
        <EmpTable />
      </div>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payroll: state.payroll
});

export default connect(mapStateToProps)(Landing);
