var USER_PREFS = 'user.js';
var tmp = require('tmp'),
    pref = require('./pref'),
    fsPath = require('path'),
    fs = require('fs');

/**
 * private helper for creating prefs for profile.
 */
function createUserPrefs(config, path, callback) {
  fs.writeFile(
    fsPath.join(path, USER_PREFS),
    pref(config),
    function(err) {
      if (err) return callback(err);
      // path is the directory where profile has been generated.
      callback(null, path);
    }
  );
}

/**
 * Create a temporary firefox profile.
 *
 *  Options:
 *    - (Object) userPrefs: setup special config for firefox (see about:config)
 *    - (Boolean) keep: when true profile will not be removed on process close.
 *
 * @param {Object} [options] optional set of options.
 * @param {Function} callback [err, pathOfProfile].
 */
function profile(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // configuration for temp directory
  // https://github.com/raszi/node-tmp#options
  var tmpConfig = {};
  if (!options.keep) {
    // keep directory for later
    tmpConfig.keep = true;
  } else {
    // discard directory when process closes.
    tmpConfig.unsafeCleanup = true;
  }


  tmp.dir(tmpConfig, function(err, path) {
    if (err) return callback(err);

    if (options.userPrefs)
      return createUserPrefs(options.userPrefs, path, callback);

    return callback(err, path);
  });
}

// location where we can stick user preferences
module.exports.userPrefs = USER_PREFS;
module.exports.profile = profile;
