var firefox = require('../index').firefox,
    fs = require('fs');

// launch about:config in firefox for more pref names.
var prefs = {
  // turn on dump so it will output to stdout
  'browser.dom.window.dump.enabled': true,

  // bump up max workers
  'dom.workers.maxPerDomain': 100
};

// this will create a temp dir for a profile that will be
// removed when the process closes... keep: true can be passed
// to turn off the default behaviour
firefox.profile({ userPrefs: prefs }, function(err, dirPath) {
  console.log(fs.readFileSync(dirPath + '/user.js', 'utf8'));
});
