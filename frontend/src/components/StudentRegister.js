import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';
import loginIcon from './images/loginUser.png'
import uiImg from './images/registration.png'

import { Button, Row, Form, Container, Col, Nav,Navbar } from 'react-bootstrap'

const StudentRegister = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const history = useHistory()

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3001/user/register', {
                name: name,
                email: email,
                password: password
            })
            setMessage(data)

        }
        catch (err) {
            console.log(err)
        }
        history.push({
            pathname: '/student/login'
        })

    }
   

    return (
        <div>
               <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Online Quiz</Navbar.Brand>


                    <Nav>
                        <Nav.Link ></Nav.Link>

                    </Nav>



                </Container>
            </Navbar>

            <Container>
                <h1 className="shadow-sm text-primary mt-5 p-3 text-center rounded">Student Registration</h1>
                {message && alert(message)}

                <Row>
                    <Col lg={4} sm={12} className="text-center mt-5 p-3">
                        <img className='icon-img' src={loginIcon} alt="icon" />
                        <Form onSubmit={(e) => registerUser(e)} >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="enter your name..."
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="email..."
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    required
                                    placeholder="password..."
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <br></br>

                            <Button variant="primary btn-block" type="submit">
                                register
                            </Button>


                        </Form>
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        <img className='w-100' src={uiImg} alt="" />

                    </Col>

                </Row>


            </Container>
























        </div>
    )
}

export default StudentRegister