import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPayrollByDate } from '../../../actions/payroll/payroll';
const PaydateDropdown = ({ paydates, getPayrollByDate }) => {
    const [selectedDate, setSelectedDate] = useState({
        date: null,
    })
    const onClickHandler = (e) => {
        e.preventDefault();
        getPayrollByDate(e.target.name)
        setSelectedDate({
            ...selectedDate,
            date: e.target.name
        })
    }

    const listDates = paydates.map(record => {
        return record.map(item => {
            return <Dropdown.Item name={item.PAYDATE} key={item._id} onClick={onClickHandler}>{item.PAYDATE}</Dropdown.Item>
        })
    });

    return (

        <Dropdown>
            <Dropdown.Toggle variant="btn btn-outline-primary" id="dropdownMenuOutlineButton1">
                {selectedDate.date === null ? 'Pay Date Options' : selectedDate.date}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {listDates}
            </Dropdown.Menu>
        </Dropdown>

    )
}

const mapStateToProps = (state) => ({
    paydates: state.paydates
})
export default connect(mapStateToProps, { getPayrollByDate })(PaydateDropdown);
