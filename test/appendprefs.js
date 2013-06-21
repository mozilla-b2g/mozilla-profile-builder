suite('appendprefs', function() {
  var appendPrefs = require('../lib/appendprefs.js'),
      fixtureDir = __dirname + '/fixtures/',
      fixture = fixtureDir + '/user.js',
      pref = require('../lib/pref'),
      assert = require('assert'),
      fs = require('fs');

  function removeFixture() {
    if (fs.existsSync(fixture)) {
      fs.unlinkSync(fixture);
    }
  }

  setup(removeFixture);
  teardown(removeFixture);

  test('append to new file', function(done) {
    var config = { 'foobar': true };
    appendPrefs(fixtureDir, { prefs: config }, function(err) {
      if (err) return done(err);
      assert.equal(
        fs.readFileSync(fixture, 'utf8'),
        '\n' + pref(config)
      );
      done();
    });
  });

  test('no prefs', function(done) {
    appendPrefs(fixtureDir, {}, function(err, path) {
      assert.deepEqual(path, fixtureDir);
      done();
    });
  });

  test('append to existing file', function(done) {
    var prefix = 'foo';
    var config = { 'foobar': true, 'woot': true };
    fs.appendFileSync(fixture, prefix);

    appendPrefs(fixtureDir, { prefs: config } , function(err) {
      if (err) return callback(err);
      var expected = prefix + '\n' + pref(config);
      assert.equal(
        fs.readFileSync(fixture, 'utf8'),
        expected
      );
      done();
    });
  });

});
