
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { Navbar,Nav,Container } from 'react-bootstrap'



const NavbarDashboard = () => {
    const history = useHistory()
    useEffect (()=>{
        // window.history.pushState(null, document.title, window.location.href);
        // window.addEventListener('popstate', function (event){
        //     window.history.pushState(null, document.title,  window.location.href);
        // });
    })

    const logout = () => {
        localStorage.setItem('token',null)
        history.push({
            pathname:'/'
        })
    }

    return (
       <div>
           <Navbar collapseOnSelect expand="lg"  variant="dark" style={{backgroundColor:'black'}} >
        <Container>
          <Navbar.Brand href="/">Teacher Administration Pannel</Navbar.Brand>

          
             <Nav>
              <Nav.Link eventKey={2} onClick={e => logout()} >
                Logout
              </Nav.Link>
            </Nav>

          

        </Container>
      </Navbar>
       </div>
    )
}

export default NavbarDashboard