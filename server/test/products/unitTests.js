const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
// Monck mongodb Models
require('sinon-mongoose');

const Product = require('../../models/Product');

describe('Unit Tests', () => {
    describe('Products', () => {
        describe('GET /products', () => {
            it('should return a product list', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = {    
                    statusCode: 200,
                    body: []
                }
                ProductMock.expects('find').yields(null, expectedResult);
                Product.find((error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(200);
                    done();
                })
            })
        })

        describe('GET /products', () => {
            it('should return an error when it is unable to get the product list', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = {    
                    statusCode: 500,
                    error: 'Internal server error'
                }
                ProductMock.expects('find').yields(null, expectedResult);
                Product.find((error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(500);
                    done();
                })
            })
        })

        describe('POST /products', () => {
            it('Should create a product successfully', (done) => {
                const productToCreate = {
                    name: 'product',
                    price: 200,
                    quantity: 300
                }
                const ProductMock = sinon.mock(new Product(productToCreate));
                const product = ProductMock.object;
                const expectedResult = {    
                    statusCode: 201,
                    body: product
                }
                ProductMock.expects('save').yields(null, expectedResult);
                product.save((error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(201);
                    expect(res.body.name).to.equal(productToCreate.name);
                    done();
                })
            })

            it('Should returns an error when a product property is missed', (done) => {
                const productToCreate = {
                    name: 'product',
                    quantity: 300
                }
                const ProductMock = sinon.mock(new Product(productToCreate));
                const product = ProductMock.object;
                const expectedResult = {    
                    statusCode: 400,
                    error: 'Product price is required'
                }
                ProductMock.expects('save').yields(null, expectedResult);
                product.save((error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(400);
                    expect(res.error).to.equal('Product price is required');
                    done();
                })
            })
        })

        describe('PUT /products/:id', () => {
            it('Should update a product successfully', (done) => {
                const updateBody = {
                    name: 'new product name',
                }
                const id = mongoose.Types.ObjectId();
                const ProductMock = sinon.mock(new Product(updateBody));
                const product = ProductMock.object;
                const expectedResult = {    
                    statusCode: 200
                }
                ProductMock.expects('save').withArgs({ _id: id }).yields(null, expectedResult);
                product.save({ _id: id }, (error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(200);
                    done();
                })
            })

            it('Should returns an error when a update a product', (done) => {
                const updateBody = {}
                const ProductMock = sinon.mock(new Product(updateBody));
                const product = ProductMock.object;
                const expectedResult = {    
                    statusCode: 400,
                    error: 'Procut body should not be empty'
                }
                ProductMock.expects('save').yields(null, expectedResult);
                product.save((error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(400);
                    expect(res.error).to.equal('Procut body should not be empty');
                    done();
                })
            })
        })


        describe('GET /products/:id', () => {
            it('Should get a product successfully', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = {    
                    statusCode: 200,
                    body: {
                        name: 'product',
                        price: 120,
                        quantity: 1
                    }
                }
                const id = mongoose.Types.ObjectId();
                ProductMock.expects('findOne').withArgs(id).yields(null, expectedResult);
                Product.findOne(id, (error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.name).to.equal(expectedResult.body.name);
                    done();
                })
            })

            it('Should returns 404 when a product is not found', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = {    
                    statusCode: 404,
                    error: 'Product not found'
                }
                const id = mongoose.Types.ObjectId();
                ProductMock.expects('findOne').withArgs(id).yields(null, expectedResult);
                Product.findOne(id, (error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(404);
                    expect(res.error).to.equal('Product not found');
                    done();
                })
            })
        })


        describe('DELETE /products/:id', () => {
            it('Should delete a product successfully', (done) => {
                const ProductMock = sinon.mock(Product);
                const id = mongoose.Types.ObjectId();
                const expectedResult = {    
                    statusCode: 200,
                    body: {
                        _id: id,
                    }
                }
                ProductMock.expects('findByIdAndDelete').withArgs(id).yields(null, expectedResult);
                Product.findByIdAndDelete(id, (error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(200);
                    expect(res.body._id).to.equal(expectedResult.body._id);
                    done();
                })
            })

            it('Should returns 404 when a product is not found', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = {    
                    statusCode: 404,
                    error: 'Product not found'
                }
                const id = mongoose.Types.ObjectId();
                ProductMock.expects('findByIdAndDelete').withArgs(id).yields(null, expectedResult);
                Product.findByIdAndDelete(id, (error, res) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(res.statusCode).to.equal(404);
                    expect(res.error).to.equal('Product not found');
                    done();
                })
            })
        })
    })
})


