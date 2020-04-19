import React from "react";
import { connect } from "react-redux";
import Widget1 from "../dashboard/widgets/widget_1";
import Widget2 from "../dashboard/widgets/widget_2";
import Widget3 from "../dashboard/widgets/widget_3";
import Widget4 from "../dashboard/widgets/widget_4";
import Spinner from "../isLoading/spinner";
import EmpSearchTable from "../dashboard/widgets/empSearchTable";
import Alerts from "../alerts/alerts";

const Employees = ({ auth, payroll }) => {

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
                <EmpSearchTable />
                <Alerts />
            </div>
        )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll,
    auth: state.auth,
})

export default connect(mapStateToProps)(Employees)
