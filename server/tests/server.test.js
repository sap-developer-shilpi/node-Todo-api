const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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
             expect(todo).toBeFalsy();
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

describe('GET /users/me', () => {
   it('should return user if authenticated', (done) => {
     request(app)
     .get ('/users/me')
     .set('x-auth', users[0].tokens[0].token)
     .expect(200)
     .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
     }).end(done);
   });
   it('should return 404 if not authenticated', (done) => {
    request(app)
    .get('/user/me')
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({});
    })
    .end(done());
   })
});

describe('POST /users', () => {
  const email = "raman@gmail.com" ;
  const password = "123456" ;
  it('should create a user' , (done) =>{
    request(app)
     .post('/users')
     .send({email, password})
     .expect(200)
     .expect((res) => {
       expect(res.headers['x-auth']).toBeTruthy();
       expect(res.body.email).toBe(email);
     })
     .end((err, res) => {
       if(err){
         return done(err);
       }

       User.findOne({email}).then((user) => {
         expect(user).toBeTruthy();
         done();
       }).catch((e) => done(e));
     });
  });

  it('should not create user if email in use', (done) => {
      request(app)
      .post('/users')
      .send({email: 'shilpi@example.com', password: '123456'})
      .expect(400)
      .end(done);

    });

  it('should return validation errors if any', (done) => {
    request(app)
    .post('/users')
    .send({email: "raman.g", password: "123456"})
    .expect(400)
    .end(done);
  });
})
