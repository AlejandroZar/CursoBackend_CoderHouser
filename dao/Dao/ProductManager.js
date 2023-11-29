const Product = require('../models/Product');

class ProductManager {
  async loadProducts() {
    try {
      return await Product.find();
    } catch (error) {
      console.error('Error cargando productos:', error.message);
      return [];
    }
  }

  async getProductById(productId) {
    try {
      return await Product.findOne({ _id: productId });
    } catch (error) {
      console.error('Error al obtener el producto:', error.message);
      return null;
    }
  }

  async addProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return { message: 'Producto agregado con éxito', product };
    } catch (error) {
      console.error('Error al agregar el producto:', error.message);
      return { error: 'Error al agregar el producto' };
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, updatedData, { new: true });
      return { message: 'Producto actualizado con éxito', product: updatedProduct };
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      return { error: 'Error al actualizar el producto' };
    }
  }

  async deleteProduct(productId) {
    try {
      await Product.deleteOne({ _id: productId });
      return { message: 'Producto eliminado con éxito' };
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
      return { error: 'Error al eliminar el producto' };
    }
  }
}

module.exports = ProductManager;
