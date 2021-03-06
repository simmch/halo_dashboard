import React from 'react';
import { connect } from 'react-redux';

const Widget_1 = ({ payroll }) => {
    const { loading, payrollData } = payroll;

    const reg = payrollData.map(hrs => {
        return hrs.REG_HRS
    })

    let sumRegHrs = 0;


    if (loading === false) {
        sumRegHrs = reg.reduce((a, b) => a + b);
    }



    return (
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
                <div className="card-body">
                    <div className="clearfix">
                        <div className="float-left">
                            <i className="mdi mdi-timer text-danger icon-lg"></i>
                        </div>
                        <div className="float-right">
                            <p className="mb-0 text-right text-light">Regular Hours</p>
                            <div className="fluid-container">
                                <h3 className="font-weight-medium text-right mb-0 text-light">{Math.round(sumRegHrs)}</h3>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                        <i className="mdi mdi-timer mr-1" aria-hidden="true"></i>Regular Hours Worked</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    // payroll: state.payroll
})

export default connect(mapStateToProps)(Widget_1)
