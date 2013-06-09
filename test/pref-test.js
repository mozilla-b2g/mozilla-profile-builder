suite('pref', function() {
  var assert = require('assert');
  var pref = require('../lib/pref');

  test('string', function() {
    assert.equal(
      pref('foo', 'bar'),
      'pref("foo", "bar");'
    );
  });

  test('boolean', function() {
    assert.equal(
      pref('foo', true),
      'pref("foo", true);'
    );
  });

  test('object', function() {
    var obj = { a: true };
    assert.equal(
      pref('foo', obj),
      'pref("foo", "' + JSON.stringify(obj) + '");'
    );
  });

  test('array', function() {
    var obj = ['foo', 'bar'];
    assert.equal(
      pref('foo', obj),
      'pref("foo", "' + JSON.stringify(obj) + '");'
    );
  });

  test('given a single object', function() {
    var expected = '';
    expected += pref('foo', true) + '\n';
    expected += pref('bar', true);

    assert.equal(
      pref({ foo: true, bar: true }),
      expected
    );
  });
});
