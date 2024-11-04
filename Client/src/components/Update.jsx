import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Update() {
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: null,
        price: ""
    })

    const [error,setError] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2];

    console.log(location.pathname.split("/")[2]);

    const handleChange = (e) => {
        setBook( (prev) => (
            { ...prev, [e.target.name]: e.target.value}
        ))
    } 

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/books/${bookId}`, book);
            navigate('/');
        }
        catch(err) {
            console.log(err);
            setError(true);
        }
        
        
    }

  return (
    <div>
        <div className="form">
            <h1>Update the book</h1> 
            <input type="text" placeholder="title" onChange={handleChange} name="title" />
            <input type="text" placeholder="description" onChange={handleChange} name="description" />
            <input type="text" placeholder="cover" onChange={handleChange} name="cover" />
            <input type="number" placeholder="price" onChange={handleChange} name="price" />
            <button className="formBtn" onClick={handleClick}>
                Update
            </button>
            {error && "Something went wrong!"}
           <Link to="/">See all books</Link>
        </div>
    </div>
  )
}

export default Update;


