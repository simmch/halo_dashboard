import React, { useState } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Modal } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { deleteById, updateById } from '../../actions/payroll/payroll';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const EmpPrimaryData = ({ payroll, deleteById, updateById }) => {
    const [confirm, setConfirm] = useState({
        show: false,
        id: ''
    })

    const { show, id } = confirm;

    const onClickHandlerDelete = (cellContent) => {
        setConfirm({
            ...confirm,
            show: true,
            id: cellContent
        })

    }

    const onClickHandlerUpdate = (id) => {

        function idMatch(payrollData) {
            return payrollData._id === id;
        }
        const data = payrollData.find(idMatch)

        updateById(id, data);

    }

    const onSubmitHandler = () => {
        deleteById(id);
        setConfirm({
            ...confirm,
            show: false
        })
    }


    const columns = [{
        text: 'First Name',
        dataField: 'FIRSTNAME',
        sort: true
    }, {
        text: 'Last Name',
        dataField: 'LASTNAME',
        sort: true
    }, {
        text: 'Worked Flag',
        dataField: 'WRKD_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'X') {
                return (
                    <label className="badge badge-success">WORKED</label>
                );
            }
        },
        editor: true
    }, {
        text: 'Hours Verified Flag',
        dataField: 'HRS_VER_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'V') {
                return (
                    <label className="badge badge-success">VERIFIED</label>
                );
            } else if (cellContent === 'U') {
                return (
                    <label className="badge badge-danger">UNVERIFIED</label>
                );
            }
        }
    }, {
        text: 'Bonus Flag',
        dataField: 'BNS_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'B' || '') {
                return (
                    <label className="badge badge-success">BONUS</label>
                );
            }
        }
    }, {
        text: 'Timesheet Flag',
        dataField: 'TIMESHEET_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'N/A') {
                return (
                    <label className="badge badge-info">TIMESHEET</label>
                );
            } else {
                return (
                    <label></label>
                );
            }
        }
    }, {
        text: 'Pickup Pay Flag',
        dataField: 'PICKUP_PAY_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'N/A') {
                return (
                    <label className="badge badge-primary">PICKUP PAY</label>
                );
            } else {
                return (
                    <label></label>
                );
            }
        }
    }, {
        text: 'Adjustment Flag',
        dataField: 'ADJ_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'N/A') {
                return (
                    <label className="badge badge-dark">ADJUSTMENT</label>
                );
            } else {
                return (
                    <label></label>
                );
            }
        }
    }, {
        text: 'Special Rate',
        dataField: 'SP_RATE',
        sort: true
    }, {
        text: 'Notes',
        dataField: 'NOTES',
        sort: true
    }, {
        text: 'Regular Hours',
        dataField: 'REG_HRS',
        sort: true
    }, {
        text: 'Scheduled Hours',
        dataField: 'SCH_HRS',
        sort: true
    }, {
        text: 'Unverfied Hours',
        dataField: 'UNVH',
        sort: true
    }, {
        text: 'Verified Hours',
        dataField: 'VRF_HRS',
        sort: true
    }, {
        text: 'Timesheet Hours',
        dataField: 'TS_HRS',
        sort: true
    }, {
        text: 'Show Up Pay',
        dataField: 'SUP',
        sort: true
    }, {
        text: 'Same Day Pay',
        dataField: 'SDP',
        sort: true
    }, {
        text: 'Bonus Hours',
        dataField: 'BNS_HRS',
        sort: true
    }, {
        text: 'Bonus Rate',
        dataField: 'BNS_RATE',
        sort: true
    }, {
        text: 'Bonus Hours B',
        dataField: 'BNS_HRS_B',
        sort: true
    }, {
        text: 'Bonus Rate B',
        dataField: 'BNS_RATE_B',
        sort: true
    }, {
        text: 'Bonus Hours C',
        dataField: 'BNS_HR_C',
        sort: true
    }, {
        text: 'Bonus Rate C',
        dataField: 'BNS_RATE_C',
        sort: true
    }, {
        text: 'Bonus Hours D',
        dataField: 'BNS_HR_D',
        sort: true
    }, {
        text: 'Bonus Rate D',
        dataField: 'BNS_RATE_D',
        sort: true
    }, {
        text: 'Pay Date',
        dataField: 'PAYDATE',
        sort: true
    }, {
        text: 'UPDATED',
        dataField: 'UPDATED',
        sort: true
    },
    ]

    const { loading, payrollData } = payroll;

    const defaultSorted = [{
        dataField: 'id',
        order: 'desc'
    }];

    return loading ? (
        <h1>Search by Associate ID</h1>
    ) : (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Associate Payroll Data</h4>
                                <div className="row">
                                    <div className="col-12">
                                        <ToolkitProvider
                                            keyField="id"
                                            bootstrap4
                                            data={payrollData}
                                            columns={columns}
                                            search

                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <ExportCSVButton {...props.csvProps}>
                                                            <button type="button" className="btn download btn-danger btn-rounded btn-icon">
                                                                <i className="mdi mdi-download"></i>
                                                            </button>
                                                        </ExportCSVButton>
                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-2 mr-2">Search in table:</p>
                                                            <SearchBar {...props.searchProps} />
                                                        </div>
                                                        <BootstrapTable
                                                            cellEdit={cellEditFactory({ mode: 'dbclick' })}
                                                            defaultSorted={defaultSorted}
                                                            pagination={paginationFactory()}
                                                            {...props.baseProps}
                                                            wrapperClasses="table-responsive"
                                                            striped={true}

                                                        />
                                                    </div>
                                                )
                                            }
                                        </ToolkitProvider>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll,
})

export default connect(mapStateToProps, { deleteById, updateById })(EmpPrimaryData);
