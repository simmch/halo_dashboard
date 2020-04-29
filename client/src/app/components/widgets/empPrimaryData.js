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


    const columns = [
        {
            text: '',
            dataField: 'WRKD_FLG',
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent === 'X') {
                    return (
                        <label className="badge badge-success">X</label>
                    );
                } else {
                    return (
                        <label className="badge badge-danger">N</label>
                    );
                }
            }
        }, {
            text: '',
            dataField: 'HRS_VER_FLG',
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent === 'X') {
                    return (
                        <label className="badge badge-success">X</label>
                    );
                } else if (cellContent === 'N') {
                    return (
                        <label className="badge badge-danger">N</label>
                    );
                }
            }
        }, {
            text: '',
            dataField: 'BNS_FLG',
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent === 'X' || '') {
                    return (
                        <label className="badge badge-warning">B</label>
                    );
                }
            }
        }, {
            text: '',
            dataField: 'TIMESHEET_FLG',
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent === 'X') {
                    return (
                        <label className="badge badge-info">X</label>
                    );
                }
            }
        }, {
            text: '',
            dataField: 'PICKUP_PAY_FLG',
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent === 'X') {
                    return (
                        <label className="badge badge-primary">X</label>
                    );
                } else {
                    return (
                        <label></label>
                    );
                }
            }
        }, {
            text: '',
            dataField: 'ADJ_FLG',
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent !== 'N') {
                    return (
                        <label className="badge badge-dark">X</label>
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
            text: 'Adjustment',
            dataField: 'ADJUSTMENT',
            sort: true
        }, {
            text: 'REG Hours',
            dataField: 'REG_HRS',
            sort: true
        }, {
            text: 'SCH_HRS',
            dataField: 'SCH_HRS',
            sort: true
        }, {
            text: 'UNVH',
            dataField: 'UNVH',
            sort: true
        }, {
            text: 'Verified Hours',
            dataField: 'VRF_HRS',
            sort: true
        }, {
            text: 'TS Hours',
            dataField: 'TS_HRS',
            sort: true
        }, {
            text: 'SUP',
            dataField: 'SUP',
            sort: true
        }, {
            text: 'SDP',
            dataField: 'SDP',
            sort: true
        }, {
            text: 'BNS Hours',
            dataField: 'BNS_HRS',
            sort: true
        }, {
            text: 'BNS Rate',
            dataField: 'BNS_RATE',
            sort: true
        }, {
            text: 'BNS Hours B',
            dataField: 'BNS_HRS_B',
            sort: true
        }, {
            text: 'BNS Rate B',
            dataField: 'BNS_RATE_B',
            sort: true
        }, {
            text: 'BNS Hours C',
            dataField: 'BNS_HR_C',
            sort: true
        }, {
            text: 'BNS Rate C',
            dataField: 'BNS_RATE_C',
            sort: true
        }, {
            text: 'BNS Hours D',
            dataField: 'BNS_HR_D',
            sort: true
        }, {
            text: 'BNS Rate D',
            dataField: 'BNS_RATE_D',
            sort: true
        }, {
            text: 'Pay Date',
            dataField: 'PAYDATE',
            sort: true
        }
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
                                            keyField="ID"
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
                                                            pagination={paginationFactory({ sizePerPageList: [5, 50, 200] })}
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
