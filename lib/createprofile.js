var fs = require('fs'),
    tmpdir = require('./tmpdir');

var Profiles = {
  /**
   * Attempts to find a gaia profile from a directory and then copies it to a
   * new directory.
   *
   * @param {String} path to runtime (/Applications/B2G.App).
   * @param {Function} callback [Error err, String path].
   */
  gaia: function(path, callback) {
    var gaiaProfile = require('./gaiaprofile');
    gaiaProfile(path, function(err, basePath) {
      if (err) return callback(err);
      this.baseProfile(basePath, callback);
    }.bind(this));
  },

  /**
   * Creates a new profile by copying an existing one.
   *
   * @param {String} path to copy profile from.
   * @param {Function} callback [Error err, String path].
   */
  baseProfile: function(path, callback) {
    var ncp = require('ncp');
    this.tmp(function(err, target) {
      ncp(path, target, function(err) {
        if (err) return callback(err);
        callback(null, target);
      });
    });
  },

  /**
   * Verifies profile exists and returns it or an error.
   *
   * @param {Function} callback [Error err, String path].
   */
  profile: function(path, callback) {
    fs.exists(path, function(pathExists) {
      if (pathExists) return callback(null, path);

      callback(new Error('invalid profile path: "' + path + '" is not found.'));
    });
  },

  /**
   * Creates a tmpdir for profile to reside in.
   *
   * @param {Function} callback [Error err, dir].
   */
  tmp: tmpdir
};

module.exports = Profiles;
