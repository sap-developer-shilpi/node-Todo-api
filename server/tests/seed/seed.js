const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'shilpi@example.com',
  password: '123456',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
  }  , {
    _id: userTwoId,
    email: 'saanvi@example.com',
    password: '654321'
  }];

const todos = [{
  _id: new ObjectID(),
  text: "first test text"
}, {
    _id: new ObjectID(),
  text: "Secong test text",
  completed: true,
  completedAt: 45678
}];

const populateTodos = (done)=> {
  Todo.remove({}).then(() =>{
  return  Todo.insertMany(todos);
  }).then(()=> done());
};

const populateUsers =(done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
