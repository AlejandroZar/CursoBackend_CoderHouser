// cartsController.js

const Cart = require('../dao/models/Cart');

// Ruta: POST /api/carts
function createCart(req, res) {
  const newCart = new Cart();

  try {
    newCart.save();
    res.json({ message: 'Carrito creado con éxito', cart: newCart });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
}

// Ruta: GET /api/carts/:cid
async function getCartProducts(req, res) {
  const cartId = req.params.cid;

  try {
    const cart = await Cart.findById(cartId);

    if (cart) {
      res.json({ products: cart.products });
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}

// Ruta: POST /api/carts/:cid/product/:pid
async function addProductToCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    const existingProduct = cart.products.find(p => p.product.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ message: 'Producto agregado al carrito con éxito', product: productId, quantity: quantity });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
}

module.exports = {
  createCart,
  getCartProducts,
  addProductToCart
};
