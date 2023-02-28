/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('needle');
var crypto = require('crypto');
var Promise = require('bluebird');

var asyncFuncs = {};

// (1) Asyncronous HTTP request
asyncFuncs.getGitHubProfile = function (user, callback) {
  var url = 'https://api.github.com/users/' + user;
  var options = {
    headers: { 'User-Agent': 'request' },
  };

  request.get(url, options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};

//var getGitHubProfileAsync; // TODO


// (2) Asyncronous token generation
asyncFuncs.generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

//var generateRandomTokenAsync; // TODO


// (3) Asyncronous file manipulation
asyncFuncs.readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    console.log(err);
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(err, funnyFile);
  });
};

//var readFileAndMakeItFunnyAsync; // TODO
var asyncPromiseFuncs = Promise.promisifyAll(asyncFuncs);

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: asyncPromiseFuncs.getGitHubProfileAsync,
  generateRandomTokenAsync: asyncPromiseFuncs.generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: asyncPromiseFuncs.readFileAndMakeItFunnyAsync
};
