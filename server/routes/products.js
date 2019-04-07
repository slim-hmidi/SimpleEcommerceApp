const productRouter = require('express').Router();
const ctrlProducts = require('../controllers/products');
const productValidation = require('../validations/product');


productRouter
  .route('/products')
  .get(
    ctrlProducts.getProducts,
  )
  .post(
    productValidation.addProductValidation,
    ctrlProducts.createProduct,
  );

productRouter
  .route('/products/:id')
  .get(
    productValidation.productIdValidation,
    ctrlProducts.getProduct,
  )
  .put(
    productValidation.productIdValidation,
    ctrlProducts.updateProduct,
  )
  .delete(
    productValidation.productIdValidation,
    ctrlProducts.deleteProduct,
  );

module.exports = productRouter;
