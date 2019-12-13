process.env.NODE_ENV = 'test';
const chai = require('chai');
const mongoose = require('mongoose');
const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../../app');
const User = require('../../models/User');

chai.use(chaiHttp);

describe('Integration Tests', () => {
  describe('Users', () => {
    beforeEach((done) => {
      User.deleteMany({}, (error) => {
        if (error) done(error);
        done();
      });
    });

    describe('Post /users', () => {
      it('Should create a new user', (done) => {
        const newUser = {
          login: 'user 1',
          password: 'user@pass123'
        };
        chai.request(app)
          .post('/users')
          .send(newUser)
          .end((error, res) => {
            if (error) done(error);
            expect(res.statusCode).to.equal(201);
            expect(res.body.name).to.equal('user 1');
            done();
          });
      });

      it('Should returns an error when the user already exists', (done) => {
        const newUser = {
          login: 'user 1',
          password: 'pass@pass2019'
        };
        User.create(newUser, (err, user) => {
          chai.request(app)
            .post('/users')
            .send(newUser)
            .end((error, res) => {
              if (error) done(error);
              expect(res.statusCode).to.equal(400);
              expect(res.error.text).to.includes('User already exists')
              done();
            });
        })
      });
    });

  })

})
