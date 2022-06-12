const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


const app = express();
app.use(express.json());
app.use(cors());



const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'alt_f4_irl',
      password : '',
      database : 'face-reco'
    }
});

app.get("/", (req, res) => res.json("success"));
app.get("/profile/:id", (req, res) => {profile.handleProfile(req, res, db)});

app.post("/signin", (req, res) => {signin.handleSignin(req, res, bcrypt, db)});
app.post("/register", (req, res) => {register.handleRegister(req, res, bcrypt, db)});
app.post("/imageUrl", (req, res) => {image.handleApiCall(req, res)});


app.put("/image", (req, res) => {image.handleImage(req, res, db)});



app.listen(3000, ()=>{
    console.log('yo mama fat');
});