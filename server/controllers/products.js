const Product = require('../models/Product');
const { ErrorHandler } = require('../utils/error');

/**
 * Create a new product
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      quantity,
    });

    const foundProduct = await Product.findOne({ name });

    // verify if a product already exits
    if (foundProduct) {
      throw new ErrorHandler(400, 'A product already exists');
    }
    const createdProduct = await Product.create(newProduct);
    if (createdProduct) {
      return res.success(201, createdProduct);
    }
    throw new ErrorHandler(400, 'Unable to create the product');
  } catch (error) {
    return res.error(error.statusCode || 500, error.message);
  }
};

/**
 * Get a product's list
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.getProducts = async (req, res) => {
  try {
    const fetchedProducts = await Product.find({});
    if (fetchedProducts) {
      return res.success(200, fetchedProducts);
    }
    throw new ErrorHandler(400, 'Unable to get products');
  } catch (error) {
    return res.error(error.statusCode, error.message);
  }
};

/**
 * Get a product
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const fetchedProduct = await Product.findById(id);
    if (fetchedProduct) {
      return res.success(200, fetchedProduct);
    }
    throw new ErrorHandler(404, 'Product not found');
  } catch (error) {
    return res.error(error.statusCode || 500, error.message);
  }
};
/**
 * Update a product
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // check if the product exists
    const fetchedProduct = await Product.findById(id);

    // return an error message when the product does not exists
    if (!fetchedProduct) {
      throw new ErrorHandler(404, 'Product to update is not found!');
    }
    const updatedProduct = await Product.findOneAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedProduct) {
      return res.success(200, updatedProduct);
    }
    throw new ErrorHandler(400, 'Unable to update the Product');
  } catch (error) {
    return res.error(error.statusCode || 500, error.message);
  }
};

/**
 * Delete a product
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      return (
        res
          // eslint-disable-next-line no-underscore-dangle
          .success(200, deletedProduct._id)
      );
    }
    throw new ErrorHandler(404, 'Product to delete is not found!');
  } catch (error) {
    return res.error(error.statusCode || 500, error.message);
  }
};
