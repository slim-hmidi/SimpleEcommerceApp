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

            it('should return an empty list', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = []
                ProductMock.expects('find').yields(null, expectedResult);
                Product.find((error, documents) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(documents.length).to.equal(0);
                    done();
                })
            })
            it('should return a product list', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = [{
                    _id: mongoose.Types.ObjectId(),
                    name: 'product',
                    price: 222,
                    quantity: 15,
                },
                {
                    _id: mongoose.Types.ObjectId(),
                    name: 'product',
                    price: 222,
                    quantity: 15,
                }]
                ProductMock.expects('find').yields(null, expectedResult);
                Product.find((error, documents) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(documents.length).to.equal(2);
                    done();
                })
            })
        })

        describe('Create products', () => {
            it('Should create a product successfully', (done) => {
                const productToCreate = {
                    name: 'product',
                    price: 200,
                    quantity: 300
                }
                const ProductMock = sinon.mock(new Product(productToCreate));
                const product = ProductMock.object;
                const expectedResult = product
                ProductMock.expects('save').yields(null, expectedResult);
                product.save((error, doc) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(doc.name).to.equal(productToCreate.name);
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
                const expectedResult = 'Product price is required'
                ProductMock.expects('save').yields(null, expectedResult);
                product.save((error, document) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(document).to.equal('Product price is required');
                    done();
                })
            })
        })

        describe('Update /products', () => {
            it('Should update a product successfully', (done) => {
                const updateBody = {
                    name: 'new product name',
                }
                const id = mongoose.Types.ObjectId();
                const ProductMock = sinon.mock(Product);
                const product = ProductMock.object;
                const expectedResult = {
                    _id: mongoose.Types.ObjectId(),
                    name: "new product name",
                    price: 12.5,
                    quantity: 120
                }
                ProductMock.expects('findOneAndUpdate').withArgs({ _id: id }, updateBody).yields(null, expectedResult);
                product.findOneAndUpdate({ _id: id }, updateBody, (error, document) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(document.name).to.equal("new product name");
                    done();
                })
            })

            it('Should returns an error when a product does not exists', (done) => {
                const updateBody = {
                    name: 'new product name',
                }
                const id = mongoose.Types.ObjectId();
                const ProductMock = sinon.mock(Product);
                const product = ProductMock.object;
                const expectedResult = "No Product found for the given id"
                ProductMock.expects('findOneAndUpdate').withArgs({ _id: id }, updateBody).yields(null, expectedResult);
                product.findOneAndUpdate({ _id: id }, updateBody, (error, document) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(document).to.equal("No Product found for the given id");
                    done();
                })
            })
        })


        describe('Read /products', () => {
            it('Should get a product successfully', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = {
                    _id: mongoose.Types.ObjectId(),
                    name: 'product',
                    price: 120,
                    quantity: 1
                }
                const id = mongoose.Types.ObjectId();
                ProductMock.expects('findOne').withArgs(id).yields(null, expectedResult);
                Product.findOne(id, (error, document) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(document.name).to.equal(expectedResult.name);
                    done();
                })
            })

            it('Should returns an error when a product is not found', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = 'No Product found for the provided id'
                const id = mongoose.Types.ObjectId();
                ProductMock.expects('findOne').withArgs(id).yields(null, expectedResult);
                Product.findOne(id, (error, document) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(document).to.equal('No Product found for the provided id');
                    done();
                })
            })
        })


        describe('DELETE /products', () => {
            it('Should delete a product successfully', (done) => {
                const ProductMock = sinon.mock(Product);
                const id = mongoose.Types.ObjectId();
                const expectedResult = {
                    _id: id,
                    name: 'product',
                    price: 120,
                    quantity: 1
                }
                ProductMock.expects('findByIdAndDelete').withArgs(id).yields(null, expectedResult);
                Product.findByIdAndDelete(id, (error, document) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(document._id).to.equal(expectedResult._id);
                    done();
                })
            })

            it('Should returns an error when a product is not found', (done) => {
                const ProductMock = sinon.mock(Product);
                const expectedResult = 'No Product found for the given id'
                const id = mongoose.Types.ObjectId();
                ProductMock.expects('findByIdAndDelete').withArgs(id).yields(null, expectedResult);
                Product.findByIdAndDelete(id, (error, document) => {
                    if (error) done(error)
                    ProductMock.verify();
                    ProductMock.restore();
                    expect(document).to.equal('No Product found for the given id');
                    done();
                })
            })
        })
    })
})
