/**
 * Scraper script
 */
var exec                = require('child_process').exec,
  qs                    = require('querystring'),
  path                  = require('path'),
  request               = require('request'),
  async                 = require('async'),
  fs                    = require('fs'),
  _                     = require('lodash');


var CONCURRENT_DOWNLOAD = 5;

var WORKER              = path.resolve(__dirname, './scraper_dtoken.js');
var OUTPUT_DIR          = path.resolve(__dirname, './output/');

var EXTRACTION_REGEX    = /data-\w+="([^"]*)"/gi;

var codes               = require('./droplr_code');

var errors              = [];

function getDroplrLink(code) {
  return 'http://d.pr/i/' + code;
}

function getHeaders(base_url) {
  return {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': '',
    'Accept-Language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) ' + Math.round(Math.random() * 100000000),
    'Referer': base_url,
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Requested-With': 'XMLHttpRequest'
  };
};


function genJsonToken(base_url, session, f) {
  request({
    url: base_url,
    jar: session.jar,
    headers: session.headers,
    method: 'GET',
  }, function(err, httpClient, body) {
    if (err) {
      return f(err);
    }

    if (!body || body.indexOf('data-') === -1) {
      return f("Body does not contain data-*" + body);
    }

    var json = (body.match(EXTRACTION_REGEX) || []).reduce(function(m, match) {
      var found = /data-([^=]*)="([^"]*)"/g.exec(match)
      m[found[1]] = found[2];
      return m;
    }, {});

    f(null, {
      link: json.link,
      filename: json.filename,
      dtoken: json.dtoken
    });
  });
}

function getDownloadLink(code, f) {
  var base_url = getDroplrLink(code);
  var session = {
    jar: request.jar(),
    headers: getHeaders(base_url)
  }

  genJsonToken(base_url, session, function(err, json) {
    if (err) {
      return f(err);
    }

    request({
      url: base_url + '/download',
      qs: json,
      method: 'GET',
      jar: session.jar,
      headers: session.headers
    }, function(err, httpClient, body) {
      if (err) {
        return f(err);
      }
      try {
        f(null, JSON.parse(body).signed_link, json);
      } catch (err) {
        f(err + ' ' + err.stack + ' ' + body);
      }
    });
  });
}

function downloadCode(code, f) {
  getDownloadLink(code, function(err, link, json) {
    if (err) {
      return f(err);
    }

    var filename = code + ' ' + json.filename;
    var filepath = path.resolve(OUTPUT_DIR, filename);
    console.log('%s downloading... %s', new Date().toLocaleString(),  filename);

    request(link)
      .on('end', function() {
        f(null, filepath);
      })
      .pipe(fs.createWriteStream(filepath));

  });
}

function iter(code, f) {
  downloadCode(code, function(err, filepath) {
    if (err) {
      console.error("Error %s", err);
      errors.push(code);
      console.log("Added code %s to the error list", code);
    }
    f();
  });
}

function done(err) {
  if (err) {
    console.log(err);
  }

  console.log('DONE !');
  if (errors.length === 0) {
    return;
  }

  console.log('-- Errors --');
  console.log(JSON.stringify(errors));
}

function skipAlreadyDownloaded(codes) {
  var alreadyDownloaded = fs.readdirSync(OUTPUT_DIR).filter(function(file) {
    return file[0] !== '.';
  }).map(function(file) {
    return file.substring(0, 4);
  });

  return _.difference(codes, alreadyDownloaded);
}

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

var skippedCode = skipAlreadyDownloaded(codes);
if (skippedCode.length !== codes.length) {
  console.log('Resuming... DroplrBackup already downloaded %s files', codes.length - skippedCode.length);
}

async.mapLimit(skippedCode, CONCURRENT_DOWNLOAD, iter, done);
