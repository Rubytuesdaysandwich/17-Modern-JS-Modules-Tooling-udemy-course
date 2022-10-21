//exporting module
//export need to happen on top level global scope
console.log('Exporting modules');

//blocking code
// ScriptProcessorNode.js has to wait for this code to run before it can finish
// console.log('start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('finish fetching');
//use with grate care
//end blocking code
const shippingCost = 10;
export const cart = [];
//named export example ▼
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };
//. end of named exports

// ▼default exports

//not including the name of the variable
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
