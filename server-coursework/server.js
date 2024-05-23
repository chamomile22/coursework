const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const HttpError = require("./HttpError");

const { exec } = require('child_process');

const app = express();
const port = 3001;
const connectUrl = 'mongodb://yanaibabak:h62B7BtPJ77reuT8>@cluster0.jcntvne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let db;

app.use(cors());
app.use(express.json());

mongoose.connect(connectUrl)

app.get('/users',
  async (req, res) => {
    try {
      const users = await db.collection('users').find().toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
)

app.post('/user',
  async (req, res) => {
    try {
      const user = await db.collection('users').insertOne(req.body);
      console.log(1, user)
      res.status(200).json("User added successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
)

app.put('/user/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.collection('users').updateOne({_id: id}, { $set: req.body });
      console.log(user)
      res.status(200).json("User updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
)

app.patch('/user/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.collection('users').updateOne({_id: id}, {$set: {password: req.body}});
      res.status(200).json("Password was updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
)

app.post('/save-db', (req, res) => {
    const {pathToSaveDB} = req.body
    exec(`"D:\\Users\\yanai\\OneDrive\\Documents\\Yana\\Універ\\БД\\server-coursework\\backup.bat" "${pathToSaveDB}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    
    res.json('Success')
});