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
//NPM NODE Package Manager
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

//! tools in NPM only available in the command line

//importing an API introduction to NPM
//for reference // import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
//parcel can download packages as well
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

if (module.hot) {
  module.hot.accept();
}
//!=========
// -----Configuring Babel and Polyfilling
class person {
  greeting = ' Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting},${this.name}`);
  }
}
const jonas = new person('Jonas');
//babel can convert js versions for different users so users who do not have a updated browser can access your websites
//some item can be transpile some cannot
console.log('Jonas' ?? null);
console.log(cart.find(el => el.quantity >= 2));
//--------recipe------
import 'core-js/stable';
import 'core-js/stable/array//find';
import 'core-js/stable/promise';

//poly filling async functions used to change code based on version of browser
import 'regenerator-runtime/runtime';
