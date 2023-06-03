import React from 'react'
import { Button,Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'
const MainDiv = () => {
  const history = useHistory()
    const loginHandler = () => {
        history.push({
            pathname:'/student/login'
        })
    }
    const signUpHandler = () => {
      history.push({
          pathname:'/student/register'
      })
  }
  return (
    <div className='home-div'>
      <div className='home-div-headings'>
        <h1>ONLINE QUIZ</h1>
        <p>here we provide the best react app website for multiple choice questions of different subjects</p>
        <Button variant="outline-warning" size='lg' onClick={loginHandler}>login</Button>{' '}
          <span>or </span>
        <Button variant="outline-warning" size='lg' onClick={signUpHandler}>Sign up</Button>{' '}

      </div>
    </div>
  )
}

export default MainDiv