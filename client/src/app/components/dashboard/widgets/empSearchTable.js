import React, { useState } from 'react';
import { columns } from '../../utils';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

const EmpSearchTable = ({ payroll }) => {
    const { loading, payrollData } = payroll;

    return loading ? (
        <h1>Search by Employee ID.</h1>
    ) : (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Payroll</h4>
                            <div className="row">
                                <div className="col-12">
                                    <div>
                                        <ReactTable
                                            scrollable
                                            data={payrollData}
                                            filterable={true}
                                            defaultPageSize={10}
                                            columns={columns}
                                            style={{
                                                height: "500px"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll,
})

export default connect(mapStateToProps)(EmpSearchTable);
