import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Widget1 from "../widgets/widget_1";
import Widget2 from "../widgets/widget_2";
import Widget3 from "../widgets/widget_3";
import Widget4 from "../widgets/widget_4";
import Spinner from "../isLoading/spinner";
import EmpTable from "../widgets/empTable";
import EmpSearchTable from "../widgets/empSearchTable";
import EmpPrimaryData from "../widgets/empPrimaryData";
import Alert from '../alerts/alerts';


const Landing = ({ auth, payroll, history }) => {

  const [editButton, setEditButton] = useState(false);

  const onClickHandler = (e) => {
    e.preventDefault();
    editButton ? setEditButton(false) : setEditButton(true)

  }

  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push('/login')
    }
  }, [auth])



  return !payroll.payrollData[0] ? (
    <div>
      <h1>Select a Payroll Date</h1>
      <Alert />
    </div>
  ) : (
      <div>
        <div className="row">
          <Widget1 payroll={payroll} />
          <Widget2 payroll={payroll} />
          <Widget3 payroll={payroll} />
          <Widget4 payroll={payroll} />
        </div>
        <div className="col-md-6 grid-margin">
          <button hidden={payroll.loading} onClick={onClickHandler} type="button" className="btn btn-primary btn-rounded btn-icon">
            <i className="mdi mdi-table-edit"></i>
          </button>
        </div>
        {!editButton ? <EmpTable /> : <EmpSearchTable />}
      </div >
    )
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payroll: state.payroll,
});

export default connect(mapStateToProps)(withRouter(Landing));
