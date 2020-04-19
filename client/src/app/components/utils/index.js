import React from 'react';

export const isLogin = () => {
    if (localStorage.token) {
        return true
    }
}

export const columns = [{
    text: 'ID',
    dataField: 'EUID',
    sort: true
}, {
    text: 'Name',
    dataField: 'EMP',
    sort: true
}, {
    text: 'Worked Flag',
    dataField: 'WRKD_FLG',
    sort: true
}, {
    text: 'Hours Verified Flag',
    dataField: 'HRS_VER_FLG',
    sort: true
}, {
    text: 'Bonus Flag',
    dataField: 'BNS_FLG',
    sort: true
}, {
    text: 'Timesheet Flag',
    dataField: 'TIMESHEET_FLG',
    sort: true
}, {
    text: 'Pickup Pay Flag',
    dataField: 'PICKUP_PAY_FLG',
    sort: true
}, {
    text: 'Adjustment Flag',
    dataField: 'ADJ_FLG',
    sort: true
}, {
    text: 'Adjustment',
    dataField: 'ADJUSTMENT',
    sort: true
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
    text: 'S',
    dataField: 'S',
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
    text: 'Bonus Hours',
    dataField: 'BNS_HRS',
    sort: true
}, {
    text: 'Bonus Rate',
    dataField: 'BNS_RATE',
    sort: true
}, {
    text: 'BNS_HRS_B',
    dataField: 'BNS_HRS_B',
    sort: true
}, {
    text: 'BNS_RATE_B',
    dataField: 'BNS_RATE_B',
    sort: true
}, {
    text: 'BNS_HR_C',
    dataField: 'BNS_HR_C',
    sort: true
}, {
    text: 'BNS_RATE_C',
    dataField: 'BNS_RATE_C',
    sort: true
}, {
    text: 'BNS_HR_D',
    dataField: 'BNS_HR_D',
    sort: true
}, {
    text: 'BNS_RATE_D',
    dataField: 'BNS_RATE_D',
    sort: true
}, {
    text: 'PAY_DATE',
    dataField: 'PAY_DATE',
    sort: true
}, {
    text: 'UPDATED',
    dataField: 'UPDATED',
    sort: true
}
]
