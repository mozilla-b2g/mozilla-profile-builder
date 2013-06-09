var PREF = 'pref';
/**
 * Create a pref string based on a name/value pair.
 *
 *    pref('browser.dom.window.dump.enabled', true);
 *    // => 'pref("browser.dom.window.dump.enabled", true);'
 *
 * @param {String} name of pref;
 * @param {Object|Number|String} value of pref.
 * @return {String} version of pref.
 */
function pref(name, value) {
  var type = typeof value;
  var out = PREF + '("' + name + '", ';

  switch (type) {
    case 'string':
      out += '"' + value + '"';
      break;
    case 'number':
    case 'boolean':
      out += value;
      break;
    default:
      out += '"' + JSON.stringify(value) + '"';
      break;
  }

  out += ');';
  return out;
}

module.exports = pref;
