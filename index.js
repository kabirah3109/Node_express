// const express = require("express")
// const app = express()

// app.use(express.static(__dirname + "/public"))
// const requireTime =(req,res,next)=>{
//     var currentDate = new Date();
//     var hours = currentDate.getHours();
//     var minutes = currentDate.getMinutes();
//     var seconds = currentDate.getSeconds();
//     req.requireTime = hours +", "+minutes+", "+seconds;

// }

// app.use(requireTime)
// app.get("/time",(req,res)=>{
//     let words = "Hello world <br>"
//     words +=`<p>The Time is : ${req.requireTime}</p>`;
//     res.send(words)
// })

// app.get("/",(req, res)=>{
//     res.sendfile(__dirname + "/index.html")

// })

// app.get("/api",(req,res)=>{
//     fetch()
// })
// app.listen(3000,()=>{
//     console.log("server is running")
// })

import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.static("./public"));

const requireTime = (req, res, next) => {
  const now = new Date();
  req.requireTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  next();
};

app.use(requireTime);
app.get("/home", (req, res) => {
  res.sendFile("./index.html",);
});

app.get("/time", (req, res) => {
  res.send(`

       <!DOCTYPE html>
    <html>
    <head><title>Server Time</title></head>
    <body>
      <h1>Hello world</h1>
      <p>The Time is: ${req.requireTime}</p>
      <p><a href="/home">Go Home</a></p>
    </body>
    </html>
  `);
});

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: "." });
});

app.get("/api", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
