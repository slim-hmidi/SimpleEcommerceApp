process.env.NODE_ENV = 'test';
const chai = require('chai');
const mongoose = require('mongoose');
const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../../app');
const Product = require('../../models/Product');

chai.use(chaiHttp);

describe('Integration Tests', () => {
  describe('Products', () => {
    beforeEach((done) => {
      Product.deleteMany({}, (error) => {
        if (error) done(error);
        done();
      });
    });
  
    describe('Get /Products', () => {
      it('Should Return the list of products', (done) => {
        const newProduct1 = {
          name: 'product 1',
          price: 222,
          quantity: 15,
        };
  
        const newProduct2 = {
          name: 'product 2',
          price: 222,
          quantity: 150,
        };
  
        Product.insertMany(
          [newProduct1,
          newProduct2], (err, docs) => {
            chai.request(app)
            .get('/products')
            .end((error, res) => {
              if (error) done(error);
              expect(res.statusCode).to.equal(200);
              expect(res.body.length).to.equal(2);
              expect(res.body[0].name).to.equal(docs[0].name);
              expect(res.body[1].name).to.equal(docs[1].name);
              done();
            });
          })
      });
    });
    describe('Get /Product/:id', () => {
      it('Should return 400 when the id is not valid', (done) => {
        chai.request(app)
          .get('/products/1')
          .end((error, res) => {
            if (error) done(error);
            expect(res.statusCode).to.equal(400);
            done();
          });
      });
    });
  
    describe('Post /products', () => {
      it('Should create a new product', (done) => {
        const newProduct = {
          name: 'product 1',
          price: 222,
          quantity: 15,
        };
        chai.request(app)
          .post('/products')
          .send(newProduct)
          .end((error, res) => {
            if (error) done(error);
            expect(res.statusCode).to.equal(201);
            expect(res.body.name).to.equal('product 1');
            done();
          });
      });
    });
  
    describe('PUT /products/:id', () => {
      it('Should update an existant product', (done) => {
        const newProduct = {
          name: 'product 1',
          price: 222,
          quantity: 15,
        };
        const updateProduct = {
          name: 'new Product',
        }
        Product.create(newProduct, (error, product) => {
          chai.request(app)
            .put(`/products/${product._id}`)
            .send(updateProduct)
            .end((err, res) => {
              if (err) done(err);
              expect(res.statusCode).to.equal(200);
              expect(res.body.name).to.equal(updateProduct.name);
              done();
            });
        });
      });
    });
  
    describe('DELETE /products/:id', () => {
      it('Should delete an existant product', (done) => {
        const newProduct = {
          name: 'product 1',
          price: 222,
          quantity: 15,
        };
        
        Product.create(newProduct, (error, product) => {
          chai.request(app)
            .delete(`/products/${product._id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.statusCode).to.equal(200);
              done();
            });
        });
      });
  
      it('Should returns 404 when the product already deleted', (done) => {
        const product = {
          name: 'product 1',
          price: 222,
          quantity: 15,
        };
        
        Product.deleteOne(product, (error, deletedProduct) => {
          chai.request(app)
            .delete(`/products/${mongoose.Types.ObjectId()}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.statusCode).to.equal(404);
              done();
            });
        });
      });
    });
  });
  
})
