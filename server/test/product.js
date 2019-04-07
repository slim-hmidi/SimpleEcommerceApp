process.env.NODE_ENV = 'test';
const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../app');
const Product = require('../models/Product');

chai.use(chaiHttp);

describe('Products', () => {
  beforeEach((done) => {
    Product.deleteMany({}, (error) => {
      if (error) done(error);
      done();
    });
  });

  describe('Get /Products', () => {
    it('Should Return the list of products', (done) => {
      chai.request(app)
        .get('/products')
        .end((error, res) => {
          if (error) done(error);
          expect(res.statusCode).to.equal(200);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });
  describe('Get /Product/:id', () => {
    it('Should not return a product when the id is not valid', (done) => {
      chai.request(app)
        .get('/products/1')
        .end((error, res) => {
          if (error) done(error);
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });

  describe('Post /products/add', () => {
    it('Should create a new product', (done) => {
      const newProduct = {
        name: 'product 1',
        price: 222,
        quantity: 15,
      };
      chai.request(app)
        .post('/products/add')
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
      Product.create(newProduct, (error, product) => {
        chai.request(app)
          .put(`/products/${product._id}`)
          .send({
            name: 'new Product',
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.equal('Product updated Successfully');
            done();
          });
      });
    });
  });
});
