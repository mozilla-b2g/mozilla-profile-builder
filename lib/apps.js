var installApps = require('packaged-webapp').installApps;

function apps(profile, options, callback) {
  // abort if no packagedApps are given
  if (
    // no options
    !options ||
    // no apps
    !options.packagedApps ||
    // empty app object
    (options.packagedApps && Object.keys(options.packagedApps).length === 0)
  ) {
    return process.nextTick(callback.bind(null, null, profile));
  }

  var apps = [];
  for (var origin in options.packagedApps) {
    apps.push({ origin: origin, source: options.packagedApps[origin] });
  }

  installApps(profile, apps, callback);
}

module.exports = apps;
