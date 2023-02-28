/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var { pluckFirstLineFromFileAsync } = require('./promiseConstructor');
var { getGitHubProfileAsync } = require('./promisification');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // (1) pluckFirstLineFromFileAsync(readFilePath) -> 1st .then return promise that returns GitHub username
  return pluckFirstLineFromFileAsync(readFilePath)
    .then( function(userName) {
      if (!userName) {
        throw new Error('Github userName not found');
      } else {
        return userName;
      }
    }
    )
  //(2) 2nd .then function that takes username as input and returns a promise with github profile data [promisification.getGitHubProfile]
    .then(function(userName) {
      return getGitHubProfileAsync(userName);
      // .then((data) => {
      //   if (data.login !== userName) {
      //     throw new Error('Github login not found');
      //   } else {
      //     return data;
      //   }
      // });
    })
    .then(function(profileData) {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(profileData));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
