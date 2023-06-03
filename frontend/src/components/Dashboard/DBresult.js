import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';


const DBresult = () => {
  const [result, setResult] = useState([])


  useEffect(() => {
    //get all student result
    const getResult = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/score')
        setResult(data)
      }
      catch (err) {
        console.log(err)
      }
    }

    getResult();
  }, [])
  return (
    <div>
      <div class="row " id='result'>

        <Card style={{ width: '50rem' }}>
          <Card.Body>
            <Card.Title>All Results</Card.Title>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">email</th>
                    <th scope="col">result</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    result.map((r) => {
                      return (
                        <tr>
                          <td>{r.email}</td>
                          <td>{r.score}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default DBresult