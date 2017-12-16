
var {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log("unable to connect the Mongodb server");
  }
  // console.log("conected to the Mongodb server");
  // db.collection('Todos').find({_id: new ObjectID("5a35914f0bbb5220b0e120f8")}).toArray().then((docs) =>{
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err) => {
  //   console.log("unable to fetch data", err);
  // })
  // console.log("conected to the Mongodb server");
  // db.collection('Todos').find().count().then((count) =>{
  //   console.log(`Todos count:${count}`);
  // },(err) => {
  //   console.log("unable to fetch data", err);
  // })
   db.collection('Users').find({name : "shilpi"}).toArray().then((docs) => {
     console.log("Users with name shilpi");
     console.log(JSON.stringify(docs, undefined, 2));
   }, (err) => {
     console.log("unable to fetch the database", err);
   })
  // db.close();
});
