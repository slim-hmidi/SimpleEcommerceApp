const { hashSync } = require('bcrypt');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
// Monck mongodb Models
require('sinon-mongoose');

const User = require('../../models/User');

describe('Unit Tests', () => {
  describe('Users', () => {
    describe('GET users', () => {
      it('should return an empty list', (done) => {
        const UserMock = sinon.mock(User);
        const expectedResult = []
        UserMock.expects('find').yields(null, expectedResult);
        User.find((error, documents) => {
          if (error) done(error)
          UserMock.verify();
          UserMock.restore();
          expect(documents.length).to.equal(0);
          done();
        })
      })
      it('should return a user list', (done) => {
        const UserMock = sinon.mock(User);
        const expectedResult = [{
          _id: mongoose.Types.ObjectId(),
          login: 'user 1',
          password: hashSync('passwordUser123', 10)
        },
        {
          _id: mongoose.Types.ObjectId(),
          login: 'user 2',
          password: hashSync('passwordUser34520', 10)
        }]
        UserMock.expects('find').yields(null, expectedResult);
        User.find((error, documents) => {
          if (error) done(error)
          UserMock.verify();
          UserMock.restore();
          expect(documents.length).to.equal(2);
          done();
        })
      })

      it('should return a given user', (done) => {
        const UserMock = sinon.mock(User);
        const id = mongoose.Types.ObjectId();
        const expectedResult = {
          _id: id,
          login: 'user 1',
          password: hashSync('passwordUser123', 10)
        }
        UserMock.expects('findOne').withArgs(id).yields(null, expectedResult);
        User.findOne(id, (error, document) => {
          if (error) done(error)
          UserMock.verify();
          UserMock.restore();
          expect(document.login).to.equal(expectedResult.login);
          done();
        })
      })
    })

    describe('Create user', () => {
      it('Should create a user successfully', (done) => {
        const userToCreate = {
          login: 'user 1',
          password: hashSync('pass@123', 10)
        }
        const UserMock = sinon.mock(new User(userToCreate));
        const user = UserMock.object;
        const expectedResult = user
        UserMock.expects('save').yields(null, expectedResult);
        user.save((error, doc) => {
          if (error) done(error)
          UserMock.verify();
          UserMock.restore();
          expect(doc.name).to.equal(userToCreate.name);
          done();
        })
      })

      it('Should returns an error when a user property is missed', (done) => {
        const userToCreate = {
          login: 'user 1'
        }
        const UserMock = sinon.mock(new User(userToCreate));
        const user = UserMock.object;
        const expectedResult = 'Password is required'
        UserMock.expects('save').yields(null, expectedResult);
        user.save((error, document) => {
          if (error) done(error)
          UserMock.verify();
          UserMock.restore();
          expect(document).to.equal('Password is required');
          done();
        })
      })
    })
  })
})