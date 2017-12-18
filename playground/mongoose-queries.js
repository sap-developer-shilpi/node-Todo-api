var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var uid = '5a3681e9a05366640747026d';

User.findById(uid).then((user) => {
  if(!user){
  return  console.log("User Id doesnot exists");
  }
  console.log(JSON.stringify(user, undefined, 2));
},(e) => {
  console.log(e);
});

// var id = '5a379c3b4af01e3c4d8b14b5';
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos ', todos);
// });
//
// Todo.findOne({
//   completed: false
// }).then((todo) => {
//   console.log('Todo ', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log("Id doesnot Exists");
//   }
//   console.log('Todo by id ', todo);
// }).catch((e) => {
//   console.log(e);
// });
