import React, { useState } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Modal } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { deleteById, updateById } from '../../actions/payroll/payroll';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { initialState, payrollDataMapping } from '../STATE';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const EmpSearchTable = ({ payroll, deleteById, updateById }) => {
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

    // UPDATE ALL ASSOCIATES
    const onClickUpdateAllHandler = () => {
        payrollData.map(item => {
            let data = item;
            // Worked Flag
            if (data.SCH_HRS !== 0) {
                data.WRKD_FLG = 'X';
            } else {
                data.WRKD_FLG = 'N';
            }
            // Hours Verified Flag
            if (data.REG_HRS - data.UNVH === data.REG_HRS) {
                data.HRS_VER_FLG = 'X';
            } else {
                data.HRS_VER_FLG = 'N';
            }
            // // Timesheet Flag
            // if (data.TS_HRS !== 0) {
            //     data.TIMESHEET_FLG = 'X';
            // } else {
            //     data.TIMESHEET_FLG = 'N';
            // }
            // Pickup Pay Flag
            if (data.SDP > 0) {
                data.PICKUP_PAY_FLG = 'X';
            } else {
                data.PICKUP_PAY_FLG = 'N';
            }
            // Adjustment Flag
            if (data.ADJUSTMENT !== "") {
                data.ADJ_FLG = 'X';
            } else {
                data.ADJ_FLG = 'N';
            }
            // Bonus Flag
            if ((data.SCH_HRS - data.VRF_HRS - data.UNVH) === data.REG_HRS) {
                data.BNS_FLG = 'N';
            } else {
                data.BNS_FLG = 'X';
            }
            // Regular Hour
            data.REG_HRS = +data.VRF_HRS + + data.SCH_HRS - data.UNVH - data.BNS_HRS - data.BNS_HRS_B - data.BNS_HR_C - data.BNS_HR_D;

            updateById(data._id, data);

        })
    }

    const onClickHandlerUpdate = (id) => {
        console.log(id)
        function idMatch(payrollData) {
            return payrollData._id === id;
        }
        const data = payrollData.find(idMatch)

        // Worked Flag
        if (data.SCH_HRS !== 0) {
            data.WRKD_FLG = 'X';
        } else {
            data.WRKD_FLG = 'N';
        }
        // Hours Verified Flag
        if (data.REG_HRS - data.UNVH === data.REG_HRS) {
            data.HRS_VER_FLG = 'X';
        } else {
            data.HRS_VER_FLG = 'N';
        }
        // // Timesheet Flag
        // if (data.TS_HRS !== 0) {
        //     data.TIMESHEET_FLG = 'X';
        // } else {
        //     data.TIMESHEET_FLG = 'N';
        // }
        // Pickup Pay Flag
        if (data.SDP > 0) {
            data.PICKUP_PAY_FLG = 'X';
        } else {
            data.PICKUP_PAY_FLG = 'N';
        }
        // Adjustment Flag
        if (data.ADJUSTMENT !== "") {
            data.ADJ_FLG = 'X';
        } else {
            data.ADJ_FLG = 'N';
        }
        // Bonus Flag
        if ((data.SCH_HRS - data.VRF_HRS - data.UNVH) === data.REG_HRS) {
            data.BNS_FLG = 'N';
        } else {
            data.BNS_FLG = 'X';
        }
        // Regular Hour
        data.REG_HRS = +data.VRF_HRS + + data.SCH_HRS - data.UNVH - data.BNS_HRS - data.BNS_HRS_B - data.BNS_HR_C - data.BNS_HR_D;

        console.log(data)

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
        //     {
        //     text: 'Position',
        //     dataField: 'POSITION',
        //     sort: true,
        //     formatter: (cellContent, row) => {
        //         if (cellContent === 0) {
        //             return (
        //                 <label>HHA</label>
        //             );
        //         } else if (cellContent === 1) {
        //             return (
        //                 <label>DSP</label>
        //             );
        //         } else if (cellContent === 2) {
        //             return (
        //                 <label>Office</label>
        //             );
        //         } else if (cellContent === 3) {
        //             return (
        //                 <label>Admin</label>
        //             );
        //         }
        //     }
        // }, 
        {
            text: 'First Name',
            dataField: 'FIRSTNAME',
            sort: true
        }, {
            text: 'Last Name',
            dataField: 'LASTNAME',
            sort: true
        }, {
            text: 'WRKD_FLG',
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
            text: 'HRS_VER_FLG',
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
            text: 'BNS_FLG',
            dataField: 'BNS_FLG',
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent === 'X' || '') {
                    return (
                        <label className="badge badge-warning">B</label>
                    );
                }
            }
        },
        // {
        //     text: '',
        //     dataField: 'TIMESHEET_FLG',
        //     sort: true,
        //     formatter: (cellContent, row) => {
        //         if (cellContent === 'X') {
        //             return (
        //                 <label className="badge badge-info">X</label>
        //             );
        //         }
        //     }
        // }, 
        {
            text: 'PICKUP_PAY_FLG',
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
            text: 'ADJ_FLG',
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
        }, {
            dataField: '_id',
            text: 'Delete',
            sort: false,
            formatter: (cellContent) => {
                return (
                    <div>
                        <button className="btn btn-dark" onClick={e => { e.preventDefault(); onClickHandlerDelete(cellContent) }}>
                            <i className="mdi mdi-delete text-danger"></i>
                        </button>
                    </div>
                );
            }
        }, {
            dataField: '_id',
            text: 'Update',
            sort: false,
            formatter: (cellContent) => {
                return (
                    <div>
                        <button className="btn btn-dark" onClick={e => { e.preventDefault(); onClickHandlerUpdate(cellContent) }}>
                            <i className="mdi mdi-cloud-upload text-warning"></i>
                        </button>
                    </div>
                );
            }
        }
    ]

    const afterSaveCell = (oldValue, newValue, row, column) => {

        if (column.dataField === "SCH_HRS") {
            // Worked Flag
            if (row.SCH_HRS != 0) {
                row.WRKD_FLG = 'X';
            } else {
                row.WRKD_FLG = 'N';
            }
        }

        if (column.dataField === "UNVH") {
            // Hours Verified Flag
            if (row.REG_HRS - row.UNVH === row.REG_HRS) {
                row.HRS_VER_FLG = 'X';
            } else {
                row.HRS_VER_FLG = 'N';
            }
        }

        // if (column.dataField === "TS_HRS") {
        //     // Hours Verified Flag
        //     if (row.TS_HRS != 0) {
        //         row.TIMESHEET_FLG = 'X';
        //     } else {
        //         row.TIMESHEET_FLG = 'N';
        //     }
        // }

        if (column.dataField === "SDP") {
            // Pickup Pay Flag
            if (row.SDP > 0) {
                row.PICKUP_PAY_FLG = 'X';
            } else {
                row.PICKUP_PAY_FLG = 'N';
            }
        }

        if (column.dataField === "ADJUSTMENT") {
            // Adjustment Flag
            if (row.ADJUSTMENT !== "") {
                row.ADJ_FLG = 'X';
            } else {
                row.ADJ_FLG = 'N';
            }
        }
        if (column.dataField === "SCH_HRS" || column.dataField === "VRF_HRS" || column.dataField === "UNVH") {
            // Bonus Flag
            if ((row.SCH_HRS - row.VRF_HRS - row.UNVH) === row.REG_HRS) {
                row.BNS_FLG = 'N';
            } else {
                row.BNS_FLG = 'X';
            }
        }

        row.REG_HRS = +row.VRF_HRS + + row.SCH_HRS - row.UNVH - row.BNS_HRS - row.BNS_HRS_B - row.BNS_HR_C - row.BNS_HR_D;

    }

    const { loading, payrollData } = payroll;

    const defaultSorted = [{
        dataField: 'ID',
        order: 'desc'
    }];

    return loading ? (
        <h1>Edit Associate Data</h1>
    ) : (
            <div>
                <Modal
                    show={show}
                    onHide={() => show(false)}
                    aria-labelledby="example-modal-sizes-title-md"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete this record?</p>
                    </Modal.Body>

                    <Modal.Footer className="fleex-wrap">
                        <Button variant="primary m-2" onClick={(e) => { e.preventDefault(); onSubmitHandler() }}>Confirm</Button>
                        <Button variant="light m-2" onClick={(e) => { e.preventDefault(); setConfirm({ ...confirm, show: false }) }}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Associate Raw Payroll Data</h4>
                                <div className="row">
                                    <div className="col-12">
                                        <ToolkitProvider
                                            // Key that differentiates each row for updating
                                            keyField="_id"
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

                                                        <button type="button" onClick={onClickUpdateAllHandler} className="btn download btn-outline-warning btn-rounded btn-icon">
                                                            <i className="mdi mdi-auto-fix"></i>
                                                        </button>

                                                        {/* <button type="button" className="deleteAll download btn btn-outline-danger btn-rounded btn-icon">
                                                            <i className="mdi mdi-delete-forever"></i>
                                                        </button> */}

                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-2 mr-2">Search in table:</p>
                                                            <SearchBar {...props.searchProps} />
                                                        </div>

                                                        <BootstrapTable
                                                            cellEdit={cellEditFactory({
                                                                mode: 'click',
                                                                afterSaveCell
                                                            })}
                                                            defaultSorted={defaultSorted}
                                                            pagination={paginationFactory({ sizePerPageList: [8, 50, 200] })}
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

export default connect(mapStateToProps, { deleteById, updateById })(EmpSearchTable);
