import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Widget1 from "../widgets/widget_1";
import Widget2 from "../widgets/widget_2";
import Widget3 from "../widgets/widget_3";
import Widget4 from "../widgets/widget_4";
import Spinner from "../isLoading/spinner";
import EmpSearchTable from "../widgets/empSearchTable";
import EmpPrimaryData from "../widgets/empPrimaryData";
import Alerts from "../alerts/alerts";
import { Form, Col, Button } from 'react-bootstrap';

const Employees = ({ auth, payroll, history }) => {

    useEffect(() => {
        if (!auth.isAuthenticated) {
            history.push('/login')
        }
    }, [])

    const [editButton, setEditButton] = useState(false);

    const onClickHandler = (e) => {
        e.preventDefault();
        editButton ? setEditButton(false) : setEditButton(true)

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
                    <div className="col-md-6 grid-margin">
                        <button hidden={payroll.loading} onClick={onClickHandler} type="button" className="btn btn-primary btn-rounded btn-icon">
                            <i className="mdi mdi-table-edit"></i>
                        </button>
                    </div >

                </div>
                {!editButton ? <EmpPrimaryData /> : <EmpSearchTable />}


                <Alerts />

            </div>
        )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll,
    auth: state.auth,
})

export default connect(mapStateToProps)(withRouter(Employees))
