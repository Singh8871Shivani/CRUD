const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shivani@123",
    database: "test"
})

app.get("/", (req,res)=>{
    res.json("hello this is backend");
})

// IF THERE IS A AUTH PROBLEM
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Shivani@123'; FLUSH PRIVILEGES;

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err,data)=>{
       if(err) return res.json(err);
       return res.json(data);
    })
})

// app.post("/books", (req,res)=>{
//     const q = "INSERT INTO books (`TITLE`, `DESCRIPTION`, `COVER`, `PRICE`) VALUES (?)";
//     const values =['title from backend', 'decsription from backend', 'coverBackend.img', '200'];

//     db.query(q, [values], (err,data)=>{
//        if(err) return res.json(err);
//        return res.json(data);
//     }) 
// })

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`TITLE`, `DESCRIPTION`, `COVER`, `PRICE`) VALUES (?)";
    const values =[
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [values], (err,data)=>{
       if(err) return res.json(err);
       return res.json("Book has been created successfully.");
    }) 
})

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE ID = ? ";

    db.query(q, [bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully.")
    })
})

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `TITLE`=?, `DESCRIPTION`=?, `COVER`=?, `PRICE`=? WHERE ID=?"
    const values =[
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [...values, bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully.")
    })
})


app.listen(8000, ()=>{
    console.log("Connected to backend");
})