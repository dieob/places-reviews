import React from 'react';
import './ErrorNotification.scss'
import { connect } from 'react-redux';

const ErrorNotification = (props) => {
    const isOpen = props.error.isOpen;
    const errorMessage = ""+props.error.errorMessage;

    function hideNotification(event) {
        event.preventDefault();
        //dispatch received as props because it is null on connect
        props.dispatch({ type: 'HIDE_ERROR' });
    }

    return (
        <>
            {
                isOpen && errorMessage && (
                    <div className="fancy-error-class">
                        <span className="error-text">{errorMessage}</span>
                        <a className="error-close" href="# " onClick={hideNotification}>X</a>
                    </div>
                )
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        error: state.error
    };
};

export default connect(
    mapStateToProps,
    null
)(ErrorNotification);
