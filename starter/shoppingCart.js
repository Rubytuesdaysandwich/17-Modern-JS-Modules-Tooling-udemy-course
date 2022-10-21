//exporting module
//export need to happen on top level global scope
console.log('Exporting modules');
const shippingCost = 10;
const cart = [];
//named export example ▼
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity}${product}added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };
