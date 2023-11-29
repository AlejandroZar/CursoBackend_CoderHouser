const Cart = require('../models/Cart');

class CartManager {
  async createCart() {
    try {
      const newCart = new Cart();
      await newCart.save();
      return { message: 'Carrito creado con éxito', cart: newCart };
    } catch (error) {
      console.error('Error al crear el carrito:', error.message);
      return { error: 'Error al crear el carrito' };
    }
  }

  async getCartProducts(cartId) {
    try {
      const cart = await Cart.findOne({ id: cartId });
      if (cart) {
        return { products: cart.products };
      } else {
        return { error: 'Carrito no encontrado' };
      }
    } catch (error) {
      console.error('Error al obtener el carrito:', error.message);
      return { error: 'Error al obtener el carrito' };
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ id: cartId });
      if (!cart) {
        return { error: 'Carrito no encontrado' };
      }

      const existingProduct = cart.products.find((p) => p.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      return { message: 'Producto agregado al carrito con éxito', product: productId, quantity };
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error.message);
      return { error: 'Error al agregar el producto al carrito' };
    }
  }
}

module.exports = CartManager;
