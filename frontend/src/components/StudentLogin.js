import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { Button, Row, Form, Container, Col, Nav } from 'react-bootstrap'

import loginIcon from './images/loginicon.png'
import uiImg from './images/teacher.png'
import NavbarHome from './NavbarHome'



const StudentLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const history = useHistory();





    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3001/user/login', {

                email: email,
                password: password
            })
            setToken(data)
            localStorage.setItem("token", data)
            history.push({
                pathname: '/cat',
                state: email
            })

        }
        catch (err) {
          
            if (err) {
                alert("email or password is incorrect!")
            }
            console.log(err)
        }

    }
    const signUpHandler = () => {
        history.push({
            pathname:'/student/register'
        })
    }


    return (
        <div className='std-login' 
    style={{backgroundColor:"white",height:'100vh'}}
    >

            <NavbarHome/>

            <Container>
                <h1 className="shadow-sm text-primary mt-5 p-3 text-center rounded ">Student Login</h1>


                <Row>
                    <Col lg={4} sm={12} className="text-center mt-5 p-3">
                        <img className='icon-img' src={loginIcon} alt="icon" />
                        <Form onSubmit={(e) => loginUser(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="email..."
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
                                Login
                            </Button>
                            
                            <Nav.Link  onClick={e => signUpHandler()} >Sign up</Nav.Link>
                        </Form>
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        <img className='w-100' src={uiImg} alt="" />

                    </Col>
                    
                </Row>
                

            </Container>


            {/* <form className="ui form " onSubmit={(e) => loginUser(e)}>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="ui button primary" type="submit">Login</button>

            </form> */}

        </div>
    )
}

export default StudentLogin