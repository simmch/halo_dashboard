import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { saveDate, deletePayDate } from '../../actions/paydates/paydates';
import { saveAssociate } from '../../actions/associate/associate';
import Spinner from '../isLoading/spinner';
import Alerts from '../alerts/alerts';
import { dateInitialState } from '../STATE';
import { Typeahead } from 'react-bootstrap-typeahead';

const PayDate = ({ isLoading, paydates, saveDate, saveAssociate, deletePayDate }) => {
    const [date, setDate] = useState(dateInitialState)
    const [deleteDate, setDeleteDate] = useState({
        ID: '',
    })
    const { NEWPAYDATE } = date;

    let options = {};
    const paydateSelector = paydates.map(date => {
        return date.map(item => {
            return {
                value: item._id, label: item.PAYDATE
            }
        })
    })

    options = paydateSelector;

    const paydateHandler = (e) => {
        let value = e[0]
        if (value != undefined) {
            setDeleteDate({ ...deleteDate, ID: e[0].value })
        } else {
            setDeleteDate({ ...deleteDate, ID: '' })
        }
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

    const deletePaydateSubmitHandler = (e) => {
        e.preventDefault();
        deletePayDate(deleteDate.ID);
    }

    return isLoading ? (
        <Spinner />
    ) : (
            <div>
                <div className="row">
                    <div className="col-md-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>New Pay Date</Form.Label>
                                            <Form.Control
                                                onChange={newPaydateHandler}
                                                required
                                                value={NEWPAYDATE}
                                                name="NEWPAYDATE"
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button type="submit" onClick={newPaydateSubmitHandler}>Submit form</Button>

                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Delete Pay Date</Form.Label>
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
                                    <Button type="submit" onClick={deletePaydateSubmitHandler}>Delete Pay Date</Button>

                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.loading,
    paydates: state.paydates
})

export default connect(mapStateToProps, { saveDate, saveAssociate, deletePayDate })(PayDate);