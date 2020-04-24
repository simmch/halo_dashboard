import React from 'react';
import { connect } from 'react-redux';

const Widget_2 = ({ payroll }) => {
    const { loading, payrollData } = payroll;

    const reg = payrollData.map(hrs => {
        return hrs.SCH_HRS
    })

    let sumSchHrs = 0;

    if (loading === false) {
        sumSchHrs = reg.reduce((a, b) => a + b);
    }

    return (
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
                <div className="card-body">
                    <div className="clearfix">
                        <div className="float-left">
                            <i className="mdi mdi-receipt text-warning icon-lg"></i>
                        </div>
                        <div className="float-right">
                            <p className="mb-0 text-right text-light">Scheduled Hours</p>
                            <div className="fluid-container">
                                <h3 className="font-weight-medium text-right mb-0 text-light">{Math.round(sumSchHrs)}</h3>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                        <i className="mdi mdi-calendar-outline mr-1" aria-hidden="true"></i> Total Scheduled Hours</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll
})

export default connect(mapStateToProps)(Widget_2)
