import React, { useState } from 'react';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: ""
  });

  // HandleChange
  const handleChange = (target, value) => {
    setData({
      ...data,
      [target]: value
    })
  }


  // Schema & Validation
  // HandleSubmit
  return (
    <Container className='mt-5'>
      <Card style={{ maxWidth: "70%" }} className='mx-auto'>
        <Card.Body>
          <Form className='p-3'>
            <Card.Title className='text-center mb-3'>Form Alumni</Card.Title>
            <Row>
              <Col md={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    onChange={(event) => { handleChange("firstname", event.target.value) }} />
                </Form.Group>
              </Col>
              <Col md={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    onChange={(event) => { handleChange("lastname", event.target.value) }} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                onChange={(event) => { handleChange("email", event.target.value) }} />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                onChange={(event) => { handleChange("phone", event.target.value) }} />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
