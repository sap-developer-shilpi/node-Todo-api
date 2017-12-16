
var {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log("unable to connect the Mongodb server");
  }
  //deleteMany
  // db.collection('Todos').deleteMany({text: "make food"}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log("unable to delete", err);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({text: "make food"}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log("unable to delete", err);
  // });
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log("unable to delete", err);
  // });
  // deleteMany on users
  // db.collection('Users').deleteMany({name: "shilpi"}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log("unable to delete from the users", err);
  // });
  // findOneAndDelete on Users
  db.collection('Users').findOneAndDelete({ _id: new ObjectID("5a35889f9b4b444584851219")})
  .then((result) => {
      console.log(result);
    }, (err) => {
     console.log("unable to delete from the users", err);
    });
  // db.close();
});
