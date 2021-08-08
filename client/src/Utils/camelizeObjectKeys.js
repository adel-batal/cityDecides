function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

let camelizeObjectKeys = function (input) {
  if (typeof input !== 'object') return input;
  if (Array.isArray(input)) return input.map(camelizeObjectKeys);
  return Object.keys(input).reduce(function (newObj, key) {
    let val = input[key];
    let newVal = typeof val === 'object' ? camelizeObjectKeys(val) : val;
    newObj[camelize(key.toLowerCase())] = newVal;
    return newObj;
  }, {});
};

export default camelizeObjectKeys;
