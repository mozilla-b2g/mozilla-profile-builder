suite('settings', function() {
  var assert = require('assert'),
      b2g = require('../lib/b2g'),
      fs = require('fs'),
      baseProfile = __dirname + '/fixtures/b2g-profile';

  suite('intial settings', function() {
    var profile;
    var originalSettings;
    var options;
    setup(function(done) {
      options = {
        baseProfile: baseProfile,
        settings: {
          'myfoo': true
        }
      };

      originalSettings = require(baseProfile + '/settings.json');
      b2g.profile(options, function(err, _profile) {
        if (err) return done(err);
        profile = _profile;
        done();
      });
    });

    test('new settings', function() {
      var settings = require(profile + '/settings.json');
      originalSettings.myfoo = true;
      assert.deepEqual(
        originalSettings,
        settings,
        'updates setting'
      );
    });

    test('update settings', function(done) {
      options.settings.myfoo = 111;
      options.baseProfile = profile;

      b2g.profile(options, function(err, newProfile) {
        if (err) return callback(err);
        var settings = require(newProfile + '/settings.json');
        assert.equal(settings.myfoo, 111);
        done();
      });
    });

  });

});
