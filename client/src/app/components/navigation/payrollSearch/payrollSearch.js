import React, { useState } from 'react'
import { connect } from 'react-redux';
import { getPayrollById } from '../../../actions/payroll/payroll';

const PayrollSearch = ({ getPayrollById }) => {
    const [empId, setEmpId] = useState({
        id: 0
    })

    const { id } = empId;

    const onChangeHandler = (e) => {
        setEmpId({
            ...empId,
            id: e.target.value
        })
    }

    const enterKeyPressed = (e) => {
        if (e.key === "Enter") {
            getPayrollById(id);
            e.preventDefault();
        }
    }

    return (
        <li className="nav-item w-100">
            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input
                    type="text"
                    className="form-control"
                    name="id"
                    placeholder="Search Employee Id"
                    onChange={onChangeHandler}
                    onKeyPress={enterKeyPressed} />
            </form>
        </li>
    )
}

const mapStateToProps = (state) => ({
    payroll: state.payroll
})

export default connect(mapStateToProps, { getPayrollById })(PayrollSearch)
