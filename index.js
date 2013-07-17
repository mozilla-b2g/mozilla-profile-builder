// https://github.com/mozilla-b2g/mozilla-profile-builder/issues/2
process.on('SIGINT', function() {});

module.exports = {
  firefox: require('./lib/firefox'),
  b2g: require('./lib/b2g'),
  pref: require('./lib/pref')
};
