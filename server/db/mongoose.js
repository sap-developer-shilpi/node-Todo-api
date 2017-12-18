var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // used to make it mongoose use Promise
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
// the above export is same as : { mongoose: mongoose};