
var {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log("unable to connect the Mongodb server");
  }
  // db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('5a359d9b0bbb5220b0e124dc')},{
  //   $set: {
  //     completed : true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log("Unable to update", err);
  // });

  // db.collection('Users').findOneAndUpdate({name: "shilpi"},{
  //   $set: {
  //     name: "raman"
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log("Unable to update", err);
  // });

  db.collection('Users').findOneAndUpdate({name: "raman"},{
    $inc: {
      age: -5
    },
    $set: {
      name: "shilpi"
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log("Unable to update", err);
  });
  // db.close();
});
