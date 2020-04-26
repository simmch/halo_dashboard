import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getPayrollById } from '../../../actions/payroll/payroll';
import { loadAssociates } from '../../../actions/associate/associate';
import Select from 'react-select';
import { Form, Col, Button } from 'react-bootstrap';

const PayrollSearch = ({ getPayrollById, loadAssociates, associate, auth }) => {

    const associateSelector = associate.map(associate => {
        return {
            value: associate.ID, label: `${associate.LASTNAME}, ${associate.FIRSTNAME} ${associate.ID}`
        }
    })

    const associateHandler = (e) => {
        getPayrollById(e.value);
    }

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };

    return (
        <li className="nav-item w-100">

            <Select
                type="text"
                placeholder="Select an Associate"
                onChange={associateHandler}
                options={
                    associateSelector
                }
                styles={styleSheet}
            />



        </li>
    )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll,
    auth: state.auth,
    associate: state.associate.associate
})

export default connect(mapStateToProps, { getPayrollById, loadAssociates })(PayrollSearch)
