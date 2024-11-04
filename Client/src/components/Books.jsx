import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link   } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([]);

    useEffect( ()=>{
      const fetchAllBooks = async ()=>{
        await axios.get('http://localhost:8000/books')
        .then( res =>{
          setBooks(res.data);
          console.log(res.data);
        })
        .catch( err=>{
          console.log(err);
        })
      }
      fetchAllBooks();
    },[])

    const handleDelete = async (id) => {
        try{
           await axios.delete(`http://localhost:8000/books/${id}`);
           window.location.reload();
        }
        catch(err) {
           console.log(err);
        }
    }

  return (
    <div>
        <h1>Mala Book Shop</h1>
        <div className="books">
            {books.map((book)=>(
                <div className="book" key={book.ID}>
                    {book.COVER && <img src={book.COVER} alt=""  />}
                    <h2>{book.TITLE}</h2>
                    <p>{book.DESCRIPTION}</p >
                    <span>${book.PRICE}</span>
                    <button className="delete" onClick={()=>handleDelete(book.ID)}>Delete</button>
                    <button className="update">
                        <Link to={`/update/${book.ID}`}>Update</Link>
                    </button>
                </div>
            ))}
        </div>
        <button className='addNewBtn'>
            <Link to='/add'>Add new book</Link>
        </button>
    </div>
  )
}

export default Books