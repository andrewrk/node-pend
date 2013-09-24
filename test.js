var assert = require('assert');
var Pend = require('./');

testBasic();

function testBasic() {
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
    testWithMax();
  });
  assert.deepEqual(results, [1, 2]);
}

function testWithMax() {
  var pend = new Pend();
  var results = [];
  pend.max = 2;
  pend.go(function(cb) {
    results.push('a');
    setTimeout(function() {
      results.push(1);
      cb();
    }, 500);
  });
  pend.go(function(cb) {
    results.push('b');
    setTimeout(function() {
      results.push(1);
      cb();
    }, 500);
  });
  pend.go(function(cb) {
    results.push('c');
    setTimeout(function() {
      results.push(2);
      cb();
    }, 100);
  });
  pend.wait(function(err) {
    assert.deepEqual(results, ['a', 'b', 1, 'c', 1, 2]);
    testCallbackTwice();
  });
  assert.deepEqual(results, ['a', 'b']);
}

function testCallbackTwice() {
  var pend = new Pend();
  pend.go(function(cb) {
  });
  pend.go(function(cb) {
    cb();
    assert.throws(cb, /callback called twice/);
  });
}
