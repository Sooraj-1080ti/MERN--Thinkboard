import express from "express";
import notesroutes from "./routes/notesroutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

import cors from "cors";
//const express = require("express"); used instead of import but by adding type=module to json we can use it

dotenv.config();

const app = express();
const PORT=process.env.PORT || 5001;
const __dirname = path.resolve();

// connectDB(); we dont open server first before connecting db in real life

//middleware
if(process.env.NODE_ENV !== "production") {
app.use(cors(
    {
        origin: "http://localhost:5173",
    }
));//to avoid cors error from frontend to backend
};
app.use(express.json());//enables access to req.body

app.use(rateLimiter);

//understand middleware, somthing working after req and before res
// app.use((req, res, next) =>
// {
//     console.log(`req method is ${req.method} & req url is ${req.url}`);
//     next();
// });//used for auth check and rate limiting(429 status code for too many req)

app.use("/api/notes",notesroutes);
if(process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../frontend/dist")));//to serve frontend files from dist folder

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));//to serve index.html for any route not found in backend
});};
// app.get("/api/notes", (req,res) => { //req and res can be any name just two methods
//     res.status(200).send("You got 30 notes");//to get notes, successfull op code 200
// });// get, post, put and delete req available

// app.post("/api/notes", (req,res) => {
//     res.status(201).json({message:"Note created successfully!"});//to create note, creation status code is 201
// });

// app.put("/api/notes/:id",(req,res) =>{
//     res.status(200).json({message:"Note updated succesfully!"});//to update note, success process code is 200
// })//id to know which note to be updated

// app.delete("/api/notes/:id",(req,res) =>{
//     res.status(200).json({message:"Note deleted succesfully!"});//to delete note, success process code is 200
// })//id to know which note to be deleted

connectDB().then(() => {
app.listen(PORT, () =>{
    console.log("Server started on PORT: ",PORT);
})
});
// use node server.js or npm run dev when dev added to json package
// install nodemon for dynamic updates without killing terminal

//mongodb+srv://soorajsureshin_db_user:Sooraj@123@cluster0.tgqaipi.mongodb.net/?appName=Cluster0