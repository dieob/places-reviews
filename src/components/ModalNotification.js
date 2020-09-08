import React from 'react';
import './ModalNotification.scss'
import { connect } from 'react-redux';
import { Modal } from 'react-responsive-modal';

const ModalNotification = (props) => {
    const isOpen = props.modal.isOpen;
    const message = ""+props.modal.message;

    function hideModal() {
        //dispatch received as props because it is null on connect
        props.dispatch({ type: 'HIDE_MODAL' });
    }

    return (
        <>
            {
                isOpen && (
                    <Modal open={isOpen} onClose={hideModal} blockScroll={false} animationDuration={700} center>
                    <div className="modal">
                      <div className="modal-text">
                        {message}
                          <hr />
                      </div>
                      <svg className="modal-icon">
                        <use xlinkHref="images/sprite.svg#icon-thumbs-up"></use>
                      </svg>
                    </div>
                  </Modal>
                )
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        modal: state.modal
    };
};

export default connect(
    mapStateToProps,
    null
)(ModalNotification);
