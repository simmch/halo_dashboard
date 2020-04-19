import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { saveNewRecord } from '../../actions/payroll/payroll';
import Spinner from '../isLoading/spinner';
import Alerts from '../alerts/alerts';
import moment from 'moment';

const NewRecord = ({ saveNewRecord, isLoading }) => {
    const [data, setData] = useState({
        EUID: '' || 0,
        EMP: '',
        WRKD_FLG: '',
        HRS_VER_FLG: '',
        BNS_FLG: '',
        TIMESHEET_FLG: '',
        PICKUP_PAY_FLG: '',
        ADJ_FLG: '',
        ADJUSTMENT: '',
        SP_RATE: '',
        NOTES: '',
        REG_HRS: '',
        SCH_HRS: '',
        UNVH: '',
        S: '',
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
        PAY_DATE: '',
        UPDATED: moment().format(),
    })

    const { EUID, EMP, WRKD_FLG, BNS_FLG, HRS_VER_FLG, TIMESHEET_FLG, PICKUP_PAY_FLG, ADJ_FLG, ADJUSTMENT, SP_RATE, NOTES, REG_HRS, SCH_HRS, UNVH, S, TS_HRS,
        SUP, SDP, BNS_HRS, BNS_RATE, BNS_HRS_B, BNS_RATE_B, BNS_HR_C, BNS_RATE_C, BNS_HR_D, BNS_RATE_D, PAY_DATE, UPDATED } = data;

    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        saveNewRecord(data)
    }


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
                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                                            <Form.Label>ID</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                required
                                                value={EUID}
                                                name="EUID"
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                required
                                                onChange={onChangeHandler}
                                                value={EMP}
                                                name="EMP"
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>WRKD_FLG</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={WRKD_FLG}
                                                minLength={1}
                                                maxLength={5}
                                                name="WRKD_FLG"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>HRS_VER_FLG</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={HRS_VER_FLG}
                                                minLength={1}
                                                maxLength={5}
                                                name="HRS_VER_FLG"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>BNS_FLG</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                minLength={1}
                                                maxLength={5}
                                                name="BNS_FLG"
                                                value={BNS_FLG}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>TIMESHEET_FLG</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={TIMESHEET_FLG}
                                                minLength={1}
                                                maxLength={5}
                                                name="TIMESHEET_FLG"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>PICKUP_PAY_FLG</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={PICKUP_PAY_FLG}
                                                minLength={1}
                                                maxLength={5}
                                                name="PICKUP_PAY_FLG"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>ADJ_FLG</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={ADJ_FLG}
                                                minLength={1}
                                                maxLength={5}
                                                name="ADJ_FLG"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>ADJUSTMENT</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={ADJUSTMENT}
                                                minLength={1}
                                                name="ADJUSTMENT"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>SP_RATE</Form.Label>
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
                                        <Form.Group as={Col} md="10" controlId="validationCustom02">
                                            <Form.Label>NOTES</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={NOTES}
                                                minLength={1}
                                                name="NOTES"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>REG_HRS</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={REG_HRS}
                                                minLength={1}
                                                name="REG_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>SCH_HRS</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={SCH_HRS}
                                                minLength={1}
                                                name="SCH_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>UNVH</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={UNVH}
                                                minLength={1}
                                                name="UNVH"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>S</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={S}
                                                minLength={1}
                                                name="S"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>TS_HRS</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={TS_HRS}
                                                minLength={1}
                                                name="TS_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>SUP</Form.Label>
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
                                            <Form.Label>SDP</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={SDP}
                                                minLength={1}
                                                name="SDP"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>BNS_HRS</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={BNS_HRS}
                                                minLength={1}
                                                name="BNS_HRS"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>BNS_RATE</Form.Label>
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
                                            <Form.Label>BNS_HRS_B</Form.Label>
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
                                            <Form.Label>BNS_RATE_B</Form.Label>
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
                                            <Form.Label>BNS_HR_C</Form.Label>
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
                                            <Form.Label>BNS_RATE_C</Form.Label>
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
                                            <Form.Label>BNS_HR_D</Form.Label>
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
                                            <Form.Label>BNS_RATE_D</Form.Label>
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
                                            <Form.Label>PAY_DATE</Form.Label>
                                            <Form.Control
                                                value={PAY_DATE}
                                                onChange={onChangeHandler}
                                                minLength={1}
                                                name="PAY_DATE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>UPDATED</Form.Label>
                                            <Form.Control
                                                value={UPDATED}
                                                onChange={onChangeHandler}
                                                minLength={1}
                                                name="UPDATED"
                                                required
                                                type="text"

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
})

export default connect(mapStateToProps, { saveNewRecord })(NewRecord);