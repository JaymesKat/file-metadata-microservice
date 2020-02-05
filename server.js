"use strict";

const express = require("express");
const cors = require("cors");

// require and use "multer"...
const multer = require("multer");

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

var upload = multer();

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post("/api/fileanalyse", upload.single('upfile'), function(req, res) {

  if(!req.file){
    res.status(400).send('No file specified')
  }
  
  const { file } = req;

  const resData = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };
  res.json(resData);
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
