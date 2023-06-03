import React from 'react'
import axios from 'axios'

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditArticle = () => {

    const history = useHistory();
    const [title, setTitle] = useState(history.location.state.title);
    const [author, setAuthor] = useState(history.location.state.author);
    const [details, setDetails] = useState(history.location.state.details);
    const [id,detID]=useState(history.location.state._id)
 

    const handleChange = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)

        }
        else if (e.target.name === "author") {
            setAuthor(e.target.value)
        }
        else if (e.target.name === "details") {
            setDetails(e.target.value)
        }
    }

    const update = async (e) => {
        e.preventDefault();

      try{
          const updated =  await axios.patch('http://localhost:3001/article/'+id,{
              title:title
          })
       alert(title + "updated..")

      }
      catch(error){
          console.log(error)
      }
    }
      


  return (
    <div>
        <form onSubmit={e => update(e)} >
                <label>title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="title..."
                    value={title}
                    onChange={(e) => handleChange(e)}
                />
                <label>author</label>
                <input
                    type="text"
                    name="author"
                    value={author}
                    placeholder="author..."
                    onChange={(e) => handleChange(e)}
                />
                <label>details</label>
                <input
                    type="text"
                    name="details"
                    value={details}
                    placeholder="details..."
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit'>update</button>
            </form>
    </div>
  )
}

export default EditArticle