import React from 'react'
import { useState } from 'react';
import { Card,Form,Button } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const DBtime = () => {

  const [time, setTime] = useState('');


  const handleChangeTime = (e) => {
    if (e.target.name === "time") {
        setTime(e.target.value)
    }

}

const addTime = async (e) => {
    e.preventDefault();
    try {
        await localStorage.setItem('time', time)

        toast(`time added successfully !!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
    }
    catch (err) {
        console.log(err)
    }
}
  return (
    <div id="timer">
         <Card style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Title><h1>Add Time</h1></Card.Title>
                    <Form>
                        
                        
                        <input
                            type="datetime-local"
                            name="time"
                            placeholder="add time here"
                            value={time}
                            onChange={(e) => handleChangeTime(e)}
                        />
                        <Button variant="primary" type='submit' onClick={e => addTime(e)} style={{float:'right'}}>Add Time</Button>
                    </Form>
                </Card.Body>
            </Card>
            <ToastContainer 
           position="top-right"
           autoClose={2000}
           hideProgressBar
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover={false}
            />
    </div>
  )
}

export default DBtime