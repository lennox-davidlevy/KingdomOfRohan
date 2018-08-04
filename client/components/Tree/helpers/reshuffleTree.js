
let reshuffleTree = (currentTree) => {

  let tree = {};
  tree.movies = currentTree.movies.map( movie => {return movie});
  tree.plays = currentTree.plays.map( play => {return play});
  tree.books = currentTree.books.map( book => {return book});
  tree.songs = currentTree.songs.map( song => {return song});

  tree.previousTree = currentTree.previousTree.map( tree => {return tree});

  tree.previousTree.push(currentTree);

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

  return tree;
};

module.exports = reshuffleTree;