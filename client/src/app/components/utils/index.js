import React from 'react';

export const isLogin = () => {
    if (localStorage.token) {
        return true
    }
}

export const columns = [
    {
        text: 'ID',
        dataField: 'ID',
        sort: true,
    },
    //{
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
        text: 'W',
        dataField: 'WRKD_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'X') {
                return (
                    <label className="badge badge-success">X</label>
                );
            }
        },
        editor: true
    }, {
        text: 'HV',
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
        text: 'BF',
        dataField: 'BNS_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'X' || '') {
                return (
                    <label className="badge badge-warning">X</label>
                );
            }
        }
    }, {
        text: 'TF',
        dataField: 'TIMESHEET_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'X') {
                return (
                    <label className="badge badge-info">X</label>
                );
            } else {
                return (
                    <label></label>
                );
            }
        }
    }, {
        text: 'PUF',
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
        text: 'AF',
        dataField: 'ADJ_FLG',
        sort: true,
        formatter: (cellContent, row) => {
            if (cellContent === 'X') {
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
    },
    // {
    //     text: 'Pay Date',
    //     dataField: 'PAYDATE',
    //     sort: true
    // }, {
    //     text: 'UPDATED',
    //     dataField: 'UPDATED',
    //     sort: true
    // },
]
