const path = require('path');
const ScoreCounter = require('score-tests');
const {
  resolvedWrapper,
  rejectedWrapper,
  handleResolvedPromise,
  handleResolvedOrRejectedPromise,
  pauseForMs,
} = require('./from-scratch');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const log = jest.spyOn(console, 'log').mockImplementation(() => {});
const logError = jest.spyOn(console, 'error').mockImplementation(() => {});

const returnRandomString = () => Math.random().toString(36).substring(7);

describe(testSuiteName, () => {
  afterEach(() => {
    console.log.mockClear();
    console.error.mockClear();
    jest.clearAllMocks();
    // flushing promises, don't worry about it
    return new Promise(setImmediate);
  });

  it('resolvedWrapper - returns a promise that resolves to the value passed in', () => {
    const randomValue = `Your random string: ${returnRandomString()}`;

    expect(resolvedWrapper(randomValue)).resolves.toBe(randomValue);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('rejectedWrapper - returns a rejected promise that needs to be caught', () => {
    const randomValue = `Your random string: ${returnRandomString()}`;

    expect(rejectedWrapper(randomValue)).rejects.toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('rejectedWrapper - the rejected value is a new Error', () => {
    const randomValue = `Your random string: ${returnRandomString()}`;
    const rejectedValue = rejectedWrapper(randomValue);

    expect(rejectedValue).rejects.toBeInstanceOf(Error);
    expect(rejectedValue).rejects.toHaveProperty('message', randomValue);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('handleResolvedPromise - uses .then to log and return (in a promise) the value from the passed in promise', () => {
    const randomValue = `Your random string: ${returnRandomString()}`;

    return handleResolvedPromise(Promise.resolve(randomValue))
      .then((value) => {
        expect(value).toBe(randomValue);
        expect(log).toHaveBeenCalledWith(randomValue);

        scoreCounter.correct(expect); // DO NOT TOUCH
      });
  });

  it('handleResolvedOrRejectedPromise - uses .then to log and return (in a promise) the value from the passed in promise', () => {
    const randomValue = `You're handleResolvedOrRejectedPromise value: ${returnRandomString()}`;

    return handleResolvedOrRejectedPromise(Promise.resolve(randomValue))
      .then((value) => {
        expect(value).toBe(randomValue);
        expect(log).toHaveBeenCalledWith(randomValue);

        scoreCounter.correct(expect); // DO NOT TOUCH
      });
  });

  it('handleResolvedOrRejectedPromise - uses .catch to log and safely return (in a promise) null when the passed in promise rejects', () => {
    const randomValue = `Your random error: ${returnRandomString()}`;
    const expectedErrorLog = `Your error message was: ${randomValue}`;

    const getRejectedPromise = () => Promise.reject(new Error(randomValue));

    return handleResolvedOrRejectedPromise(getRejectedPromise())
      .then((value) => {
        expect(value).toBeNull();
        expect(logError).toHaveBeenCalledWith(expectedErrorLog);
        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((err) => {
        // We should not hit this because your code should not throw an error
        // what is the return value of a .catch? Is it a rejected or resolved value?
        expect(err).toBeNull();
      });
  });
//edit: noting that the below FrScTe7 passes in local terminal when running npm test but is not updating as passed in scores.json for some reason 
  it('pauseForMs - returns a promise, but that promise has no value', () => {
    expect(pauseForMs(100)).resolves.toBeUndefined();
  });

  it('pauseForMs - calls set timeout with the passed in number of milliseconds', () => {
    const ms = 100;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    pauseForMs(ms);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), ms);
    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('pauseForMs - returns a promise that resolves after the passed in number of milliseconds', () => {
    const ms = 500;

    const startTime = Date.now();
    return pauseForMs(ms)
      .then(() => {
        const endTime = Date.now();
        const timeDiff = endTime - startTime;
        expect(timeDiff).toBeGreaterThanOrEqual(ms - 50); // timeouts aren't exact
        expect(timeDiff).toBeLessThan(ms + 100);

        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((err) => {
        expect(err).toBeNull();
      });
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
