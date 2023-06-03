import React, { useState, useEffect } from 'react';

import { Form,Card ,Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const QuestionCategory = () => {
  const history = useHistory()
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("");
  const [qNo, setQNo] = useState(0);
  const [email, setEmail] = useState(history.location.state)

  //<----------------------------
  // fetching data from database
  //---------------------------->

  const fetchQuestionCategories = async () => {
    const { data } = await axios.get('http://localhost:3001/catagory')
    setCats(data)
    console.log(data)


  };
  useEffect(() => {
    fetchQuestionCategories();
  }, []);

  const submitHandler = () => {
    if (
      cat === undefined ||
      cat === '' ||
      cat === 'Select Subject'

    ) {
      alert(' Please give proper input !');
    } else {

      history.push(
        {
          pathname: '/q',
          state: cat,
          email: email

        }
      );
    }
  };

  return (
    <div className="catagory-selection">
          <Card className='catagoy-card '>
         <Card.Title>Select</Card.Title>
     <Card.Body className="d-grid gap-2">
       <Form.Select aria-label="Default select example" onChange={e => setCat(e.target.value)}>
        <option>Select Subject</option>
         {
         cats.map((c) => {
          return <option>{c.catagory}</option>
         })
         }
       </Form.Select>

      <Button  variant="outline-primary "  type='submit'  onClick={submitHandler}>Submit</Button>
     </Card.Body>
     </Card>
  
  {/* <Card className="catagoy-card" >
        <CardHeader
          title='Select Catagory'
          titleTypographyProps={{ variant: 'h4' }}
          style={{
            textAlign: 'center',
            backgroundColor: 'silver',
            color: 'black',
          }}
        ></CardHeader>
        <CardContent>
          <FormControl fullWidth variant='outlined'>
            <InputLabel id="demo-simple-select-label">select catagory</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={e => setCat(e.target.value)}
            >
              {
                cats.map((h) => {
                  return <MenuItem value={h}>{h}</MenuItem>
                })
              }


            </Select>
          </FormControl>




          <Button
            variant="outlined"
            className='button-submit'
            style={{ fontSize: '25px', marginTop: '20px' }}
            color='primary'
            onClick={submitHandler}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
      */}
    </div>
  );
};

export default QuestionCategory;
