
const fs = require('fs');
const path = require('path');

// param: filePath -- is a string like './data/movies/grippingMovies.csv'

const pullDataFromCSV = (fileName, callback) => {
  
  let results = fs.readFile(
    path.join(__dirname, fileName)
    , 'utf8'
    , (err,data) => {
      if (err) callback(err);
      else callback(null, data);
    }
  );
};

module.exports = pullDataFromCSV;