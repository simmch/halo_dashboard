import moment from 'moment';
export const initialState = {
    ID: '',
    FIRSTNAME: '',
    LASTNAME: '',
    WRKD_FLG: 'N',
    HRS_VER_FLG: 'N',
    BNS_FLG: 'N',
    TIMESHEET_FLG: 'N',
    PICKUP_PAY_FLG: 'N',
    ADJ_FLG: 'N',
    ADJUSTMENT: '',
    SP_RATE: '',
    NOTES: '',
    REG_HRS: '',
    SCH_HRS: '',
    UNVH: '',
    VRF_HRS: '',
    TS_HRS: '',
    SUP: '',
    SDP: '',
    BNS_HRS: '',
    BNS_RATE: '',
    BNS_HRS_B: '',
    BNS_RATE_B: '',
    BNS_HR_C: '',
    BNS_RATE_C: '',
    BNS_HR_D: '',
    BNS_RATE_D: '',
    PAYDATE: '',
    UPDATED: moment().format(),
}

export const dateInitialState = {
    NEWPAYDATE: '',
    UPDATED: moment().format()
}