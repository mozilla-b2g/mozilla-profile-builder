var ncp = require('ncp'),
    tmp = require('tmp'),
    fs = require('fs'),
    fsPath = require('path'),
    pref = require('./pref');

module.exports.userPrefs = 'user.js';

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
  if(fs.existsSync(guess))
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
 *    - (Object) userPrefs: custom prefs for profile.
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

  var tmpConfig = {};
  if (options && options.keep) {
    tmpConfig.keep = true;
  } else {
    tmpConfig.unsafeCleanup = true;
  }

  function updateUserPrefs(path, callback) {
    var target = fsPath.join(path, module.exports.userPrefs);
    fs.appendFile(target, pref(options.userPrefs), function(err) {
      if (err) return callback(err);
      callback(null, path);
    });
  }

  function copyBaseProfile(err, target) {
    if (err) return callback(err);
    ncp(baseProfile, target, function(err) {
      if (err) return callback(err);

      if (options.userPrefs)
        return updateUserPrefs(target, callback);

      callback();
    });
  }

  // open temp dir
  tmp.dir(tmpConfig, copyBaseProfile);
}

module.exports.profile = profile;
