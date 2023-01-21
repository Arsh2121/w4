/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Arshdeep Arshdeep 
    Student ID: 142292218        
     Date: 13/01/2022
*
*  Cyclic Link: _______________________________________________________________
*
********************************************************************************/

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const HTTP_PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.get("/", function (req, res) {
  res.json({ message: "API is Listening" });
});
app.post("/api/movies", async (req, res) => {
    try {
    await db.addMovie(req.body);
    res.status(200).json("New Movie is added");
    } catch (err) {
    res.status(400).json({ message: "err" });
    }
    });
    
    app.get("/api/movies", async (req, res) => {
    try {
    const data = await db.getAllMovies(req.query.page, req.query.perPage, req.query.title);
    res.status(200).json(data);
    } catch (err) {
    res.status(400).json({ message: "err" });
    }
    });
    
    app.get("/api/movies/:id", async (req, res) => {
    try {
    const data = await db.getMovieById(req.params.id);
    res.status(200).json(data);
    } catch (err) {
    res.status(400).json({ message: "err" });
    }
    });
    
    app.put("/api/movies/:id", async (req, res) => {
    try {
    await db.updateMovieById(req.body, req.body._id);
    res.status(200).json("Movie is updated");
    } catch (err) {
    res.status(400).json({ message: "err"});
    }
    });
    
    app.delete("/api/movies/:id", async (req, res) => {
    try {
    await db.deleteMovieById(req.params.id);
    res.status(200).json("Movie is deleted");
    } catch (err) {
    res.status(400).json({ message: "err" });
    }
    });

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });