const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  age : Number,
  favoriteFoods: [],
 });

 const User = mongoose.model("User", userSchema,'xdatgd');

 User.createAndSaveUser = async (dataUser) => {
  let newuser = new User(dataUser);
  await newuser.save(function(err, data) {
    if (err) return console.error(err);
    console.log(data)
    return data;
  });
 };


User.createManyUser = async (arrayOfUser) => {
  await User.create(arrayOfUser, function (err, data) {
    if (err) return console.error(err);
    return data;
  });
 };


 //model.find()
 User.findUserByName = async (name) => {
  await User.find({"name": name }, function (err, arrData) {
    if (err) return console.error('Error :',err);
    return arrData;
  });
 };
 
// model.findOne()
User.findOneByage = async(age) => {
  await User.findOne({"age": age }, function (err, data) {
    if (err) return console.error(err);
    console.log("data",data)
    return data;
  });
 };

// model.findById() 
User.findById = async(personId) => {
  await User.findById(personId, function (err, data) {
    if (err) return console.error(err);
    return data;
  })
 };


 //model.findOneAndUpdate()
 User.findAndUpdateName = async (user) => {
   console.log(user)
  await User.findOneAndUpdate(
      {"_id": user.id},
      {"name": user.name},
      {new:true},
      function (err, res) {
        if(err) return console.error(err);
        return res;
  })
 };
 User.findAndUpdatePassword = async (user) => {
  console.log(user)
  await User.findOneAndUpdate(
    {"_id": user.id},
    {"password": user.password},
    {new:true},
    function (err, res) {
      if(err) return console.error(err)
      return res;
   })
 }
 //model.findByIdAndRemove()
 User.removeById = async(Id) => {
  await User.remove({"_id":Id}, function (err, res){
    if(err) return console.error(err);
   return res;
  })
 };
 // model.remove()
 User.removeManyUser = async(nameToRemove) => {
  await User.deleteMany({name: nameToRemove}, function (err, res) {
    if(err) return console.error(err);
    return res;
  })
 };

 module.exports = User