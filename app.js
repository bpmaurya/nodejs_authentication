const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/atuhRoutes");
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser }= require('./middleware/authMiddleware')
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
//view engine
app.set("view engine", "ejs");

//database connection
const dbURI =
  "mongodb+srv://bpmaurya:pKkHaSoWohmTyjsR@cluster0.7phaq.mongodb.net/test";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//routes
app.get('*',checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothie", requireAuth, (req, res) => res.render("smoothie"));
app.use(authRoutes);

//cookies 
app.get('/set-cookies',(req,res)=>{
// res.setHeader('set-Cookie','newUser=true');
    res.cookie('newUser',false);
    res.cookie('isEmployee',true,{maxAge:1000*60*60*24,secure:true});
    res.send('you got cookies');
})
app.get('/read-cookies',(req,res)=>{

  const cookie = req.cookies;
  console.log(cookie);
  res.json(cookie);
})