// directly import from 'shared' package
// const sum = require("shared");

// or import from 'index.js'
const sum = require("./index");

test("adds 2 + 2 to equal 4", () => {
  expect(sum(2, 2)).toBe(4);
});
