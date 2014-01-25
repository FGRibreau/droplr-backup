How to backup your Droplr account (before they discontinue your free account)
-----------------------------------------------------------------------------

### Introduction

[Read my blog post on the why](http://blog.fgribreau.com/2014/01/how-to-backup-your-droplr-account.html).

### Usage (tested only on Google Chrome/MacOS)

- [Connect to droplr.com](https://droplr.com/login).
- Once connected, open the JavaScript console.
- Copy/Paste the `console_script.js` script content into the console and press enter.
- Depending on the number of drops it may takes some time before displaying "Done!...".
- Copy/paste and run the command displayed in the console.
- `cd DroplrBackup/ && npm install && open .`
- Edit `droplr_code.js`, paste your own drop codes.
- run `node scraper.js` to start exporting data.
- See below:

### It works! Awesome men, you saved me hours of work! Thank you!

You are welcome! Don't forget to show your support via [gittip](https://www.gittip.com/fgribreau/) or [bitcoins](https://coinbase.com/checkouts/fc3041b9d8116e0b98e7d243c4727a30).

### License

The MIT License (MIT)

Copyright (c) 2014 Francois-Guillaume Ribreau

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

