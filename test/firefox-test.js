suite('firefox builder', function() {
  var firefox = require('../lib/firefox'),
      assert = require('assert'),
      fs = require('fs'),
      pref = require('../lib/pref');

  test('.userPrefs', function() {
    assert.equal(firefox.userPrefs, 'user.js');
  });

  suite('create profile', function() {
    var path;
    var userPrefs = {
      'foo': true,
      'bar': 'yey'
    };

    setup(function(done) {
      firefox.profile({ userPrefs: userPrefs }, function(err, _path) {
        if (err) return done(err);
        path = _path;
        done();
      });
    });

    test('path exists', function() {
      var stat = fs.statSync(path);
      assert.ok(stat.isDirectory());
    });

    test('user.js contents', function() {
      var userJs = path + '/' + firefox.userPrefs;
      assert.ok(fs.existsSync(userJs));

      assert.equal(
        pref(userPrefs),
        fs.readFileSync(userJs, 'utf8'),
        'has prefs'
      );
    });
  });

});
