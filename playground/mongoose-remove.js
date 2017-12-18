var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove (fetches data by object)
// Todo.findOneAndRemove({text: "learning node"}).then((todo) => {
//   console.log(todo);
// });

//Todo.findByIdAndRemove ( fetch data as string and takes only id)
// Todo.findByIdAndRemove('5a381694fd6605d7fecfab59').then((todo) => {
//   console.log("id is 5a381694fd6605d7fecfab59");
//   console.log(todo);
// });
