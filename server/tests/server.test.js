var expect = require('expect');
var request = require('supertest');

var {ObjectID} = require('mongodb');
var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: "first test text"
}, {
    _id: new ObjectID(),
  text: "Secong test text",
  completed: true,
  completedAt: 45678
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
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET / todos/:id', () => {
  it('should return a todo with given id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 id todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });
  it('should return a 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todo/:id', () => {

  it('should delete a todo with a given id', (done) => {
  var hexId = todos[0]._id.toHexString();
     request(app)
      .delete(`/todos/${hexId}`)
       .expect(200)
        .expect((res) => {
           expect(res.body.todo._id).toBe(hexId);
         })
         .end((err,res) => {
             if(err){
               return done(err);
             }
           Todo.findById(hexId).then((todo) =>{
             expect(todo).toBeNull();
             done();
           }).catch((e) => done(e));
         });
      });

  it('should return a 404 id todo not found', (done) => {
    request(app)
     .delete(`/todo/${new ObjectID().toHexString()}`)
     .expect(404)
     .end(done);
  });


  it('should return a 404 for non-object ids', (done) => {
    request(app)
     .delete('/todo/123')
     .expect(404)
     .end(done);
  });

});
describe('PATCH /todos/:id', () => {
      it('should update the todo', (done) => {
        var hexid = todos[0]._id.toHexString();
        var text = "this should be new text";
        request(app)
             .patch(`/todos/${hexid}`)
             .send({completed: true, text: text})
             .expect(200)
             .expect((res) => {
               expect(res.body.todo.text).toBe(text);
               expect(res.body.todo.completed).toBe(true);
               expect(typeof(res.body.todo.completedAt)).toBe('number');
             }).end(done);
        });


    it('should clear completedAt when todo is not completed', (done) => {
      var hexid = todos[1]._id.toHexString();
       request(app)
           .patch(`/todos/${hexid}`)
           .send({completed: false})
           .expect(200)
           .expect((res) => {
             expect(res.body.todo.completed).toBe(false);
             expect(res.body.todo.completedAt).toBe(null);
           }).end(done);
      });
});
