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
const getLimit = (limits, user) => limits?.[user] ?? 0;
// addExpense function is trying to mutate the outside object as a side effect
//pure function
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

  const limit = getLimit(limits, cleanUser);
  //if the value is  greater than the limit it will not run
  //if value less than limit it gets pushed to the budget array
  //enhanced object literal syntax
  return value <= getLimit(cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state; //now the budget object will not be mutated
  // budget.push({ value: -value, description, user: cleanUser });
};

//because the budget object is not being mutated we must store it somewhere
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
// const newBudget1 = addExpense(budget, spendingLimits, 10000, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
//jay is not allow to add anything so nothing will be added
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget1);
console.log(newBudget2);

//check the entry for if it exceeds the budget
//normal function with return
/*const checkExpenses2 = function (state, limits) {
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });

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
  const finalBudget = checkExpenses(newBudget3, spendingLimits);
  // console.log(newBudget3);
  console.log(finalBudget);
};*/
//arrow function variant
//made into a pure function that wont mutate anything using map method over the original
const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );
for (const entry of budget)
  if (entry.value < -getLimit(entry.user)) {
    entry.flag = 'limit';
  }
const finalBudget = checkExpenses(newBudget3, spendingLimits);
// console.log(newBudget3);
console.log(finalBudget);

console.log(budget);
//filtering out the big expenses from the smaller expenses into a map
//impure function because there is a console.log
const logBigExpenses = function (state, bigLimit) {
  const BigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2)) //it can be done with map and join or with the reduce method
    .join(' / ');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, ''); //returns // 📱 // 💻 in the console
  console.log(BigExpenses);
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // //if (entry.value <= -limit) {
  // // output += `${entry.description.slice(-2)} + / `; // Emojis are 2 chars

  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};
//// console.log(budget);
logBigExpenses(finalBudget, 500);

//cleaning up code with map filter and reduce
//in functional programming try to reduce the amount of side effects or things being output to try and reduce clutter and keep things cleaner
