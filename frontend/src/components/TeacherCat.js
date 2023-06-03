import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

import { useHistory } from 'react-router'


  const TeacherCat = () => {
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

  const sendCat = async () => {

    if (cat === 0 || cat === '' || cat === undefined || cat === 'Select Subject') {
      alert('please select proper catagory')
      return false
    }
    else {

      history.push({
        pathname: '/dashboard',
        state: cat,

      })
    }
  }

  return (
    <div className="catagory-selection">

<Card className='catagoy-card'>
        <Card.Title>Select</Card.Title>
    <Card.Body className="d-grid gap-2">
      <Form.Select aria-label="Default select example" onChange={e => setCat(e.target.value)}>
      <option>Select Subject</option>
        {
          cats.map((c) => {
            return <option>{c}</option>
          })
        }
      

      </Form.Select>

      <Button variant="outline-primary" type='submit' onClick={e => sendCat()}>Go dashboard</Button>
    </Card.Body>
    </Card> 
    


    </div>
    //     <div>
    // {/*         
         



    //   <Card style={{width:'40rem',height:'20rem' }} >
    //         <CardHeader
    //           title='Select Catagory'
    //           titleTypographyProps={{ variant: 'h4' }}
    //           style={{
    //             textAlign: 'center',
    //             backgroundColor: 'silver',
    //             color: 'white',
    //           }}
    //         ></CardHeader>
    //         <CardContent style={{paddingTop:'40px'}}>
    //           <FormControl fullWidth variant='outlined'>
    //             <InputLabel id="demo-simple-select-label">select catagory</InputLabel>
    //             <Select
    //               labelId="demo-simple-select-label"
    //               id="demo-simple-select"
    //               onChange={e => setCat(e.target.value)}
    //             >
    //               {
    //                 cats.map((h) => {
    //                   return <MenuItem value={h}>{h}</MenuItem>
    //                 })
    //               }
    //             </Select>
    //           </FormControl>
    //           <Button
    //             variant="outlined"
    //             className='button-submit'
    //             style={{ fontSize: '25px', marginTop: '20px' }}
    //             color='primary'
    //             onClick={e => sendCat()}
    //           >
    //             Submit
    //           </Button>
    //         </CardContent>
    //       </Card>

    //     </div>
  )
}

export default TeacherCat