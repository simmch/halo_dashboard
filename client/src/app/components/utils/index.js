export const isLogin = () => {
    if (localStorage.token) {
        return true
    }
}

export const columns = [{
    Header: 'ID',
    accessor: 'EUID'
}, {
    Header: 'Name',
    accessor: 'EMP'
}, {
    Header: 'WRKD_FLG',
    accessor: 'WRKD_FLG'
}, {
    Header: 'HRS_VER_FLG',
    accessor: 'HRS_VER_FLG'
}, {
    Header: 'BNS_FLG',
    accessor: 'BNS_FLG'
}, {
    Header: 'TIMESHEET_FLG',
    accessor: 'TIMESHEET_FLG'
}, {
    Header: 'PICKUP_PAY_FLG',
    accessor: 'PICKUP_PAY_FLG'
}, {
    Header: 'ADJ_FLG',
    accessor: 'ADJ_FLG'
}, {
    Header: 'ADJUSTMENT',
    accessor: 'ADJUSTMENT'
}, {
    Header: 'SP_RATE',
    accessor: 'SP_RATE'
}, {
    Header: 'NOTES',
    accessor: 'NOTES'
}, {
    Header: 'REG_HRS',
    accessor: 'REG_HRS'
}, {
    Header: 'SCH_HRS',
    accessor: 'SCH_HRS'
}, {
    Header: 'UNVH',
    accessor: 'UNVH'
}, {
    Header: 'S',
    accessor: 'S'
}, {
    Header: 'TS_HRS',
    accessor: 'TS_HRS'
}, {
    Header: 'SUP',
    accessor: 'SUP'
}, {
    Header: 'SDP',
    accessor: 'SDP'
}, {
    Header: 'BNS_HRS',
    accessor: 'BNS_HRS'
}, {
    Header: 'BNS_RATE',
    accessor: 'BNS_RATE'
}, {
    Header: 'BNS_HRS_B',
    accessor: 'BNS_HRS_B'
}, {
    Header: 'BNS_RATE_B',
    accessor: 'BNS_RATE_B'
}, {
    Header: 'BNS_HR_C',
    accessor: 'BNS_HR_C'
}, {
    Header: 'BNS_RATE_C',
    accessor: 'BNS_RATE_C'
}, {
    Header: 'BNS_HR_D',
    accessor: 'BNS_HR_D'
}, {
    Header: 'BNS_RATE_D',
    accessor: 'BNS_RATE_D'
}, {
    Header: 'PAY_DATE',
    accessor: 'PAY_DATE'
}, {
    Header: 'UPDATED',
    accessor: 'UPDATED'
}

]