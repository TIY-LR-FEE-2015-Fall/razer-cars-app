import QUnit from 'qunit';

QUnit.assert.includes = function(actual, expected, message) {
  /*jshint eqeqeq:false */
  this.push(actual.indexOf(expected) != -1, actual.trim(), expected.trim(), message);
};
