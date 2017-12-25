/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');
var firstFunctions = require('./promiseConstructor.js');
var promiseFunctions = require('./promisification.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return firstFunctions.pluckFirstLineFromFileAsync(readFilePath)
  .then((result) => promiseFunctions.getGitHubProfileAsync(result))
  .then((result) => {
    var writeFile = Promise.promisify(fs.writeFile);
    return writeFile(writeFilePath, JSON.stringify(result));
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
