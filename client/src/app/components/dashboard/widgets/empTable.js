import React from 'react';
import { columns } from '../../utils';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const EmpTable = ({ payroll }) => {
    const { loading, payrollData } = payroll;

    const defaultSorted = [{
        dataField: 'id',
        order: 'desc'
    }];

    return loading ? (
        <h1>Select a Payroll date</h1>
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        Payroll Table
            </h3>

                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Payroll Data</h4>
                                <div className="row">
                                    <div className="col-12">
                                        <ToolkitProvider
                                            keyField="id"
                                            bootstrap4
                                            data={payrollData}
                                            columns={columns}
                                            search
                                            exportCSV

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
                                                            defaultSorted={defaultSorted}
                                                            pagination={paginationFactory()}
                                                            {...props.baseProps}
                                                            wrapperClasses="table-responsive"

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
            </div>
        )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll,
})

export default connect(mapStateToProps)(EmpTable);
