// productsController.js

const Product = require('../dao/models/Product');

// Ruta: GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    const limit = req.query.limit;
    
    if (limit) {
      res.json({ products: products.slice(0, limit) });
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

// Ruta: GET /api/products/:pid
async function getProductById(req, res) {
  const productId = parseInt(req.params.pid, 10);

  if (isNaN(productId)) {
    res.status(400).json({ error: 'El ID del producto debe ser un número válido' });
    return;
  }

  try {
    const product = await Product.findById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

// Ruta: POST /api/products
async function addProduct(req, res) {
  const productData = req.body;

  try {
    const newProduct = await Product.create(productData);
    res.json({ message: 'Producto agregado con éxito', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
}

// Ruta: PUT /api/products/:pid
async function updateProduct(req, res) {
  const productId = req.params.pid;
  const updatedData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (updatedProduct) {
      res.json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

// Ruta: DELETE /api/products/:pid
async function deleteProduct(req, res) {
  const productId = req.params.pid;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.json({ message: 'Producto eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
