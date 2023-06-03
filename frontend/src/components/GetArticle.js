import React from 'react'
import axios from 'axios'

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const GetArticle = () => {
    const [article, setArticle] = useState([])
    const [row, setRow] = useState(undefined)
    const [token, setToken] = useState('');
    const history = useHistory();

    useEffect(() => {

        const getData = async () => {
            try {
                setToken(localStorage.getItem('token'))
                const { data } = await axios.get("http://localhost:3001/article", {
                    headers: {
                        token: token
                    }
                })
                setArticle(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getData();
    }, [article, token])

    const handleDelete = async (id) => {
        try {

            const deletedArticle = await axios.delete('http://localhost:3001/article/' + id)
            if (deletedArticle) {
                alert(`deleted ${deletedArticle.data.title} successfully....`)
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    const handleEdit = (row) => {

        history.push({
            pathname: '/edit',
            state: row
        })

    }

    return (
        <div>
            <table className="ui celled table">
                <thead>
                    <tr><th>title</th>
                        <th>author</th>
                        <th>details</th>
                        <th>Actions</th>
                    </tr></thead>
                <tbody>
                    {
                        article.length === 0 ? <tr><td>no article found</td></tr> :
                            article.map((row) => {
                                return (
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>{row.author}</td>
                                        <td>{row.details}</td>
                                        <td> <button onClick={e => handleEdit(row)}>edit</button>
                                            <button onClick={e => handleDelete(row._id)}>delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                    }

                </tbody>
            </table>

        </div>
    )
}

export default GetArticle