import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { loadAssociates, saveAssociate, deleteAssociate } from '../../actions/associate/associate';
import Spinner from '../isLoading/spinner';
import Alerts from '../alerts/alerts';
import { removeAlert } from '../../actions/alerts';
import Select from 'react-select';
import PayDate from '../newrecord/newpaydate';

const NewAssociate = ({ isLoading, loadAssociates, associate, saveAssociate, deleteAssociate, removeAlert }) => {
    const [data, setData] = useState({
        ID: '',
        FIRSTNAME: '',
        LASTNAME: '',
        POSITION: ''
    })
    const { ID, FIRSTNAME, LASTNAME, POSITION } = data;
    const [deleteAssociateData, setDeleteAssociateData] = useState({
        _id: null
    })

    useEffect(() => {
        loadAssociates();
        removeAlert();
    }, [])



    const associateSelector = associate.map(associate => {
        return {
            value: associate.ID, label: `${associate.LASTNAME}, ${associate.FIRSTNAME} ${associate.ID}`
        }
    })


    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const deleteAssociateHandler = (e) => {
        associate.map(associate => {
            if (e.value === associate.ID) {
                setDeleteAssociateData({
                    ...deleteAssociateData,
                    _id: associate._id
                })
            }
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        saveAssociate(data)
        setData({
            ID: '',
            FIRSTNAME: '',
            LASTNAME: '',
            POSITION: ''
        })
    }

    const onDeleteAssociateSubmitHandler = (e) => {
        e.preventDefault();
        deleteAssociate(deleteAssociateData._id)
        setDeleteAssociateData({
            _id: ''
        })
    }

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
                        New Associate
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate>
                                    <Form.Row>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>ID</Form.Label>
                                            <Form.Control
                                                value={ID}
                                                onChange={onChangeHandler}
                                                name="ID"
                                                required
                                                type="text"
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Position</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={POSITION}
                                                name="POSITION"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="5" controlId="validationCustom02">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={FIRSTNAME}
                                                name="FIRSTNAME"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="5" controlId="validationCustom02">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                onChange={onChangeHandler}
                                                value={LASTNAME}
                                                name="LASTNAME"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button type="submit" onClick={onSubmitHandler}>Save Associate</Button>

                                </Form>

                            </div>
                        </div>
                    </div>


                </div>

                <div className="page-header">
                    <h3 className="page-title">
                        Delete Associate
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Associate Information</Form.Label>
                                            <Select
                                                onChange={deleteAssociateHandler}
                                                options={
                                                    associateSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button type="submit" onClick={onDeleteAssociateSubmitHandler}>Delete Associate</Button>

                                </Form>

                            </div>
                        </div>
                    </div>


                </div>

                <PayDate />
                <Alerts />
            </div>
        )
}

const mapStateToProps = (state) => ({
    payload: state.payload,
    isLoading: state.auth.loading,
    associate: state.associate.associate
})

export default connect(mapStateToProps, { saveAssociate, loadAssociates, deleteAssociate, removeAlert })(NewAssociate);