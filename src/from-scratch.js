//Lesson 3.0.0 Assignment: Foundation of Promises by Eileen

//QUESTION 1: this function takes in any value and returns a resolved promise of that value
const resolvedWrapper = (value) => {
  return new Promise((resolve) => { //creating + returning a new promise instance using new Promise constructor syntax- omitted the reject parameter as it's not being used
    resolve(value); //called the resolve function on the given argument, value- this resolves the Promise with the given value (meaning the Promise is fulfilled with the given value; the operation is done, and you can proceed with the value)
 })
};

// //alt solution: using .resolve syntax 
// const resolvedWrapper = (value) => {
//   return Promise.resolve(value); //this is shorthand for the above --> new Promise((resolve) => resolve(value)). note: cant do new Promise.resolve() as it's not a constructor
// };

// //logging q1 test to the console
// resolvedWrapper(10).then(console.log) //10

//QUESTION 2: a function that takes in a str message, and rejects with a new Error instance with the given str as the error's message
const rejectedWrapper = (str) => {
  return new Promise((_, reject) => { //same funcitonality as coding parameters as (resolve, reject), but better practice this way for readibility purposes
    reject(new Error(str)); //could also do Error(str) instead of using the new constructor; functionality is the same. note: creating an error object alone does not trigger the promise rejection- need to explicitly call the reject function on it
 })
};

// //alt solution: using .reject shortcut
// const rejectedWrapper = (str) => {
//   return Promise.reject(new Error(str)); //directly returns a rejected promise with an error obj. note: again, can't do new Promise.reject() as it's not a constructor
// };

// //logging q2 test to the console
// rejectedWrapper('Oh no!').catch((err) => console.log(err.message)) //Oh no!

//QUESTION 3: a function that simply takes in a promise, and using .then, grabs the promise's resolved value, console.logs it, and then returns it
const handleResolvedPromise = (promise) => {
  return promise
    .then((resolvedVal) => { //handling the resolved value of the promise
      console.log(resolvedVal); //logs the val to the console
      return resolvedVal; //returns the resolved val for further chaining
    })
};

// //logging q3 test to the console
// handleResolvedPromise(Promise.resolve('yo')) //"yo"
// handleResolvedPromise(Promise.resolve('yo')).then(val => console.log(`we still have ${val}`)); //"yo"   "we still have yo"

const handleResolvedOrRejectedPromise = () => {
};

const pauseForMs = () => {
};

module.exports = {
  resolvedWrapper,
  rejectedWrapper,
  handleResolvedPromise,
  handleResolvedOrRejectedPromise,
  pauseForMs,
};
