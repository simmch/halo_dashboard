import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Widget1 from "./widgets/widget_1";
import Widget2 from "./widgets/widget_2";
import Widget3 from "./widgets/widget_3";
import Widget4 from "./widgets/widget_4";
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
          <Widget1 payroll={payroll} />
          <Widget2 payroll={payroll} />
          <Widget3 payroll={payroll} />
          <Widget4 payroll={payroll} />
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
