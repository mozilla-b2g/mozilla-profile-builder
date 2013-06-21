var ncp = require('ncp'),
    tmpdir = require('./tmpdir'),
    fs = require('fs'),
    fsPath = require('path'),
    appendPrefs = require('./appendprefs'),
    settings = require('./settings'),
    apps = require('./apps');

/**
 * Detects the "baseProfile" of a b2g desktop build.
 *
 * @param {String} path of runtime.
 * @return {String} location of base profile.
 */
function baseProfile(path) {
  // linux
  var guess = fsPath.join(path, 'gaia', 'profile');
  if (fs.existsSync(guess))
    return guess;

  // OSX
  guess = fsPath.join(path, 'Contents', 'MacOS', 'gaia', 'profile');
  if (fs.existsSync(guess))
    return guess;

  throw new Error('could not find baseProfile in path: "' + path + '"');
}

module.exports.baseProfile = baseProfile;

/**
 * Creates a tmp dir that contains a b2g profile.
 * Unlike firefox profiles b2g profiles require a "base"
 * to be fully functional.
 *
 *  Options:
 *    - (Object) prefs: custom prefs for profile.
 *    - (Boolean) keep: when true directory will not be removed.
 *    - (String) baseProfile: base to clone as starting point (required).
 *    - (String) runtime: directory of b2g runtime used to find
 *               baseProfile.
 */
function profile(options, callback) {
  var baseProfile = options && options.baseProfile;

  // detect baseProfile from runtime path.
  if (options && options.runtime)
    baseProfile = module.exports.baseProfile(options.runtime);

  if (!baseProfile) {
    throw new Error(
      '.baseProfile or .runtime must be given in options.'
    );
  }

  function copyBaseProfile(err, target) {
    if (err) return callback(err);
    ncp(baseProfile, target, function(err) {
      if (err) return callback(err);
      var operations = [appendPrefs, settings, apps];
      var pending = operations.length;
      function next(err) {
        // fire callback if present then clear it
        if (err) {
          callback && callback(err);
          callback = null;
          return;
        }

        if (--pending === 0)
          callback(null, target);
      }

      operations.forEach(function(op) {
        op(target, options, next);
      });
    });
  }

  // open temp dir
  tmpdir(options, copyBaseProfile);
}

module.exports.profile = profile;
