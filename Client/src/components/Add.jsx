import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Add() {
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: null,
        price: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook( (prev) => (
            { ...prev, [e.target.name]: e.target.value}
        ))
    } 

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/books", book);
            navigate('/');
        }
        catch(err) {
            console.log(err);
        }
        
        
    }

  return (
    <div>
        <div className="form">
            <h1>Add new book</h1> 
            <input type="text" placeholder="title" onChange={handleChange} name="title" />
            <input type="text" placeholder="description" onChange={handleChange} name="description" />
            <input type="text" placeholder="cover" onChange={handleChange} name="cover" />
            <input type="number" placeholder="price" onChange={handleChange} name="price" />
            <button className="formBtn" onClick={handleClick}>
                Add
            </button>
        </div>
    </div>
  )
}

export default Add