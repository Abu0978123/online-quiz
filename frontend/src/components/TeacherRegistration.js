import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const TeacherRegistration = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [message,setMessage] = useState('')
    const history = useHistory()

    const registerTeacher = async (e) => {
        e.preventDefault();
       try{
        const {data} = await axios.post('http://localhost:3001/teacher/register',{
            name:name,
            email:email,
            password:password
        })
        setMessage(data)
        
       }
       catch(err){
           console.log(err)
       }
       history.push({
           pathname:'/'
       })

    }

  return (
    <div>
        <h1>Teacher Registration</h1>
            {message && alert(message)}

            <form className="ui form " onSubmit={(e) => registerTeacher(e)}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="name..."
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="email..."
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        required
                        placeholder="password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="ui button primary" type="submit" >register</button>
            </form>






        

    </div>
  )
}

export default TeacherRegistration