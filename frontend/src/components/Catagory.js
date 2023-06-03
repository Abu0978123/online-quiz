
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router'

const Catagory = () => {

  const history = useHistory()

  const [cats, setCats] = useState([])
  const [cat, setCat] = useState();
  const [email, setEmail] = useState(history.location.state)

  const getCat = async () => {
    const { data } = await axios.get('http://localhost:3001/addQuestion')
    setCats(data.map((c) => {
      return c.catagory
    }))

  }
  useEffect(() => {

    getCat()

  }, [])

  //send this catagory to main quiz
  const sendCat = async () => {
    if (cat === 0 || cat === '' || cat === undefined) {
      alert('please select proper catagory')
      return false
    }
    else {

      history.push({
        pathname: '/quiz',
        state: cat,
        email: email
      })
    }



  }


  return (
    <div>

      <Card style={{ width: '18rem' }}>
        <Card.Title>Select</Card.Title>
        <Card.Body>
          <Form.Select aria-label="Default select example" onChange={e => setCat(e.target.value)}>

            {
              cats.map((c) => {
                return <option>{c}</option>
              })
            }
            <Button variant="outline-primary" type='submit'>Primary</Button>{' '}

          </Form.Select>

          <Button variant="primary" type='submit' onClick={e => sendCat()}>Select</Button>
        </Card.Body>
      </Card>





    </div>
  )
}

export default Catagory