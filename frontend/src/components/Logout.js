import React from 'react'
import { useHistory } from 'react-router'

const Logout = () => {

    const history = useHistory();
    localStorage.setItem('token',null)
    history.push({
        pathname:'/'
    })

  return (
    <div>
        
        
         </div>
  )
}

export default Logout