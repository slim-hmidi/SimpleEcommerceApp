const Product = require('../models/Product');

/**
 * Create a new product
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.createProduct = async (req, res) => {
  const {
    name,
    price,
    quantity,
  } = req.body;

  const newProduct = new Product({
    name,
    price,
    quantity,
  });

  const foundProduct = await Product.findOne({ name });

  // verify if a product already exits
  if (foundProduct) {
    return res.error(400, 'A product already exists');
  }

  try {
    const createdProduct = await Product.create(newProduct);
    if (createdProduct) {
      return res.success(201, createdProduct);
    }
    return res.error(400, 'Unable to create the product');
  } catch (error) {
    return res.error(500, error);
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
    if (fetchedProducts || !fetchedProducts.length) {
      return res
        .success(200, fetchedProducts);
    }
    return res.error(400, 'Unable to get products');
  } catch (error) {
    return res.error(500, error);
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
    return res.error(404, 'Product not found');
  } catch (error) {
    return res.error(500, error);
  }
};
/**
 * Update a product
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  // check if the product exists
  const fetchedProduct = await Product.findById(id);

  // return an error message when the product does not exists
  if (!fetchedProduct) {
    return res.error(404, 'Product to update is not found!');
  }
  try {
    const updatedProduct = await Product.findOneAndUpdate(id, req.body, { new: true });
    if (updatedProduct) {
      return res.success(200, updatedProduct);
    }
    return res.error(400, 'Unable to update the Product');
  } catch (error) {
    return res.error(500, error);
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
      return res
        // eslint-disable-next-line no-underscore-dangle
        .success(200, deletedProduct._id);
    }
    return res.error(404, 'Product to delete is not found!');
  } catch (error) {
    return res.error(500, error);
  }
};
