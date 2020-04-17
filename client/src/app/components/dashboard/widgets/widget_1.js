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
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-9">
                            <div className="d-flex align-items-center align-self-start">
                                <h3 className="mb-0">{Math.round(sumRegHrs)}</h3>
                                <p className="text-success ml-2 mb-0 font-weight-medium"></p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="icon icon-box-success ">
                                <span className="mdi mdi-timer icon-item"></span>
                            </div>
                        </div>
                        <h6 className="text-muted font-weight-normal">Regular Hours Worked</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    // payroll: state.payroll
})

export default connect(mapStateToProps)(Widget_1)
