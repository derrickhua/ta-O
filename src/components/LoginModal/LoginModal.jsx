import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as usersService from '../../utilities/usersService';

import './LoginModal.css'

export default function LoginModal({show, handleClose, handleShow, setUser, redirectHomePage}) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      setError('')
      const user = await usersService.login(credentials);
      setUser(user);
      handleClose();
      redirectHomePage()
    } catch(err) {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
        <div>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" name='email' onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' onChange={handleChange} required/>
          </Form.Group>
          <span className='loginBtnArea'>
            <button className='authBtn' type="submit">
              Submit
            </button>
          </span>
        </Form>
        </div>
      <p className="error-message">&nbsp;{error}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

