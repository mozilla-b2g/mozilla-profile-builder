var USER_PREFS = 'user.js';
var tmpdir = require('./tmpdir'),
    fsPath = require('path'),
    fs = require('fs'),
    appendPrefs = require('./appendprefs');

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

  tmpdir(options, function(err, path) {
    if (err) return callback(err);
    appendPrefs(path, options, callback);
  });
}

// location where we can stick user preferences
module.exports.userPrefs = USER_PREFS;
module.exports.profile = profile;
