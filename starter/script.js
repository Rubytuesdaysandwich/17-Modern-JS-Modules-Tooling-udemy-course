// importing module
//automatically put into strict mode

// import { addToCart, totalPrice as Price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(Price, tq);
// ▲▲▲▲▲▲
console.log('importing module');
//console.log(shippingCost);
// import * as shoppingCart from './shoppingCart.js'; //creates an object called shopping cart
// shoppingCart.addToCart('bread', 5);
// console.log(shoppingCart.totalPrice);
//---importing default---
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);
console.log(cart);
/*
// imports are not copies of exports they are a live connections
// console.log('start fetching');
// top level await: async function not needed
// blocking execution of module with top level await
 const res = await fetch('https://jsonplaceholder.typicode.com/posts');
 const data = await res.json();
 console.log(data);
 console.log('Something');
*/
/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);
  return { title: data.at(-1).title, text: data.at(-1).body };
};
getLastPost();

const lastPost = getLastPost();
console.log(lastPost);

//Not very clean
lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

// --------The Module Pattern
//ify function immediately invoked
/*const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart(shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  return { addToCart, cart, totalPrice, totalQuantity };
})();
//closures are created with the creation of functions. closures basically inherit properties of lower level scopes
//anything inside the module is private to that module
shoppingCart2.addToCart('apple', 4);
shoppingCart2.addToCart('pizza', 2);
console.log(shoppingCart2);
console.log(shoppingCart2.shippingCost);
// end module pattern
*/
//----- CommonJS Modules
//NPM
// export example
/*
export addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart(shipping cost is ${shippingCost})`
    );
  };//will not work in the browser but will work in node js
//   import example
//not defined in browser but it is defined in nodeJS
 const{addToCart}=require('./shoppingCart.js');*/
