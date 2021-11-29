/*
 * Project: Question 2 
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 11/22/2021
 * Author:Jimmy Lee , A01064250
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
     .pipe(unzipper.Extract({ path: pathOut}))
     .on("close", () => {
       resolve();
     });
  });
};

unzip("myfile.zip", "./unzipped");

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */


const readDir = (dir) => {
  return new Promise((resolve,reject) => {
  fs.readdir(dir, (err, files)=> {
    if (err) {
    reject(err);
    } else {
      resolve(files);
      let arr = [];
      files.forEach(file => {
        if (path.extname(file) === ".png") {
        arr.push(path.join(dir, file));
        return arr;
        }
      });
     };
    });
  });
};

readDir("./unzipped")

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (filePath, pathProcessed) => {
  return new Promise((resolve,reject) => {
  var fs = require("fs"),
  PNG = require("pngjs").PNG;

fs.createReadStream(filePath)
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        // invert color
        this.data[idx] = 255 - this.data[idx];
        this.data[idx + 1] = 255 - this.data[idx + 1];
        this.data[idx + 2] = 255 - this.data[idx + 2];

        // this.data[idx + 3] = this.data[idx + 3] >> 1; # ignored
      }
    }
    this.pack().pipe(fs.createWriteStream(pathProcessed));
    resolve();
    });
  });
};


module.exports = {
  unzip,
  readDir,
  grayScale,
};
