suite('b2g', function() {
  var assert = require('assert');
  var b2g = require('../lib/b2g');
  var pref = require('../lib/pref');
  var fs = require('fs');

  var baseProfile = __dirname + '/fixtures/b2g-profile/';

  test('.userPrefs', function() {
    assert.ok(b2g.userPrefs);
  });

  suite('#baseProfile', function() {
    var linux = __dirname + '/fixtures/b2g-linux';
    var mac = __dirname + '/fixtures/b2g-mac';

    test('mac', function() {
      assert.equal(
        b2g.baseProfile(mac),
        mac + '/Contents/MacOS/gaia/profile'
      );
    });

    test('linux', function() {
      assert.equal(
        b2g.baseProfile(linux),
        linux + '/gaia/profile'
      );
    });
  });

  test('#profile - error', function() {
    assert.throws(function() {
      b2g({ userPrefs: {} }, function() {});
    });
  });

  suite('#profile - success', function() {
    var customPrefs = {
      foobar: true
    };

    var path;
    setup(function(done) {
      b2g.profile(
        { userPrefs: customPrefs, baseProfile: baseProfile },
        function(err, _path) {
          if (err) return done(err);
          path = _path;
          done();
        }
      );
    });

    test('prefs', function() {
      var userJS = path + '/' + b2g.userPrefs;
      assert.ok(fs.existsSync(userJS));

      var content = fs.readFileSync(userJS, 'utf8');
      assert.ok(content, 'has content');

      assert.ok(
        content.indexOf(pref(customPrefs)) !== -1,
        'includes custom prefs'
      );
    });
  });

});
