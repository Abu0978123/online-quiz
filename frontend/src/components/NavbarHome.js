import React from 'react'
import { Navbar,Nav,Container } from 'react-bootstrap'
import { useHistory } from 'react-router'

const NavbarHome = (props) => {
const history = useHistory()
    const loginHandler = () => {
        history.push({
            pathname:'/student/login'
        })
    }
    const adminHandler = () => {
        history.push({
            pathname:'/teacher/login'
        })
    }
  return (
    <div>
         <Navbar collapseOnSelect expand="lg"  variant="dark" style={{backgroundColor:'black'}} >
        <Container>
          <Navbar.Brand href="/">Online Quiz</Navbar.Brand>

          
             <Nav>
              <Nav.Link eventKey={2} onClick={e => adminHandler()} >
                Teacher Login
              </Nav.Link>
            </Nav>

          

        </Container>
      </Navbar>

    </div>
  )
}

export default NavbarHome