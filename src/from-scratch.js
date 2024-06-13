//Lesson 3.0.0 Assignment: Foundation of Promises by Eileen

//QUESTION 1: this function takes in any value and returns a resolved promise of that value
const resolvedWrapper = (value) => {
  return new Promise((resolve) => { //creating + returning a new promise instance using new Promise constructor syntax- omitted the reject parameter as it's not being used
    resolve(value); //called the resolve function on the given argument, value- this resolves the Promise with the given value (meaning the Promise is fulfilled with the given value; the operation is done, and you can proceed with the value)
 })
};

// //alt solution: using .resolve syntax 
// const resolvedWrapper = (value) => {
//   return Promise.resolve(value); //this is shorthand for the above --> new Promise((resolve) => resolve(value)). note: can't do new Promise.resolve() as it's not a constructor
// };

// //logging q1 test to the console
// resolvedWrapper(10).then(console.log) //10

//QUESTION 2: a function that takes in a str message and rejects with a new Error instance with the given str as the error's message
const rejectedWrapper = (str) => {
  return new Promise((_, reject) => { //same functionality as coding parameters as (resolve, reject), but better practice this way for readability purposes
    reject(new Error(str)); //could also do Error(str) instead of using the new constructor; functionality is the same. note: creating an error object alone does not trigger the promise rejection- need to explicitly call the reject function on it
 })
};

// //alt solution: using .reject shortcut
// const rejectedWrapper = (str) => {
//   return Promise.reject(new Error(str)); //directly returns a rejected promise with an error obj. note: again, can't do new Promise.reject() as it's not a constructor
// };

// //logging q2 test to the console
// rejectedWrapper('Oh no!').catch((err) => console.log(err.message)) //Oh no!

//QUESTION 3: a function that simply takes in a promise and, using .then, grabs the promise's resolved value, console.logs it, and then returns it
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

//QUESTION 4: a function that takes in a promise, handling any possible rejections. if the passed-in promise resolves, handle it with .then, should be similar to q3 above. however, if the passed-in promise rejects, log a msg with console.error and return null. do not just log the error object itself! use the .message property!
const handleResolvedOrRejectedPromise = (promise) => {
  return promise
    .then((resolvedVal) => { //handling the resolved value of the promise
      console.log(resolvedVal); //logs the val to the console
      return resolvedVal; //returns the resolved val for further chaining
    })
    .catch((err) => { //handle any errors that occur during the promise resolution- named parameter err instead of error to not confuse self with the Error keyword
      console.error(`Your error message was: ${err.message}`); //logging error msg to the console using the error obj's .message property
      return null; //indicates that the promise was rejected, ensuring chain continuity (if there were further chaining, null would be passed instead of a resolved value)
    })
};

// //logging q4 test to the console
// handleResolvedOrRejectedPromise(Promise.resolve(100)).then(val => val) //100 --> also returns 100
// handleResolvedOrRejectedPromise(Promise.reject(Error('Yikes!'))).then(val => val === null) //"Your error message was: Yikes!" --> returns null

/*QUESTION 5: an asynchronous function that takes in a number of milliseconds and returns a promise that resolves after the given number of ms. this promise will never reject
NOTE: when dealing with Promises that involve asynchronous operations (like setTimeout), absolutely need to handle their resolution with .then() or await and return the data/value.
this ensures proper management of asynchronous flow and prevents errors like JestAssertionError in testing environments. */
const pauseForMs = (ms) => {
  return new Promise((resolve) => { //created a new promise that wraps setTimeout()
    setTimeout(() => { //starting a timer that pauses execution for the given number of milliseconds; could also have done --> setTimeout(resolve, ms)
      resolve(); //used as the callback function for setTimeout(). inside the resolve() function is where we would have passed the resolved value if we had one- currently resolves undefined
    }, ms);
  })
  .then((data) => { //when i commented this and the next three lines out to test what would happen got an npm test error (JestAssertionError: Caught error after test environment was torn down)
    // console.log(data); //where we would have handled the resolved value
    return data; //currently returns undefined as no value was passed to resolve()
  });
};

// //alt solution: however, won't pass FrScTe7 (test 7) as the promise needs to return undefined while this function logs a message. coding with the await keyword ensures that the msg to log upon resolution only executes after the delay
// const pauseForMs = async (ms) => { //async label needs to be coded as the await keyword is being used
//   await new Promise((resolve) => setTimeout(resolve, ms)); //await keyword causes the code to pause and wait for the Promise to resolve. it then unpacks the Promise (currently to wait a given ms) and returns the resolved value, presently undefined.
//   // console.log("Promise fulfilled: Delay complete!"); //useful for debugging purposes but doesn't affect functionality if omitted
// };

// //logging q5 test to the console
// pauseForMs(1000).then(() => console.log("It's been a second!")); //undefined    "It's been a second!"

module.exports = {
  resolvedWrapper,
  rejectedWrapper,
  handleResolvedPromise,
  handleResolvedOrRejectedPromise,
  pauseForMs,
};
