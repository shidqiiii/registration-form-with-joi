import Joi from 'joi';
import React, { useState } from 'react';
import { Card, Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import './App.css';

function App() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: ""
  });

  const [formValidation, setFormValidation] = useState({
    firstName: false,
    lastName: false,
    emailAddress: false,
    phoneNumber: false
  });

  const [finalStatus, setFinalStatus] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);

  // HandleChange
  const handleChange = (target, value) => {
    setData({
      ...data,
      [target]: value
    })
    setFormValidation({
      ...formValidation,
      [target]: false
    })
  }

  // Schema & Validation
  const schema = Joi.object().keys({
    firstName: Joi.string().min(5).regex(/^[a-zA-Z]+$/).required(),
    lastName: Joi.string().min(5).regex(/^[a-zA-Z]+$/).required(),
    emailAddress: Joi.string().email({ tlds: { allow: false } }).regex(/^[a-zA-Z]/).required(),
    phoneNumber: Joi.string().min(8).max(15).regex(/^08[1-9][0-9]{4}/).required()
  })

  // schema.validate(data, {
  //   abortEarly: false,
  // })

  const validationJoi = () => {
    let result = false;
    try {
      const validation = schema.validate(data, {
        abortEarly: false,
      });
      if (validation.error) {
        let newValidationStatus = {};

        Array(...validation.error.details).map((e) => {
          // console.log(e.context.key);
          newValidationStatus[e.context.key] = true;
        });
        setFormValidation({
          ...formValidation,
          ...newValidationStatus,
        });
      } else {
        result = true;
      }
    } catch (error) {
      console.log("error", error);
    }
    console.log(result);
    return result;
  };


  // HandleSubmit
  const handleSubmit = () => {
    // validationJoi()
    if (validationJoi()) {
      setFinalStatus(true);
    } else {
      setFinalStatus(false);
    }
    setisSubmit(true);
  }

  return (
    <Container className='mt-5'>
      <Card style={{ maxWidth: "70%" }} className='mx-auto'>
        <Card.Body>
          <Form className='p-3'
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}>
            <Card.Title className='text-center mb-3'>Form Alumni</Card.Title>
            <Row>
              <Col md={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={data.firstName}
                    isInvalid={formValidation.firstName}
                    onChange={(event) => { handleChange("firstName", event.target.value) }} />
                  <Form.Control.Feedback type={"invalid"}>
                    First Name harus diisi dengan benar
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={data.lastName}
                    isInvalid={formValidation.lastName}
                    onChange={(event) => { handleChange("lastName", event.target.value) }} />
                  <Form.Control.Feedback type={"invalid"}>
                    Last Name harus diisi dengan benar
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={data.emailAddress}
                isInvalid={formValidation.emailAddress}
                onChange={(event) => { handleChange("emailAddress", event.target.value) }} />
              <Form.Control.Feedback type={"invalid"}>
                Email harus diisi dengan benar
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                value={data.phoneNumber}
                isInvalid={formValidation.phoneNumber}
                onChange={(event) => { handleChange("phoneNumber", event.target.value) }} />
              <Form.Control.Feedback type={"invalid"}>
                Nomor Telepon harus diisi dengan benar
              </Form.Control.Feedback>
            </Form.Group>
            <Alert
              hidden={isSubmit ? false : true}
              variant={finalStatus ? "success" : "danger"}
            >
              {finalStatus
                ? "Berhasil didaftarkan!"
                : "Gagal, silahkan cek data Anda!"}
            </Alert>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
