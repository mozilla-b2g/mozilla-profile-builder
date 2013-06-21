/** handles mutation of settings.json */
var SETTINGS = 'settings.json';
var fs = require('fs'),
    fsPath = require('path');

/**
 * Updates the settings.json file of a given profile
 *
 * @param {String} profile path.
 * @param {Options} options with .settings.
 * @param {Function} callback [Error err, profile].
 */
function settings(profile, options, callback) {
  if (!options || !options.settings) {
    return process.nextTick(callback.bind(null, null, profile));
  }

  // location of settings.json
  var settingsPath = fsPath.join(profile, SETTINGS);

  function readSettings() {
    fs.readFile(settingsPath, 'utf8', function(err, content) {
      var json;
      try {
        json = JSON.parse(content);
      } catch (e) {
        return callback(e);
      }

      writeSettings(json);
    });
  }

  function writeSettings(original) {
    // copy new settings over
    var newSettings = options.settings;
    for (var name in newSettings) {
      original[name] = newSettings[name];
    }

    // and finally write the file back out
    fs.writeFile(
      settingsPath,
      // slows it down a but but makes it readable!
      JSON.stringify(original, null, 2),
      function(err) {
        if (err) return callback(err);
        callback(null, profile);
      }
    );
  }

  // check if file exists
  fs.exists(settingsPath, function(fileExists) {
    if (fileExists) {
      // when file exists read it then write
      readSettings();
    } else {
      // otherwise simply write
      writeSettings({});
    }
  });
}

module.exports = settings;
