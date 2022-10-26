'strict mode';
//object.freeze also works on arrays... it is not a DEEP freeze so thing inside the object can still change
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// budget[0].value = 10000; //this works when object.freeze is applied.
// budget[9] = 'jonas'; //making a new array item or pushing one will not work

const spendingLimits = Object.freeze({
  //will not allow anything to be added to it immutable
  jonas: 1500,
  matilda: 100,
});
spendingLimits.jay = 200;

//arrow function getting the limit
//ternary operator
// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
//optional chaining
// const limit = spendingLimits?.[user] ?? 0;
const getLimit = user => spendingLimits?.[user] ?? 0;
// addExpense function is trying to mutate the outside object as a side effect
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'Jonas'
) {
  const cleanUser = user.toLowerCase(); //this make the users input lowercase otherwise the code would not work

  //// let lim;
  //// if (spendingLimits[user]) {
  ////   lim = spendingLimits[user];
  //// } else {
  ////   lim = 0;
  //// }

  const limit = getLimit(cleanUser);

  if (value <= getLimit(cleanUser)) {
    //if value less than limit it gets pushed to the budget array
    //enhanced object literal syntax
    return [...state, { value: -value, description, user: cleanUser }];
    // budget.push({ value: -value, description, user: cleanUser });
  }
};

addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
addExpense(budget, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
addExpense(budget, spendingLimits, 200, 'Stuff', 'Jay');

//check the entry for it exceeds the budget
const checkExpenses = function () {
  //// let lim;
  //// if (spendingLimits[entry.user]) {
  ////   lim = spendingLimits[entry.user];
  //// } else {
  ////   lim = 0;
  //// }
  //optional chaining
  //// const limit = spendingLimits?.[entry.user] ?? 0;
  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) {
      entry.flag = 'limit';
    }
};

checkExpenses();

console.log(budget);

const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget)
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  //if (entry.value <= -limit) {
  // output += `${entry.description.slice(-2)} + / `; // Emojis are 2 chars

  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
console.log(budget);
logBigExpenses(500);

//cleaning up code with map filter and reduce
