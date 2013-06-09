# Mozilla Profiler Builder

Create profiles for mozilla runtimes (like firefox or b2g
desktop).


## Usage

``` js
var firefox = require('mozilla-profile-builder').firefox;

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
  
});

```

## LICENSE

The MIT License (MIT)

Copyright (c) 2013 Sahaja James Lal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
