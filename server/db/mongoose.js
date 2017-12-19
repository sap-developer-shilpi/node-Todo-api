var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // used to make it mongoose use Promise
mongoose.connect('mongodb://shilpi:shilpi@ds161136.mlab.com:61136/todo-app-api');
// mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
// the above export is same as  { mongoose: mongoose};
