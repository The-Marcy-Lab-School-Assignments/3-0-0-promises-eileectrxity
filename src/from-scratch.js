//Lesson 3.0.0 Assignment: Foundation of Promises by Eileen

//QUESTION 1: this function takes in any value and returns a resolved promise of that value
const resolvedWrapper = (value) => {
  return new Promise((resolve) => { //creating + returning a promise using new Promise constructor syntax- omitted the reject parameter as it's not being used
    resolve(value); //called the resolve function on the given argument, value- this resolves the Promise with the given value (meaning the Promise is fulfilled with the given value; the operation is done, and you can proceed with the value)
 })
};

// //alt solution: using .resolve syntax 
// const resolvedWrapper = (value) => {
//   return Promise.resolve(value); //this is shorthand for the above --> new Promise((resolve) => resolve(value)) 
// };

//logging q1 test to the console
// resolvedWrapper(10).then(console.log) //10

const rejectedWrapper = () => {
};

const handleResolvedPromise = () => {
};

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
