var assert = require('assert');
var Pend = require('./');
var pend = new Pend();
var results = [];
pend.go(function(cb) {
  results.push(1);
  setTimeout(function() {
    results.push(3);
    cb();
  }, 500);
});
pend.go(function(cb) {
  results.push(2);
  setTimeout(function() {
    results.push(4);
    cb();
  }, 1000);
});
pend.wait(function(err) {
  assert.deepEqual(results, [1,2,3,4]);
});
assert.deepEqual(results, [1, 2]);
