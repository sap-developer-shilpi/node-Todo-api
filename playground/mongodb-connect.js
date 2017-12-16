//var MongoClient = require('mongodb').MongoClient;
// instead of the above statement we can use ES6 destructuring
//e.g.  var user ={ name: "shilpi", age: 31 }
// we can destructure the obj user and create a nwe variable that takes the value needed
// var {name} = user; // that means name is a new var created having the same value as user.name property
var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log("unable to connect the Mongodb server");
  }
  console.log("conected to the Mongodb server");
  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err,result) => {
  //   if(err){
  //     return console.log("unable to insert todo ", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  // db.collection('Users').insertOne({
  //   name: "shilpi",
  //   age: 31,
  //   location: "Munich"
  // }, (err, result) => {
  //   if(err) {
  //     return console.log("Unable to insert into Users", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  db.close();
});
