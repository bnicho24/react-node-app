import React from 'react';
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
const API_URL = process.env.REACT_APP_SITE_URL;

const handleRegister = async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const role = form.role.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/users/register`, { name, role, email, password });
    // alert('Registration successful! Token: ' + res.data.token);
    toast.success("Registerd successful!");
   console.log('res', res)
  } catch (err) {
    // alert('Registration failed: ' + err.response.data);
     toast.error("Login failed: " + err.response.data);
  }
};
const Register = () => {
  return (
    <>
    <div className="form-page">
      <div className="login-card">
        <h2>Register</h2>
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col md={12}>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    placeholder="Enter Role"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Register
                </Button>
              </Form>

              <p className="text-center mt-2 mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-muted">
                  Login here
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    </>
  )
}

export default Register