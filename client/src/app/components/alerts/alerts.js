import React from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

const Alerts = ({ alert }) => {
    return alert.msg === null ? (
        <div></div>
    ) : (
            <Alert variant={alert.alertType}>
                {alert.msg}
            </Alert>
        );
}

const mapStateToProps = state => ({
    alert: state.alert
});

export default connect(mapStateToProps)(Alerts);