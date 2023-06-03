import React from 'react'
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap'

const Result = () => {
    const history = useHistory();
    const [allOptions, setAllOptions] = useState(history.location.state);
    const [score, setScore] = useState([]);
    const arrayshift = allOptions.shift()
        

    
    
    
    useEffect(() => {
        const getScore = async () => {
            
            
            
            try {
                const { data } = await axios.get('http://localhost:3001/score')
                setScore(data)
               
            }
            catch (err) {
                console.log(err)
            }

        }
        getScore();



    }, [])




    return (
        <div>
            <Card style={{ width: '50rem' }}>
                
                <Card.Body>
                    <Card.Title>Result card</Card.Title>

                
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Result