import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const AddArticle = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [details, setDetails] = useState("");


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


        const sendData =(e) => {
            e.preventDefault();

            axios.post('http://localhost:3001/article',{
                title:title,
                author:author,
                details:details
            })

        }

       


    return (
        <div>

            <form onSubmit={(e) => sendData(e)} >
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
                <button type='submit'>add article</button>
            </form>



        </div>
    )
}

export default AddArticle