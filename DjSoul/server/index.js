require('dotenv').config();
require("express-async-errors");
const express=require('express');
const cors=require("cors");
const Joi = require("@hapi/joi");
const app=express();
const userRoutes=require("./routes/user");
const authRoutes=require('./routes/auth');
const port=process.env.PORT||2323;
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/Djsoul-app')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

app.use(cors()); 
app.use(express.json());
app.use("/api/user",userRoutes);   
app.use('/api/login',authRoutes);   

app.get("/",(req,res)=>{
    res.send("hiiii");
})

app.listen(process.env.PORT || 2323, () => {
    console.log("Server started at 2323");
})