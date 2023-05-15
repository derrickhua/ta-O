import { signUp } from '../../utilities/usersService'
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';

import './SignUpModal.css'

export default class SignUpModal extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.confirm;
      delete formData.error;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      // Update user state with user
      this.props.setUser(user);
      this.props.handleClose();
      this.props.redirectHomePage();
    } catch {
      // Invalid signup
      this.setState({
        error: 'Sign Up Failed - Try Again'
      });
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  }

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>  
        <div>
          <div>
            <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </Form.Group>
            <span className='signUpArea'>
              <button className='suBtn' type="submit" disabled={disable}>SIGN UP</button>
            </span>
            
          </Form>
          </div>
          <p className="error-message">&nbsp;{this.state.error}</p>
        </div>
      </Modal.Body>
    </Modal>

    );
  }
}
