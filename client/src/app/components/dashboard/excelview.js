import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Spinner from "../isLoading/spinner";
import EmpTable from "../widgets/empTable";
import ExcelViewDataTable from "../widgets/excelViewDataTable";
import EmpPrimaryData from "../widgets/empPrimaryData";
import Alert from '../alerts/alerts';


const ExcelView = ({ auth, payroll, history }) => {

    const [editButton, setEditButton] = useState(false);

    const onClickHandler = (e) => {
        e.preventDefault();
        editButton ? setEditButton(false) : setEditButton(true)

    }

    const onExcelModeHandler = (e) => {
        e.preventDefault();
        history.location.pathname === "/" ? history.push('/excelview') : history.push('/')
    }

    let excelModeStyle = history.location.pathname === "/" ? "btn btn-info btn-rounded btn-icon" : "btn btn-success btn-rounded btn-icon";

    useEffect(() => {
        if (!auth.isAuthenticated) {
            history.push('/login')
        }
    }, [auth])

    console.log(history)



    return !payroll.payrollData[0] ? (
        <div>
            <h1>Select a Payroll Date</h1>

            <Alert />
        </div>
    ) : (
            <div>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 grid-margin stretch-card">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <button hidden={payroll.loading} onClick={onExcelModeHandler} type="button" style={{ 'margin-left': '10px' }} className={excelModeStyle}>
                                    <i className="mdi mdi-file-excel"></i>
                                </button> Excel Mode
                            </div>
                        </div>
                    </div>
                </div>
                <ExcelViewDataTable />
            </div >
        )
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    payroll: state.payroll,
});

export default connect(mapStateToProps)(withRouter(ExcelView));
