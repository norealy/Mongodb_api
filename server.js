require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User.model');
const port = process.env.PORT || 2000;
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let uri = 'mongodb+srv://local:local@xdatgd.hx1qo.mongodb.net/Mongodb_app?retryWrites=true&w=majority'
mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true, useFindAndModify: false,useCreateIndex: true},err=>{
  if(err){
    console.log("error : ",err);
  }else{
    console.log("Connect to mongodb success ! : ");
  }
});

app.get('/', (req, res) => {
  res.send("Client run !");
});

app.get('/user-list', async(req, res) => {
  let arrayUser = await User.find();
  res.send(arrayUser)
});

app.post('/user-add', async(req, res) => {
  let usrInfo = req.body ;
  console.log(usrInfo.name)
  let newUser = await User.createAndSaveUser(usrInfo);
  res.send(newUser)
});

app.post('/user-add-list', async(req, res) => {
  let usrInfo = req.body ;
  let newArrUser = await User.createManyUser(usrInfo);
  return res.send(newArrUser)
});

app.delete('/user-delete/id', async(req, res) => {
  if(req.body.id){
    let users = await User.removeById(req.body.id);
    res.send(users)
  }else{
    req.send("Not remove id empty !")
  }
});

app.delete('/user-delete/users', async(req, res) => {
  if(req.body.name){
    let users = await User.removeManyUser(req.body.name);
    res.send(users)
  }else{
    req.send("Not remove id empty !")
  }
});
app.put('/user-update/name', async(req, res) => {
  let usrInfo = req.body ;
  let userUpdate = await User.findAndUpdateName(usrInfo);
  res.send(userUpdate)
});

app.patch('/user-update/password', async(req, res) => {
  let usrInfo = req.body ;
  let userUpdate = await User.findAndUpdatePassword(usrInfo);
  res.send(userUpdate)
});


app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

