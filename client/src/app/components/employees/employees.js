import React from "react";
import { connect } from "react-redux";
import Widget_1 from "../dashboard/widgets/widget_1";
import Widget_2 from "../dashboard/widgets/widget_2";
import Widget_3 from "../dashboard/widgets/widget_3";
import Widget_4 from "../dashboard/widgets/widget_4";
import Spinner from "../isLoading/spinner";
import EmpSearchTable from "../dashboard/widgets/empSearchTable";

const Employees = ({ auth, payroll }) => {

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
                <EmpSearchTable />
            </div>
        )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll,
    auth: state.auth,
})

export default connect(mapStateToProps)(Employees)
