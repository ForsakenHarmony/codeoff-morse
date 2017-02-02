// returns a string with the given symbol
const symbolTimes = (symbol, times) => {
  const arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(symbol);
  }
  return arr.join('');
};

// swaps keys and values of an object
const invert = object =>
  Object.keys(object).reduce((obj, e) => {
    obj[object[e]] = e;
    return obj;
  }, {});

module.exports = { symbolTimes, invert };
