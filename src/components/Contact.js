import React, { Component } from 'react';
import './Contact.scss';
import { sendMessage } from '../actions'
import { connect } from 'react-redux';
import ModalNotification from './ModalNotification';


class Contact extends Component {

  constructor(props) {
    super(props);

    this.submitHandle = this.submitHandle.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      contactEmail: '',
      message: '',
      redirectPath: null,
      isEmailPresent: true,
      isMessagePresent: true,
      successModal: false
    }
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
      isEmailPresent: true,
      isMessagePresent: true
    });
  }

  submitHandle(event) {
    event.preventDefault();
    const formData = new FormData();
    var validationEmail, validationMessage;
    validationEmail = validationMessage = true;

    //validate all required fields
    if (!this.state.contactEmail) {
      validationEmail = false;
      this.setState({ isEmailPresent: validationEmail });
    }
    if (!this.state.message) {
      validationMessage = false;
      this.setState({ isMessagePresent: validationMessage });
    }

    formData.append("email", this.state.contactEmail);
    formData.append("message", this.state.message);

    if (validationEmail && validationMessage) {
      this.props.sendMessage(formData).then(
        this.setState(() => ({ contactEmail:'', message:'' }))
      );
    }
  }

  onCloseModal = () => {
    this.setState({ successModal: false });
  };

  render() {
    return (
      <div className="contact-container extra-margin-top">
        <div>
          <h2 className="title extra-margin-bottom">We're happy to help!</h2>
          <form onSubmit={this.submitHandle}>
            <div className="form-item">
              <input className={'input-text-box' + (this.state.isEmailPresent ? '' : ' invalid')} placeholder="Your email" type="email" name="contactEmail" value={this.state.contactEmail} onChange={this.changeHandler} />
              <label className="input-label">Your email</label>
              <span className={this.state.isEmailPresent ? 'hide-invalid' : 'show-invalid'}>Email is required</span>
            </div>
            <div className="form-item">
              <textarea cols="40" rows="5" className={'description-text-box' + (this.state.isMessagePresent ? '' : ' invalid')} placeholder="Message" type="text" name="message" value={this.state.message} onChange={this.changeHandler} />
              <label className="input-label-description">Message</label>
              <span className={this.state.isMessagePresent ? 'hide-invalid' : 'show-invalid'}>A message is required</span>
            </div>
            <div className="form-item centered-item">
              <button className="button-submit" onClick={this.submitHandle}><h3>Send</h3></button>
              <span className={+(this.state.isMessagePresent || this.state.isEmailPresent) ? 'hide-invalid' : 'show-invalid extra-margin-top'}>Please fill all required fields</span>
            </div>
          </form>
        </div>
        <ModalNotification></ModalNotification>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    sendMessage: post => dispatch(sendMessage(post))
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Contact);