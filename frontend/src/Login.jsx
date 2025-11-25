import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = process.env.REACT_APP_SITE_URL;

function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log("Email:", email, "Password:", password);
    // try {
    //   const res = await axios.post(`${API_URL}/login`, { email, password });
    //   // alert('Login successful! Token: ' + res.data.token);
    //   toast.success("Login successful!");
    //   localStorage.setItem("userToken", res.data.token);
    //   localStorage.setItem("tokenExpiry", res.data.expires);
    //   navigate('/dashboard');
    // } catch (err) {
    //   // alert('Login failed: ' + err.response.data);
    //   toast.error("Login failed: " + err.response.data);
    // }
        try {
        const res = await axios.post(`${API_URL}/users/login`, { email, password });
        toast.success("Login successful!");
        localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("tokenExpiry", res.data.expires);
        await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${res.data.token}` },
        })
        .then(profileRes => {
          // setProfile(profileRes.data);
          localStorage.setItem("user", JSON.stringify(profileRes.data))
          navigate('/dashboard');
        })
        .catch(err => {
          if (err.response && err.response.status === 403) {
            console.log("Session expired. Please log in again.");
            navigate("/login");
          } else {
            console.log("Profile fetch failed.");
          }
        });

      } catch (err) {
        toast.error("Login failed: " + (err.response?.data || err.message));
      }
  };

  return (
    <>
     
    <div className="form-page">
      <div className="login-card">
        <h2>Login</h2>
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col md={12}>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
                <p className="text-center mt-2 mb-0">
                Don’t have an account?{" "}
                <Link to="/register" className="text-muted">
                  Register here
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    
    </>
   
  );
}

export default Login;