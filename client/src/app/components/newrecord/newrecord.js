import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { saveNewRecord } from '../../actions/payroll/payroll';
import { withRouter } from "react-router-dom";
import { saveDate } from '../../actions/paydates/paydates';
import { loadAssociates } from '../../actions/associate/associate';
import Spinner from '../isLoading/spinner';
import Alerts from '../alerts/alerts';
import { initialState, dateInitialState } from '../STATE';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { removeAlert } from '../../actions/alerts';
import { loadDates } from '../../actions/paydates/paydates';

const NewRecord = ({ saveNewRecord, isLoading, paydates, saveDate, loadAssociates, associate, removeAlert, loadDates }) => {
    const [data, setData] = useState(initialState)
    const [date, setDate] = useState(dateInitialState)

    const { ID, FIRSTNAME, LASTNAME, POSITION, ADJUSTMENT, SP_RATE, NOTES, REG_HRS, SCH_HRS, UNVH, VRF_HRS, TS_HRS, SUP, SDP, BNS_HRS, BNS_RATE, BNS_HRS_B, BNS_RATE_B, BNS_HR_C, BNS_RATE_C, BNS_HR_D, BNS_RATE_D, PAYDATE } = data;

    useEffect(() => {
        loadAssociates();
        removeAlert();
    }, [])


    const associateSelector = associate.map(associate => {
        return {
            value: associate.ID, label: `${associate.LASTNAME}, ${associate.FIRSTNAME} ${associate.ID}`
        }
    })



    let options = {};
    const paydateSelector = paydates.map(date => {
        return date.map(item => {
            return {
                value: item.PAYDATE, label: item.PAYDATE
            }
        })
    })

    options = paydateSelector;


    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    // Handles Scheduled Hours and Worked Flag
    const schHrsHandler = (e) => {
        if (e.target.value != 0) {
            setData({ ...data, SCH_HRS: e.target.value, WRKD_FLG: 'X' })
        }
        else {
            setData({ ...data, SCH_HRS: e.target.value, WRKD_FLG: 'N' })
        }
    }

    // Handles Hours Verified flag and Unverified Hours
    const unvhHandler = (e) => {
        if ((REG_HRS - UNVH === REG_HRS)) {
            setData({ ...data, HRS_VER_FLG: 'X', UNVH: e.target.value })
        } else {
            setData({ ...data, HRS_VER_FLG: 'N', UNVH: e.target.value })
        }
    }

    // Handles Time Sheet hours and Timesheet Flag
    const timesheetHandler = (e) => {
        if (e.target.value !== 0) {
            setData({ ...data, TIMESHEET_FLG: 'X', TS_HRS: e.target.value })
        } else {
            setData({ ...data, TIMESHEET_FLG: 'N', TS_HRS: e.target.value })
        }
    }

    // Handles SDP and Pickup Pay Flag
    const sdpHandler = (e) => {
        if (e.target.value > 0) {
            setData({ ...data, PICKUP_PAY_FLG: 'X', SDP: e.target.value })
        } else {
            setData({ ...data, PICKUP_PAY_FLG: 'N', SDP: e.target.value })
        }
    }

    // Handles Adjustment and Adjustment Flag
    const adjustmentHandler = (e) => {
        if (e.target.value != "") {
            setData({ ...data, [e.target.name]: e.target.value, ADJ_FLG: 'X' })
        } else {
            setData({ ...data, [e.target.name]: e.target.value, ADJ_FLG: 'N' })
        }
    }

    // Handles Bonus & Bonus Flag
    const bonusHandler = (e) => {
        if ((SCH_HRS - VRF_HRS - UNVH) === REG_HRS) {
            setData({ ...data, [e.target.name]: e.target.value, BNS_FLG: 'N' })
        } else {
            setData({ ...data, [e.target.name]: e.target.value, BNS_FLG: 'X' })
        }
    }

    const paydateHandler = (e) => {
        let value = e[0]
        if (value != undefined) {
            setData({ ...data, PAYDATE: e[0].value })
        } else {
            setData({ ...data, PAYDATE: '' })
        }
    }

    const associateHandler = (e) => {
        let value = e[0]
        // console.log(e)
        associate.map(associate => {
            if (e.value === associate.ID) {
                setData({
                    ...data,
                    FIRSTNAME: associate.FIRSTNAME,
                    LASTNAME: associate.LASTNAME,
                    ID: associate.ID,
                    POSITION: associate.POSITION
                })
            }
        })
    }

    // New Paydate onChange Handler
    const newPaydateHandler = (e) => {
        setDate({
            ...date,
            NEWPAYDATE: e.target.value
        })
    }

    // New Paydate onSubmit Handler
    const newPaydateSubmitHandler = (e) => {
        e.preventDefault();
        saveDate(date)
    }



    const onSubmitHandler = (e) => {
        e.preventDefault();
        saveNewRecord(data)
        setData(initialState)
    }

    let regularHoursHandler = +VRF_HRS + + SCH_HRS - UNVH - TS_HRS - BNS_HRS - BNS_HRS_B - BNS_HR_C - BNS_HR_D;

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };

    return isLoading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        New Payroll Record
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label><h3>Select Associate</h3></Form.Label>
                                            <Select
                                                onChange={associateHandler}
                                                options={
                                                    associateSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group hidden={!ID} as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>ID</Form.Label>
                                            <Form.Control
                                                value={ID}
                                                disabled
                                                // minLength={1}
                                                name="ID"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group hidden={!POSITION} as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Position</Form.Label>
                                            <Form.Control
                                                value={POSITION}
                                                disabled
                                                // minLength={1}
                                                name="POSITION"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group hidden={!FIRSTNAME} as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                value={FIRSTNAME}
                                                disabled
                                                // minLength={1}
                                                name="FIRSTNAME"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group hidden={!LASTNAME} as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                value={LASTNAME}
                                                disabled
                                                // minLength={1}
                                                name="LASTNAME"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Adjustment</Form.Label>
                                            <Form.Control
                                                onChange={adjustmentHandler}
                                                value={ADJUSTMENT}
                                                // minLength={1}
                                                name="ADJUSTMENT"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Special Rate</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={SP_RATE}
                                                minLength={1}
                                                name="SP_RATE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={NOTES}
                                                minLength={1}
                                                name="NOTES"
                                                required
                                                type="textarea"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Regular Hours</Form.Label>
                                            <Form.Control
                                                hidden={!SCH_HRS}
                                                onChange={onChangeHandler}
                                                disabled
                                                value={regularHoursHandler}
                                                minLength={1}
                                                name="REG_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Scheduled Hours</Form.Label>
                                            <Form.Control
                                                onChange={schHrsHandler}
                                                value={SCH_HRS}
                                                minLength={1}
                                                name="SCH_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Unverified Hours</Form.Label>
                                            <Form.Control
                                                onChange={unvhHandler}
                                                value={UNVH}
                                                minLength={1}
                                                name="UNVH"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Verified Hours</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={VRF_HRS}
                                                minLength={1}
                                                name="VRF_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Timesheet Hours</Form.Label>
                                            <Form.Control
                                                onChange={timesheetHandler}
                                                value={TS_HRS}
                                                minLength={1}
                                                name="TS_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Show Up Pay</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={SUP}
                                                minLength={1}
                                                name="SUP"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Same Day Pay</Form.Label>
                                            <Form.Control
                                                onChange={sdpHandler}
                                                value={SDP}
                                                minLength={1}
                                                name="SDP"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Bonus Hours</Form.Label>
                                            <Form.Control
                                                onChange={bonusHandler}
                                                value={BNS_HRS}
                                                minLength={1}
                                                name="BNS_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Bonus Rate</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={BNS_RATE}
                                                minLength={1}
                                                name="BNS_RATE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Bonus Hours B</Form.Label>
                                            <Form.Control
                                                value={BNS_HRS_B}
                                                onChange={onChangeHandler}
                                                minLength={1}
                                                name="BNS_HRS_B"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Bonus Rate B</Form.Label>
                                            <Form.Control
                                                value={BNS_RATE_B}
                                                onChange={onChangeHandler}
                                                minLength={1}
                                                name="BNS_RATE_B"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Bonus Hours C</Form.Label>
                                            <Form.Control
                                                value={BNS_HR_C}
                                                onChange={onChangeHandler}
                                                minLength={1}
                                                name="BNS_HR_C"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Bonus Rate C</Form.Label>
                                            <Form.Control
                                                value={BNS_RATE_C}
                                                onChange={onChangeHandler}
                                                minLength={1}
                                                name="BNS_RATE_C"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Bonus Hours D</Form.Label>
                                            <Form.Control
                                                value={BNS_HR_D}
                                                onChange={onChangeHandler}
                                                minLength={1}
                                                name="BNS_HR_D"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Bonus Rate D</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={BNS_RATE_D}
                                                minLength={1}
                                                name="BNS_RATE_D"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Pay Date</Form.Label>
                                            <Typeahead
                                                labelKey="label"
                                                id="typeahead-single"
                                                options={options[0]}
                                                placeholder="Choose a Date"
                                                onChange={paydateHandler}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button type="submit" onClick={onSubmitHandler}>Submit form</Button>

                                </Form>

                            </div>
                            <Alerts />
                        </div>
                    </div>
                </div>
            </div>
        )
}

const mapStateToProps = (state) => ({
    payload: state.payload,
    isLoading: state.auth.loading,
    paydates: state.paydates,
    associate: state.associate.associate
})

export default connect(mapStateToProps, { saveNewRecord, saveDate, loadAssociates, removeAlert, loadDates })(withRouter(NewRecord));