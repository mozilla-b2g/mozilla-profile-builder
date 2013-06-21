suite('apps', function() {
  var assert = require('assert'),
      b2g = require('../lib/b2g'),
      fs = require('fs'),
      baseProfile = __dirname + '/fixtures/b2g-profile';

  suite('app installation', function() {
    var options = {
      baseProfile: baseProfile,
      packagedApps: {
        'testa.com': __dirname + '/fixtures/test-app-a/',
        'testb.com': __dirname + '/fixtures/test-app-b/'
      }
    };

    var profile;
    setup(function(done) {
      b2g.profile(options, function(err, _profile) {
        if (err) return done(err);
        profile = _profile;
        done();
      });
    });

    test('both apps are in primary manifest', function() {
      var installedApps = require(profile + '/webapps/webapps.json');

      assert.ok(installedApps['testa.com'], 'testa.com');
      assert.ok(installedApps['testb.com'], 'testb.com');
    });
  });

});

