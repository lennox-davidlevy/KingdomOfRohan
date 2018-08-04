
const fs = require('fs');
const pullDataFromCSV = require('./pullDataFromCSV.js');

/*
This function will return a tree like the one below.
moodData: is a object with keys like 'movies' or 'books'
          that contain a string of data for the matched mood

treeContents: is the past tree or an empty object

TREE MOCKUP
const tree = {
  currentData: [{}, {}, {}, ....],
  previousTree: [pastTree, pastTree, ....],
  movies: [ '' ],
  plays: [ '' ],
  songs: [ '' ],
  books: [ '' ]
}
*/
const generateFirstTreeContent = (moodData, treeContents, callback) => {
  
  if (Object.keys(moodData).length === 0) {
    return {};
  }

  let tree = {}; // start of object to be returned
  tree.previousTree = [];

  for (let key in moodData) {
    if (key === 'movies') {
      var movies = moodData[key];
    } else if (key === 'books') {
      var books = moodData[key];
    } else if (key === 'plays') {
      var plays = moodData[key];
    } else {
      var songs = moodData[key];
    }
  }
  
  // prep data from string to array of strings & define a length variable 
  let moviesSplit = movies.split(',');
  
  let booksSplit = books.split(',');
 
  let playsSplit = plays.split(',');
  
  let songsSplit = songs.split(',');
  
  // build the objects with required data
  tree.movies = moviesSplit.map( movie => {
    return (
      {
        type: 'movies',
        title: movie,
        author: ''
      }
    );
  });

  tree.books = [];
  for (let i = 0; i < booksSplit.length; i += 2) {
    tree.books.push(
      {
        type: 'books',
        title: booksSplit[i],
        author: booksSplit[i + 1]
      }
    )
  };

  tree.songs = [];
  for (let i = 0; i < songsSplit.length; i += 2) {
    tree.songs.push(
      {
        type: 'songs',
        title: songsSplit[i + 1],
        author: songsSplit[i]
      }
    )
  };

  tree.plays = playsSplit.map( play => {
    return (
      {
        type: 'plays',
        title: play,
        author: ''
      }
    );
  });
  
  //fill the tree.currentData with a mixture of data
  let dataForRecursion = [tree.movies, tree.books, tree.plays, tree.songs];

  // container to hold data
  tree.currentData = [];

  // randomize index function
  let randomIndex = (length) => {
    return Math.floor(Math.random() * length);
  };

  // recurse fn
  let randomShuffle = (countRemaining, position) => {
    if (countRemaining === 0) return;
    else {
      if (dataForRecursion[position].length > 1) {
        let rand = randomIndex(dataForRecursion[position].length)
        tree.currentData.push(dataForRecursion[position][rand]);
        --countRemaining;
        randomShuffle(countRemaining, randomIndex(4));
      } else {
        randomShuffle(countRemaining, randomIndex(4));
      }
    }
  };

  randomShuffle(40, 0);

  callback(tree);
};


module.exports = generateFirstTreeContent;