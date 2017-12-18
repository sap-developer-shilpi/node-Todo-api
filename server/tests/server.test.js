var expect = require('expect');
var request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
  text: "first test text"
}, {
  text: "Secong test text"
}];

beforeEach((done)=> {
  Todo.remove({}).then(() =>{
  return  Todo.insertMany(todos);
  }).then(()=> done());
});

describe('Post /todos', () => {
  it('should create a new todo', (done) => {
     var text = "Test text todo";

     request(app)
     .post('/todos')
     .send({text})
     .expect(200)
     .expect((res) => {
       expect(res.body.text).toBe(text);
     })
     .end((err,res) => {
       if(err){
         return done(err);
       }

       Todo.find({text}).then((todos) => {
         expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
         done();
       }).catch((e) => done(e));
     });
  });
   it('should not create a new todo', (done) => {
      request(app)
      .post('/todo')
      .send({})
      .expect(404)
      .end((err,res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=> done(e));
      });
   });
});

describe('GET /todos', () => {
  it('should return all todos', (done) => {
    request(app)
    .get('/todos')
    .send({})
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});
