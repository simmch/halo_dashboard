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


const Landing = ({ auth, payroll, history, associate }) => {

  const [editButton, setEditButton] = useState(false);

  const onClickHandler = (e) => {
    e.preventDefault();
    editButton ? setEditButton(false) : setEditButton(true)

  }

  const onExcelModeHandler = (e) => {
    e.preventDefault();
    history.location.pathname === "/" ? history.push('/excelview') : history.push('/')
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
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <button hidden={payroll.loading} onClick={onClickHandler} type="button" className="btn btn-primary btn-rounded btn-icon">
                  <i className="mdi mdi-table-edit"></i>
                </button> Edit Table
                <button hidden={payroll.loading} onClick={onExcelModeHandler} type="button" style={{ 'margin-left': '10px' }} className="btn btn-info btn-rounded btn-icon">
                  <i className="mdi mdi-file-excel"></i>
                </button> Enter Excel Mode
              </div>
            </div>
          </div>
        </div>
        {!editButton ? <EmpTable /> : <EmpSearchTable />}
      </div >
    )
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payroll: state.payroll,
  associate: state.associate.associate
});

export default connect(mapStateToProps)(withRouter(Landing));
